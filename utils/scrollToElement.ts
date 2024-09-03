import { MutableRefObject } from "react";

export const scrollToElement = (
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
};
