import { useEffect, useState } from "react";

const useScrollDirection = (): boolean => {
  const [scrollDirection, setScrollDirection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      const currentPosition = window.scrollY;
      if (currentPosition > scrollPosition.current && window.scrollY > 120) {
        setScrollDirection(false);
      } else {
        setScrollDirection(true);
      }
      scrollPosition.current = currentPosition;
    };
    const scrollPosition = { current: 0 };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollDirection;
};

export default useScrollDirection;
