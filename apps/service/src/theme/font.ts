import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    {
      path: "./fonts/Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
    // {
    //   path: "./fonts/Pretendard-Medium.subset.woff2",
    //   weight: "500",
    //   style: "normal",
    // },
    // {
    //   path: "./fonts/Pretendard-SemiBold.subset.woff2",
    //   weight: "600",
    //   style: "normal",
    // },
    {
      path: "./fonts/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
  preload: true,
});

export const paperlogy = localFont({
  src: [
    {
      path: "./fonts/Paperlogy-4Regular.woff2",
      weight: "400",
      style: "normal",
    },
    // {
    //   path: "./fonts/Paperlogy-5Medium.woff2",
    //   weight: "500",
    //   style: "normal",
    // },

    {
      path: "./fonts/Paperlogy-7Bold.woff2",
      weight: "700",
      style: "normal",
    },
    // {
    //   path: "./fonts/Paperlogy-8ExtraBold.woff2",
    //   weight: "800",
    //   style: "normal",
    // },
  ],
  display: "swap",
  variable: "--font-paperlogy",
  preload: false,
});
