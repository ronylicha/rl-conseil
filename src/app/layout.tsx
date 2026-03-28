// Note: dangerouslySetInnerHTML below contains only static literal strings — no user input, XSS risk is nil.
import { Playfair_Display, DM_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const heading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "700"],
});

const sub = Outfit({
  subsets: ["latin"],
  variable: "--font-sub",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
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
