import { createGlobalStyle } from 'styled-components';
import theme from 'styled-theming';
import { BREAKPOINTS } from './breakpoints';

//=====================
// DYNAMIC COLORS
export const primaryBg = theme('colorMode', {
    light: 'var(--color-gray-800)',
    dark: 'var(--color-gray-100)',
});

export const secondaryBg = theme('colorMode', {
    light: 'var(--color-white)',
    dark: 'var(--color-gray-200)',
});

export const textColor = theme('colorMode', {
    light: 'var(--color-black)',
    dark: 'var(--color-white)',
});

export const inputPlaceholderColor = theme('colorMode', {
    light: 'hsl(0 0% 0% / 0.25)',
    dark: 'hsl(0 0% 100% / 0.25)',
});

export const borderColor = theme('colorMode', {
    light: 'var(--color-gray-700)',
    dark: 'var(--color-gray-300)',
});

export const secondaryButtonBg = theme('colorMode', {
    light: 'var(--color-purple-400)',
    dark: 'var(--color-white)',
});

export const shadowColor = theme('colorMode', {
    light: '216 15% 57%',
    dark: '235 15% 16%',
});

export const GlobalStyles = createGlobalStyle`
    //=====================
    // CSS RESET
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: none;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  ol, ul, menu {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  svg {
    fill: var(--color-gray-600);
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
    line-height: var(--line-height-md);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: auto;
    text-rendering: optimizeSpeed;
  }
  
  * {
    margin: 0;
    padding: 0;
  }
  
  html, body, #root {
    height: 100%;
  }
  
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
  
  input, button, textarea, select {
    font: inherit;
  }
  
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
  
  #root, #__next, #portal {
    isolation: isolate;
  }
  
  html:focus-within {
    scroll-behavior: smooth;
  }
  
  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }  
    
    //=====================
    // GLOBAL STYLES
  body {
    background-color: ${primaryBg};
    color: ${textColor};
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: var(--font-medium);
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: var(--font-bold);
    line-height: var(--line-height-sm);
  }
  
  h1 {
    font-size: var(--font-xl)
  }

  h2 {
    font-size: var(--font-lg);
  }

  h3 {
    font-size: var(--font-md);
  }
  
  h4 {
    color: var(--color-gray-600);
    font-size: var(--font-xs);
    letter-spacing: 2.4px;
    text-transform: uppercase;
  }
  
  p {
    font-size: var(--font-sm);
    line-height: var(--line-height-lg);
  }
  
  strong {
    font-weight: var(--font-bold);
    font-size: var(--font-xs);
    line-height: var(--line-height-sm);
  }
  
  a, button {
    cursor: pointer;
  }
  
  a {
    all: unset;
    font-size: var(--font-xs);
    font-weight: var(--font-bold);
    color: var(--color-purple-200);
    cursor: pointer;
    
    &:hover, &:focus {
      text-decoration: underline;
    }
  }

  input[type="checkbox"] {

    width: 14px;
    height: 14px;
    border-radius: var(--radii-xs);
    flex-shrink: 0;
    background-color: ${p =>
        p.checked ? 'var(--color-purple-100)' : secondaryBg};
    border: ${p =>
        !p.checked
            ? `1px var(--color-gray-400) solid`
            : `1px solid transparent`};

    &:focus {
      box-shadow: 0 0 0 2px var(--color-purple-shadow);
    }

    &:focus:not(:focus-visible) {
      box-shadow: none;
    }
  }
  
  // Custom scrollbar
    /* width */
    ::-webkit-scrollbar {
        width: 16px;
        height: 24px;
        padding: 10px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
        background-color: ${secondaryBg};
        border-radius: var(--radii-round);
        left: 16px;
        margin: 8px;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background-color: var(--color-gray-600);
        border-radius: var(--radii-round);
        padding-block: 6px;
        border: 5px solid ${secondaryBg};
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: ${primaryBg};
    }
    
  :root {
      //=====================
      // COLORS
    --color-purple-100: hsl(242 48% 58%); // primary
    --color-purple-200: hsl(243 100% 82%); // primary button hover
    --color-purple-300: hsl(242 48% 58% / 0.25); // secondary button hover & subtask hover
    --color-purple-400: hsl(242 48% 58% / 0.1); // secondary button bg
    --color-purple-500: hsl(242 42% 92%); // secondary button hover Dark
    --color-purple-shadow: hsl(242 48% 58% / 0.5);
    --color-black:  hsl(237 100% 4%); // black
    --color-white: hsl(0 0% 100%); // white
    --color-white-shadow: hsl(0 0% 100% / 0.5);
    --color-overlay: hsl(0 0% 0% / 0.33);
    
    --color-gray-100: hsl(235 16% 15%); // dark bg
    --color-gray-200: hsl(235 12% 19%); // darkgrey
    --color-gray-300: hsl(236 11% 27%); // dark lines
    --color-gray-400: hsl(216 15% 57% / 0.25); // borderColor
    --color-gray-500: hsl(231 5% 50%); // completed subtask
    --color-gray-600: hsl(216 15% 57%); // med grey
    --color-gray-700: hsl(221 69% 94%); // light lines
    --color-gray-800: hsl(220 69% 97%); // light bg
    
    --color-destructive-100: hsl(0 78% 63%);
    --color-destructive-200: hsl(0 100% 80%);
    --color-destructive-shadow: hsl(0 78% 63% / 0.5);

      //=====================
      // COLUMN COLORS
    --color-1: hsl(242 48% 58%);
    --color-2: hsl(193 48% 58%);
    --color-3: hsl(154 48% 58%);
    --color-4: hsl(100 48% 58%);
    --color-5: hsl(60 48% 58%);
    --color-6: hsl(20 48% 58%);
    --color-7: hsl(0 48% 58%);
    --color-8: hsl(320 48% 58%);
      
      //=====================
      // FONT SIZES
    --font-xs: 0.75rem;
    --font-sm: 0.8125rem;
    --font-md: 0.9375rem;
    --font-lg: 1.125rem;
    --font-xl: 1.125rem;
    
    @media screen and ${BREAKPOINTS.tablet} {
      --font-xl: 1.25rem;
    }

    @media screen and ${BREAKPOINTS.desktop} {
      --font-xl: 1.5rem;
    }
      
      //=====================
      // FONT WEIGHTS
    --font-medium: 500;
    --font-bold: 700;

      //=====================
      // LINE HEIGHTS
    --line-height-xs: 1;
    --line-height-sm: 1.25;
    --line-height-md: 1.5;
    --line-height-lg: 1.77;
      
      //=====================
      // SPACING
    --space-xxs: 4px;
    --space-xs: 8px;
    --space-sm: 16px;
    --space-md: 24px;
    --space-lg: 32px;
    --space-xl: 48px;
    --space-xxl: 64px;
    --space-xxxl: 96px;
      
      //=====================
      // BORDER RADIUS
    --radii-xs: 2px;
    --radii-sm: 4px;
    --radii-md: 6px;
    --radii-lg: 8px;
    --radii-round: 9999px;
      //=====================
      // FIXED WIDTHS
    --width-sidebar: 300px;
    --width-dialog: 480px;

      //=====================
      // FIXED HEIGTHS
    --height-topbar: 91px;
    --height-topbar-mobile: 64px;

      //=====================
      // SHADOW
      --shadow-color: 216 15% 57%;
      --shadow: 4px 4px 6px hsl(${shadowColor} / 0.10)
    }
`;
