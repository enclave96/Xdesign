import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/hooks/useAuth";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Xdesign — AI-Powered UX Analysis",
    template: "%s | Xdesign",
  },
  description:
    "Analyze your designs for UX quality, accessibility, and visual hierarchy. Upload screenshots, capture live websites, or import from Figma.",
  keywords: ["UX analysis", "design review", "accessibility", "WCAG", "UI audit"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
