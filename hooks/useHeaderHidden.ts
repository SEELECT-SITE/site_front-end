import { useEffect, useState } from "react";

const useHeaderHidden = (): boolean => {
  const [isHeaderHidden, setIsHeaderHidden] = useState(true);

  useEffect(() => {
    var lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsHeaderHidden(currentScrollY < 200);
      } else {
        setIsHeaderHidden(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isHeaderHidden;
};

export default useHeaderHidden;
