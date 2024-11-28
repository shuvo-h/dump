import type { Metadata } from "next";
import { Inter,  } from "next/font/google";

import "./globals.css";
const interFont = Inter({
  subsets: ["latin"],
  variable:"--font-inter"
});
const robotoFont = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto"
});




export const metadata: Metadata = {
  title: {
    template: "%s | WC Studio",
    default: "WC Studio"
  },
  description: "WC Studio App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
         className={[interFont.variable,robotoFont.variable].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}
