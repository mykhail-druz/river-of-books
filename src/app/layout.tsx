import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import { Providers } from './providers';
import Navbar from "@/app/_components/navbar";

const inter = Inter({ subsets: ["latin"] });

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
      <body>{children}</body>
    </html>
  );
}
