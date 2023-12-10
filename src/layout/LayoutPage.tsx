import Header from "@/components/header/Header";
import React, { ReactNode } from "react";

type LayoutPageProps = {
  children: ReactNode;
};

const LayoutPage: React.FC<LayoutPageProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default LayoutPage;
