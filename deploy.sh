#!/usr/bin/env bash
# RL Conseil — canonical Ploi entry point, called from the dedicated clean worktree.
# The live checkout /home/ploi/rlconseil.net may contain user changes: never pull,
# stash, reset or install dependencies there. See the five-line panel binding.
set -euo pipefail

main() {
    local site=/home/ploi/rlconseil.net
    local tools=/home/ploi/.local/rl-conseil-tools
    local source=/home/ploi/.local/rl-conseil-tools/deploy-source
    local lock=/home/ploi/.rl-conseil-rollout.lock
    local node=/home/ploi/.local/rl-conseil-tools/node-v26.12.0-linux-x64/bin/node
    local npm=/home/ploi/.local/rl-conseil-tools/npm-12.2.0/package/bin/npm-cli.js
    local nonce release revision node_version npm_version
    local expected_sha=${RLCONSEIL_EXPECTED_SHA:-}
    [[ "$expected_sha" =~ ^[0-9a-f]{40}$ ]] || {
        echo 'Deploy refused: RLCONSEIL_EXPECTED_SHA must contain the exact approved 40-character commit.' >&2; exit 1;
    }
    umask 077

    # The panel may already hold this exact open file description on FD9.
    if [[ "$(readlink /proc/self/fd/9 2>/dev/null || true)" != "$lock" ]]; then
        exec 9>"$lock"
    fi
    flock -w 300 9 || { echo 'Deploy refused: another RLConseil rollout owns the lock.' >&2; exit 1; }

    [[ "$PWD" == "$source" && -f "$source/.git" && ! -L "$source" ]] || {
        echo 'Deploy refused: run from the dedicated clean deployment worktree.' >&2; exit 1;
    }
    [[ "$(git rev-parse --show-toplevel)" == "$source" ]] || exit 1
    [[ "$(git rev-parse HEAD)" == "$expected_sha" ]] || {
        echo 'Deploy refused: checkout does not match the expected production commit.' >&2; exit 1;
    }
    [[ "$(git rev-parse --path-format=absolute --git-common-dir)" == "$(git -C "$site" rev-parse --path-format=absolute --git-common-dir)" ]] || {
        echo 'Deploy refused: deployment worktree has the wrong Git repository.' >&2; exit 1;
    }
    local status
    status=$(git status --porcelain --untracked-files=normal) || exit 1
    [[ -z "$status" ]] || { echo 'Deploy refused: deployment worktree contains local changes.' >&2; exit 1; }
    [[ -x "$node" && -r "$npm" ]] || { echo 'Deploy refused: private Node/npm tools are missing.' >&2; exit 1; }
    node_version=$("$node" --version) || exit 1
    npm_version=$("$node" "$npm" --version) || exit 1
    [[ "$node_version" == v26.12.0 && "$npm_version" == 12.2.0 ]] || {
        echo 'Deploy refused: require private Node26.12.0/npm12.2.0.' >&2; exit 1;
    }
    export PATH="${node%/*}:/usr/local/bin:/usr/bin:/bin"
    nonce=$(python3 -c 'import datetime,secrets;print(datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%dT%H%M%SZ")+"-"+secrets.token_hex(4))')
    release="$tools/releases/$nonce"
    mkdir -p "$tools/releases"
    [[ ! -e "$release" ]] || exit 1
    mkdir -m 700 "$release"

    # Preserve live metadata and bytes; the panel already selected the exact commit.
    python3 - "$site" "$release" <<'PRESERVE'
import hashlib,json,pathlib,subprocess,sys
site,release=map(pathlib.Path,sys.argv[1:])
state={"head":subprocess.check_output(["git","-C",str(site),"rev-parse","HEAD"],text=True).strip(),
       "status":subprocess.check_output(["git","-C",str(site),"status","--porcelain"],text=True),
       "files":{name:hashlib.file_digest((site/name).open("rb"),"sha256").hexdigest() for name in ["package.json","package-lock.json"]}}
(release/"live-source-before.json").write_text(json.dumps(state,indent=2))
PRESERVE
    revision=$(git rev-parse HEAD)
    [[ "$revision" == "$expected_sha" ]] || {
        echo 'Deploy refused: checkout changed after the expected commit was selected.' >&2; exit 1;
    }
    "$node" "$npm" ci --ignore-scripts --strict-peer-deps --engine-strict --no-audit --no-fund
    sudo -n systemd-run --wait --pipe --collect --uid=ploi \
        --unit="rl-conseil-build-$nonce" --property=MemoryMax=6G \
        --property=MemorySwapMax=0 --property=CPUQuota=200% \
        --working-directory="$source" --setenv="PATH=$PATH" \
        "$node" "$npm" run build
    status=$(git status --porcelain --untracked-files=normal) || exit 1
    [[ -z "$status" && "$(git rev-parse HEAD)" == "$revision" ]] || {
        echo 'Deploy refused: source changed during the build.' >&2; exit 1;
    }

    python3 - "$site" "$source" "$release" "$revision" <<'PUBLISH'
import ctypes,datetime,hashlib,html.parser,json,os,pathlib,shutil,subprocess,sys,tarfile,urllib.request
site,source,release=map(pathlib.Path,sys.argv[1:4]); revision=sys.argv[4]
live=site/"out"; candidate=source/"out"; rollback=release/"previous-out"
def digest(p):
    with p.open("rb") as f:return hashlib.file_digest(f,"sha256").hexdigest()
def assert_live_source():
    expected=json.loads((release/"live-source-before.json").read_text())
    assert subprocess.check_output(["git","-C",str(site),"rev-parse","HEAD"],text=True).strip()==expected["head"],"Live source HEAD changed"
    assert subprocess.check_output(["git","-C",str(site),"status","--porcelain"],text=True)==expected["status"],"Live source status changed"
    assert all(digest(site/n)==h for n,h in expected["files"].items()),"Live manifests changed"
def tree_files(root):
    assert root.is_dir() and not root.is_symlink()
    for p in root.rglob("*"):
        assert not p.is_symlink(),"Symlink in static export"
        if p.is_file():yield p
assert_live_source()
assert live.stat().st_dev==candidate.stat().st_dev==release.stat().st_dev,"Atomic publication requires one filesystem"
assert (candidate/"fr/index.html").is_file() and (candidate/"en/index.html").is_file(),"Incomplete bilingual static export"
old_files=list(tree_files(live));list(tree_files(candidate))
archive=release/"static-config-source.tar.gz"
with tarfile.open(archive,"w:gz",dereference=True) as t:
    t.add(live,arcname="out")
    for n in ["package.json","package-lock.json","next.config.ts","deploy.sh"]:t.add(site/n,arcname="live-source/"+n,recursive=False)
with (release/"live-source.patch").open("wb") as f:
    subprocess.run(["git","-C",str(site),"diff","--binary","--","package.json","package-lock.json"],stdout=f,check=True)
# Verify the archived bytes against every current static file before publication.
verified=0
with tarfile.open(archive) as t:
    for m in t:
        if m.isfile() and m.name.startswith("out/"):
            p=live/m.name[4:]
            with t.extractfile(m) as f:assert hashlib.file_digest(f,"sha256").hexdigest()==digest(p),"Static backup mismatch"
            verified+=1
assert verified==len(old_files),"Incomplete static backup"
preserved=0;old_static=live/"_next/static";new_static=candidate/"_next/static"
for p in old_files:
    if not p.is_relative_to(old_static):continue
    target=new_static/p.relative_to(old_static)
    if target.exists():assert digest(target)==digest(p),"Hashed asset collision"
    else:
        target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(p,target);preserved+=1
for p in [candidate,*candidate.rglob("*")]:os.chmod(p,0o755 if p.is_dir() else 0o644)
class Scripts(html.parser.HTMLParser):
    def __init__(self):super().__init__();self.urls=[]
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if tag=="script" and d.get("src","").startswith("/_next/static/chunks/"):self.urls.append(d["src"])
parser=Scripts();parser.feed((candidate/"fr/index.html").read_text())
urls=list(dict.fromkeys(parser.urls))[:3];assert len(urls)==3,"Missing current JavaScript references"
assets=[{"path":u,"sha256":digest(candidate/u.lstrip("/"))} for u in urls]
receipt={"schemaVersion":1,"status":"READY_TO_PUBLISH","sourceSHA":revision,"sourceWorktree":str(source),
         "scriptSHA256":digest(source/"deploy.sh"),"manifestSHA256":digest(source/"package.json"),"lockSHA256":digest(source/"package-lock.json"),
         "backupSHA256":digest(archive),"backupVerifiedStaticFiles":verified,"oldAssetsCopied":preserved,
         "rollbackOut":str(rollback),"assets":assets}
def save(status):
    receipt.update(status=status,utc=datetime.datetime.now(datetime.timezone.utc).isoformat())
    tmp=release/"receipt.json.new";tmp.write_text(json.dumps(receipt,indent=2));os.chmod(tmp,0o600);os.replace(tmp,release/"receipt.json")
libc=ctypes.CDLL(None,use_errno=True)
def exchange():
    if libc.renameat2(-100,os.fsencode(live),-100,os.fsencode(candidate),2)!=0:
        raise OSError(ctypes.get_errno(),"Atomic out exchange failed")
assert_live_source();save("READY_TO_PUBLISH");exchange()
try:
    for path in ["/","/fr/","/en/"]:
        with urllib.request.urlopen(urllib.request.Request("https://rlconseil.net"+path,headers={"User-Agent":"RLConseil-Deployment-Verification/1.0"}),timeout=30) as response:
            body=response.read();assert response.status==200,"Public page unavailable"
            if path=="/fr/":assert hashlib.sha256(body).hexdigest()==digest(live/"fr/index.html"),"Public HTML is not the new export"
    for asset in assets:
        with urllib.request.urlopen("https://rlconseil.net"+asset["path"],timeout=30) as response:
            assert response.status==200 and hashlib.sha256(response.read()).hexdigest()==asset["sha256"],"Public asset does not match export"
    assert_live_source()
    # Remove the previous export from the reusable build directory only on success.
    os.rename(candidate,rollback);save("DEPLOYED_TESTS_PENDING")
except BaseException:
    if not candidate.exists() and rollback.exists():os.rename(rollback,candidate)
    exchange();save("ROLLED_BACK_PUBLIC_VERIFICATION_FAILED");raise
print("Deployed RLConseil source="+revision+" receipt="+str(release/"receipt.json"),flush=True)
PUBLISH
}

main "$@"
