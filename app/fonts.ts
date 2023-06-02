import localFont from "next/font/local";

export const bebasFont = localFont({
  src: "../public/fonts/BebasNeue-Regular.ttf",
  variable: "--bebas-font",
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
