import "./styles/global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenClaw Edge Memory Search",
  description: "Local-first OpenClaw memory, docs and report search"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
