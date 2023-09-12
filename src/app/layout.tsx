import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flabs",
  description: "Flabs Test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang='en'>
        <ErrorBoundary>
          <body className={inter.className}>
            <Providers>{children}</Providers>
          </body>
        </ErrorBoundary>
    </html>
  );
}
