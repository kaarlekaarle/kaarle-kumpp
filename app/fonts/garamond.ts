import localFont from 'next/font/local'

export const garamond = localFont({
  src: [
    {
      path: '../../public/fonts/garamond-premier/AGaramondPro-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/garamond-premier/AGaramondPro-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/garamond-premier/AGaramondPro-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/garamond-premier/AGaramondPro-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/garamond-premier/AGaramondPro-SemiboldItalic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/garamond-premier/AGaramondPro-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-garamond',
  display: 'swap',
})
