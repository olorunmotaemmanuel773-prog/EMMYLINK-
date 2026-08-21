import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#171717",
        foreground: "#FAF7F2",
        emmy: {
          charcoal: {
            950: "#12100E",
            900: "#171717",
            850: "#1E1A17",
            800: "#24201D",
            750: "#2C2723",
            700: "#38322D",
            600: "#4A433D",
          },
          bronze: {
            DEFAULT: "#C9823D",
            hover: "#B5712E",
            light: "#E0A15F",
            muted: "#D49B55",
            subtle: "rgba(201, 130, 61, 0.15)",
          },
          gold: {
            DEFAULT: "#D6A85F",
            champagne: "#E5B869",
            light: "#F0C888",
            muted: "#CDB07B",
          },
          ivory: {
            DEFAULT: "#FAF7F2",
            warm: "#F4F0E8",
            muted: "#D8D1C7",
          },
          whatsapp: {
            DEFAULT: "#25D366",
            hover: "#1EBE5D",
          },
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      boxShadow: {
        "bronze-glow": "0 0 24px rgba(201, 130, 61, 0.35)",
        "gold-glow": "0 0 20px rgba(214, 168, 95, 0.3)",
        "card-luxury": "0 12px 32px -4px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
