// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "flex-wrap",
    // pattern for p, px, py from 0 to 8
    { pattern: /p(|x|y)-(0|1|2|3|4|5|6|7|8)/, },
    // pattern for m, mx, my from 0 to 8 or auto
    { pattern: /m(|x|y)?-(0|1|2|3|4|5|6|7|8|auto)/, },
    // pattern for gap from 0 to 8
    { pattern: /gap-(0|1|2|3|4|5|6|7|8)/, },
    // pattern for align-items from start to stretch
    { pattern: /items-(start|end|center|baseline|stretch)/, },
    // pattern for justify-content from start to stretch
    { pattern: /justify-(start|end|center|between|around|evenly)/, },
    // pattern for direction from row to column-reverse
    { pattern: /flex-(row|column)/, },
    // pattern for rounded from 0 to 3xl
    { pattern: /rounded-(0|sm|md|lg|xl|2xl|3xl|full)/, },

    // pattern for text-size from xs to 5xl
    { pattern: /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)/, },
    // pattern for font-weight from light, normal, semibold, bold
    { pattern: /font-(light|normal|semibold|bold)/, },
    // pattern for font-decotarion
    { pattern: /underline|line-through|no-underline/, },
    // pattern for text-transform
    { pattern: /uppercase|lowercase|capitalize/, },
    // pattern for text-break
    { pattern: /normal|words|all/, },
    // pattern for text-align from left to center
    { pattern: /text-(left|right|center|justify)/, },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
