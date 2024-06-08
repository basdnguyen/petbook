'use client';

import { Inter } from "next/font/google";
import globalCss from '@go1d/go1d/build/foundations/globalCSS';
import { Provider } from "@go1d/go1d";

globalCss();

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
