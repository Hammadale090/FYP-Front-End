import type { Metadata } from "next";
import { Inter, Manrope, Poppins } from "next/font/google";
import "./globals.css";
import "@mantine/charts/styles.css";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
// import '@mantine/dates/styles.css';
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import ContextProvider from "@/context/ContextProvider";
import { Toaster } from "@/components/ui/toaster";
import { NextAuthProvider } from "./providers";
import NextTopLoader from "nextjs-toploader";
import { GatewayProvider } from "./gateway";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-manrope",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Residence Realm",
  description: "Ravinna frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />

        {/* Add the favicon here */}
        <link rel="icon" href="//Dashboard/logo-1.jpg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      {/* the flex justify center on here was making the modals not show */}
      <body
        className={`${inter.variable} ${manrope.variable} ${poppins.variable} font-manrope overflow-x-hidden `}
      >
        <div >
          <NextTopLoader color="#3eb87f" />
          <MantineProvider>
            <NextAuthProvider>
              <ContextProvider>
                {children}
                <Toaster />
              </ContextProvider>
            </NextAuthProvider>
          </MantineProvider>
        </div>
      </body>
    </html>
  );
}