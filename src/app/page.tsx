import { routing } from '@/i18n/routing';

export default function RootPage() {
  return (
    <meta httpEquiv="refresh" content={`0;url=/${routing.defaultLocale}/`} />
  );
}
