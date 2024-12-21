export const tailwindConfig = {
  darkMode: "class",
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/components/ui/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        background01: "hsl(var(--background-01))",
        ui01: "hsl(var(--ui-01))",
        ui02: "hsl(var(--ui-02))",
        text01: "hsl(var(--text-01))",
        text02: "hsl(var(--text-02))",
        line01: "hsl(var(--line-01))",
        danger: "hsl(var(--danger))",
        success: "hsl(var(--success))",
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
        mobile: { max: "768px" },
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        paperlogy: ["var(--font-paperlogy)"],
      },
      letterSpacing: {
        wide1: "0.1px",
        wide2: "0.15px",
        wide3: "0.25px",
        wide4: "0.4px",
        wide5: "0.5px",
      },
      fontSize: {
        d1: ["57px", { lineHeight: "64px", fontWeight: "400" }],
        d2: ["45px", { lineHeight: "52px", fontWeight: "400" }],
        d3: ["36px", { lineHeight: "44px", fontWeight: "400" }],

        h1: ["32px", { lineHeight: "40px", fontWeight: "400" }],
        h2: ["28px", { lineHeight: "36px", fontWeight: "400" }],
        h3: ["24px", { lineHeight: "32px", fontWeight: "400" }],

        t1: ["22px", { lineHeight: "28px", fontWeight: "400" }],
        t2: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        t3: ["14px", { lineHeight: "20px", fontWeight: "400" }],

        l1: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        l2: ["12px", { lineHeight: "16px", fontWeight: "400" }],
        l3: ["11px", { lineHeight: "16px", fontWeight: "400" }],

        b1: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        b2: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        b3: ["12px", { lineHeight: "16px", fontWeight: "400" }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
