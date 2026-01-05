import "./globals.css";

export const metadata = {
  title: "AesthiLink",
  description: "Build aesthetic bio links",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
