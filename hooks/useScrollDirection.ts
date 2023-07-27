import { useEffect, useState } from "react";

type ScrollDirection = "up" | "down" | "none";

const useScrollDirection = (): ScrollDirection => {
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>("none");

  useEffect(() => {
    let lastScrollTop = window.scroll;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollTop = window.scroll;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScrollTop > lastScrollTop) {
            setScrollDirection("down");
          } else if (currentScrollTop < lastScrollTop) {
            setScrollDirection("up");
          }
          lastScrollTop = currentScrollTop;
          ticking = false;
        });
      }
      ticking = true;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollDirection;
};

export default useScrollDirection;
