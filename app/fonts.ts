import localFont from "next/font/local";

export const cafeFont = localFont({
  src: [
    {
      path: "../public/fonts/LGCafe.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/LGCafe_Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/LGCafe_Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/LGCafe_Light_Italic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/LGCafe_Light.ttf",
      weight: "300",
      style: "normal",
    },
  ],
});