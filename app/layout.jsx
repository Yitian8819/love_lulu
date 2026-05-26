import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata = {
  title: "Ganzhe & Lulu | Our Soft Room",
  description: "甘蔗和小鹿的小家"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
