/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "foundation-blue-light": "#e7effe",
        "foundation-grey-dark": "#1f1f1f",
        "foundation-blue-normal-hover": "#0c52da",
        "foundation-blue-normal": "#0d5bf2",
        "foundation-grey-light-active": "#bdbdbd",
        "foundation-grey-normal-hover": "#252525",
        "foundation-grey-normal-active": "#212121",
        "foundation-grey-normal": "#292929",
        "foundation-blue-light1": "#eceff4",
      },
    },
    screens: {},
  },
  corePlugins: {
    preflight: false,
  },
};
