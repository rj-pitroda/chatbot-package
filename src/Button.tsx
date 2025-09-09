import React from "react";
import "./index.css";

export type ButtonProps = {
  children: React.ReactNode;
};

export const Button = ({ children }: ButtonProps) => {
  return (
    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
      {children}
    </button>
  );
};
