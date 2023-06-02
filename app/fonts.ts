import localFont from "next/font/local";

export const bebasFont = localFont({
  src: "../public/fonts/BebasNeue-Regular.ttf",
  variable: "--bebas-font",
});

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

export const IBMFont = localFont({
  src: [
    {
      path: "../public/fonts/IBMPlexSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/IBMPlexSans-Light.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/IBMPlexSans-Regular.ttf",
      weight: "300",
      style: "normal",
    },
  ],
});
