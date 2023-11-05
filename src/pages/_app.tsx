import { Head } from '@/components/Head'
import { Toaster } from '@/components/ui/Toaster'
import { AppProps } from 'next/app'
import localFont from 'next/font/local'
import '../styles/globals.scss'
import { fonts } from '@/lib/fonts'

export default function JuicecrowdApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-beatrice: ${fonts.beatrice.variable};
            --font-agrandir: ${fonts.agrandir.variable};
            --font-agrandir-wide: ${fonts.agrandirWide.variable};
          }
        `}
      </style>
      <Head />
      <div
        className={`${fonts.beatrice.variable} ${fonts.agrandir.variable} ${fonts.agrandirWide.variable} font-body text-base md:text-sm`}
      >
        <Component {...pageProps} />
      </div>
      <div
        className={`${fonts.beatrice.variable} ${fonts.agrandir.variable} ${fonts.agrandirWide.variable} font-body text-base md:text-sm`}
      >
        <Toaster />
      </div>
    </>
  )
}
