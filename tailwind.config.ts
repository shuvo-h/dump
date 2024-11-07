import type { Config } from "tailwindcss";
import { BACKGROUND_COLOR, BORDER_COLOR, COLORS } from "./theme/color";
import { FONT_SIZE, LETTER_SPACING, LINE_HEIGHT } from "./theme/font";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		backgroundColor: BACKGROUND_COLOR,
  		borderColor: BORDER_COLOR,
  		fontSize: FONT_SIZE,
  		lineHeight: LINE_HEIGHT,
  		letterSpacing: LETTER_SPACING,
  		borderWidth: {
  			'1': '1px',
  			'3': '3px',
  			'5': '5px'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
