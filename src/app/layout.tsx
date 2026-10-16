// Note: dangerouslySetInnerHTML below contains only static literal strings — no user input, XSS risk is nil.
import localFont from "next/font/local";
import "./globals.css";

const heading = localFont({
  src: [
    { path: "../../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2", weight: "400" },
    { path: "../../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2", weight: "500" },
    { path: "../../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2", weight: "600" },
    { path: "../../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2", weight: "700" },
    { path: "../../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2", weight: "800" },
    { path: "../../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2", weight: "900" },
  ],
  variable: "--font-heading",
  display: "swap",
  style: "normal",
  preload: true,
  adjustFontFallback: "Times New Roman",
});

const body = localFont({
  src: [
    { path: "../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2", weight: "400" },
    { path: "../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2", weight: "500" },
    { path: "../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2", weight: "700" },
  ],
  variable: "--font-body",
  display: "swap",
  style: "normal",
  preload: true,
  adjustFontFallback: "Arial",
});

const sub = localFont({
  src: [
    { path: "../../node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2", weight: "300" },
    { path: "../../node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2", weight: "400" },
    { path: "../../node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2", weight: "500" },
    { path: "../../node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2", weight: "600" },
    { path: "../../node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2", weight: "700" },
  ],
  variable: "--font-sub",
  display: "swap",
  style: "normal",
  preload: true,
  adjustFontFallback: "Arial",
});

const mono = localFont({
  src: [
    { path: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2", weight: "400" },
    { path: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2", weight: "500" },
  ],
  variable: "--font-mono",
  display: "swap",
  style: "normal",
  preload: true,
  adjustFontFallback: "Arial",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('rl-theme') || 'dark';
                document.documentElement.classList.toggle('dark', t === 'dark');
              } catch(e) {}
              try {
                const locale = window.location.pathname.startsWith('/en') ? 'en' : 'fr';
                document.documentElement.lang = locale;
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className={`${heading.variable} ${body.variable} ${sub.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
