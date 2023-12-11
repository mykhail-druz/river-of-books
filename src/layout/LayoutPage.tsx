"use client"
import React from 'react';
import Header from '@/components/header/Header';
import { ReactNode } from 'react';

type LayoutPageProps = {
  children: ReactNode;
};

const LayoutPage: React.FC<LayoutPageProps> = ({ children }) => {
  return (
      <div className="flex flex-col items-center min-h-screen mx-8">
        <Header />
        <main>{children}</main>
      </div>
  );
};

export default LayoutPage;
