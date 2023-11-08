/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "var(--foreground)",
        darkblue: "var(--darkblue)",
        background: "var(--background) ",
        txtcolor: "var(--txtcolor) ",
        shadowclr: "var(--shadowclr) ",
        lightgray: "var(--lightgray) ",
        gray: "var(--gray) ",
        btnclr: "var(--btnclr) ",
        btntxtclr: "var(--btntxtclr) ",
        contentBackground:"var(--contentBackground)",
        cardColor:"var(--cardColor)",
        accentColor:"var(--accentColor)",
        mainTextColor:"var(--mainTextColor)",
        secondaryTxtColor:"var(--secondaryTxtColor)",
        logoColor:"var(--logoColor)",
      },
      fontFamily: {
        'sfpro': [
          'SF-Pro-Display-Black',
          'SF-Pro-Display-BlackItalic',
          'SF-Pro-Display-Bold',
          'SF-Pro-Display-BoldItalic',
          'SF-Pro-Display-Bold',
          'SF-Pro-Display-BoldItalic',
          'SF-Pro-Display-Heavy',
          'SF-Pro-Display-HeavyItalic',
          'SF-Pro-Display-HeavyItalic',
          'SF-Pro-Display-Light',
          'SF-Pro-Display-Medium',
          'SF-Pro-Display-MediumItalic',
          'SF-Pro-Display-Regular',
          'SF-Pro-Display-RegularItalic',
          'SF-Pro-Display-SemiboldItalic',
          'SF-Pro-Display-Thin',
          'SF-Pro-Display-ThinItalic',
          'SF-Pro-Display-Ultralight',
          'SF-Pro-Display-UltralightItalic',
          'SF-Pro-Text-Bold',
          'SF-Pro-Text-BoldItalic',
          'SF-Pro-Text-Light',
          'SF-Pro-Text-LightItalic',
          'SF-Pro-Text-Medium',
          'SF-Pro-Display-MediumItalic',
          'SF-Pro-Text-Regular',
          'SF-Pro-Display-RegularItalic',
          'SF-Pro-Display-Semibold',
          'SF-Pro-Text-SemiboldItalic',
          'SF-Pro-Text-Semibold',
        ]
      },
    },
    screens: {
      'sm': {'min': '640px', 'max': '767px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '768px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px','max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }
      
      '2xl': {'min': '1535px'},
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
}