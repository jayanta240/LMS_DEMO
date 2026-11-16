import type { Metadata, Viewport } from "next";
import "./globals.css";
import BrandThemeProvider from "@/components/providers/BrandThemeProvider";
import DemoRuntime from "@/components/providers/DemoRuntime";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "LMS Demo",
  description: "Interactive frontend demonstration of a learning management system.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BrandThemeProvider>
          <DemoRuntime />
          {children}
        </BrandThemeProvider>
      </body>
    </html>
  );
}
