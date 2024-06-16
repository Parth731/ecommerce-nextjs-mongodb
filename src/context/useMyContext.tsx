"use client";
import { useContext } from "react";
import { GlobalContext } from ".";

const useMyContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};

export default useMyContext;
