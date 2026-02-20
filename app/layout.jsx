import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wght"],
});

export const metadata = {
  title: "LaserBySonyMusic Landing Page Reveal | Codegrid",
  description: "Redefining space through stillness.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} antialiased`}
        suppressHydrationWarning
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
