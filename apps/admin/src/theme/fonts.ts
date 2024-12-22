import localFont from "next/font/local";

export const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "fallback",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const paperlogy = localFont({
  src: [
    {
      path: "../../public/fonts/Paperlogy-1Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Paperlogy-2ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Paperlogy-3Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Paperlogy-4Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Paperlogy-5Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Paperlogy-6SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Paperlogy-7Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Paperlogy-8ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Paperlogy-9Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  display: "fallback",
  variable: "--font-Paperlogy",
});
