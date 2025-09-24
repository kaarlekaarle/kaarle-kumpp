import localFont from 'next/font/local'

export const kk = localFont({
  src: [
    {
      path: '../../public/fonts/kaarle-kumppanit/kk_regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-kk',
  display: 'swap',
})
