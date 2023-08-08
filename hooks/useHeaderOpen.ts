import { useEffect, useState } from "react";

const useHeaderOpen = (): boolean => {
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);

  useEffect(() => {
    var lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsHeaderOpen(currentScrollY < 200);
      } else {
        setIsHeaderOpen(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isHeaderOpen;
};

export default useHeaderOpen;
