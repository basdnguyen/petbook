'use client';

import { Inter } from "next/font/google";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './globals.css';
import { AppContext, User } from "@/components/AppContext";
import { useState } from "react";
import { GoogleAnalytics } from '@next/third-parties/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [jwt, setJwt] = useState<string | null>(null);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.ico" sizes="any" />
      </head>
      <body className={`${inter.className}`}>
        <GoogleOAuthProvider clientId="559885226942-qcmgk5rh5us4c6se69hk20v6ckh5p9u1.apps.googleusercontent.com">
          <AppContext.Provider value={{ user, setUser, jwt, setJwt }}>
            {children}
          </AppContext.Provider>
        </GoogleOAuthProvider>
        <GoogleAnalytics gaId="GT-PBKHLLKF" />
      </body>
    </html>
  );
}
