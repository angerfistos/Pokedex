export default {
  darkMode: "class",
  content: [
    "./**/*.html",
    "./**/*.twig",
    "./**/*.php",
    "./**/*.{js,ts,tsx,jsx}",
    "!node_modules/**",
    "./asserts/js/*.js"
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },
    extend: {
      spacing: {
        "custom-padding": "1rem"
      }
    }
  },
  corePlugins: {
    container: false
  },
  plugins: [
    ({ addComponents }) => {
      addComponents({
        ".container": {
          width: "100%",
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto"
        }
      });
    },
    ({ addBase }) => {
      addBase({
        // padding global au <body>
        body: {
          padding: "1rem"
        },
        // responsive
        "@screen sm": {
          body: {
            padding: "1rem"
          }
        },
        "@screen md": {
          body: {
            padding: "1.5rem"
          }
        },
        "@screen lg": {
          body: {
            padding: "2rem"
          }
        }
      });
    }
  ]
};
