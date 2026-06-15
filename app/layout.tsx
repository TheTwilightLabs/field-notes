import type { Metadata } from "next";
import { DM_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif" });
const mono = DM_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: {
    default: "Field Notes — Visual Data Science Courses",
    template: "%s — Field Notes",
  },
  description: "Open, visual courses for understanding data science from first principles.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${serif.variable} ${mono.variable}`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
