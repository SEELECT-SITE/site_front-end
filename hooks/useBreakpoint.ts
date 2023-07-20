"use client";
import { useState, useEffect } from "react";

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(window.innerWidth);
  const resize = () => {
    setBreakpoint(window.innerWidth);
    console.log(breakpoint);
  };

  useEffect(() => {
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return breakpoint;
};
export default useBreakpoint;
