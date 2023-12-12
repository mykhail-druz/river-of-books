"use client";
import BookBlock from "@/components/bookBlock/bookBlock";
import LayoutPage from "@/layout/LayoutPage";
import React, { useState } from "react";

const Shelved: React.FC = () => {
  const bookIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <LayoutPage>
      <ul>
        <li>
          {bookIds.map((bookId) => (
            <BookBlock key={bookId} bookId={bookId} />
          ))}
        </li>
      </ul>
    </LayoutPage>
  );
};

export default Shelved;