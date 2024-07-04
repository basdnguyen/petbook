'use client';

import { Inter } from "next/font/google";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './globals.css';
import { AppContext, User } from "@/components/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [jwt, setJwt] = useState<string | null>(null);
  useEffect(() => {
    const jwtFromStorage = localStorage.getItem('jwt');
    if (jwtFromStorage) {
      setJwt(jwtFromStorage);
    } else {
      setUser(null);
    }
  }, []);

  async function getMeUser() {
    const { data } = await axios.get('/api/me', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    }); 
    setUser(data);
  }

  useEffect(() => {
    if (jwt) {
      getMeUser();
    }
  }, [jwt]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.ico" sizes="any" />
      </head>
      <body className={`${inter.className}`}>
        <AppContext.Provider value={{ user, setUser, jwt, setJwt }}>
          {children}
        </AppContext.Provider>
        <GoogleAnalytics gaId="GT-PBKHLLKF" />
      </body>
    </html>
  );
}
