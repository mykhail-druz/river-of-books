import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { Providers } from './providers';
import Navbar from "@/app/_components/navbar";

import { hedvig } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "River of Books",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${hedvig.className}`}>{children}</body>
    </html>
  );
}
