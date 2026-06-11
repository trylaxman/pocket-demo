import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#172033',
        muted: '#6B7280',
        pocket: '#6253FF',
        soft: '#F5F7FB'
      },
      boxShadow: {
        card: '0 18px 45px rgba(17, 24, 39, 0.08)'
      }
    },
  },
  plugins: [],
};
export default config;
