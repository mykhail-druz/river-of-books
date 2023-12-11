"use client"
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Импортируем BrowserRouter
import Header from '@/components/header/Header';
import { ReactNode } from 'react';

type LayoutPageProps = {
  children: ReactNode;
};

const LayoutPage: React.FC<LayoutPageProps> = ({ children }) => {
  return (
    <Router>
      {/* Обернуть содержимое в BrowserRouter */}
      <div className="flex flex-col items-center min-h-screen mx-8">
        <Header />
        <main>{children}</main>
      </div>
    </Router>
  );
};

export default LayoutPage;
