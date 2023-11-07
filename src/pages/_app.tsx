import { Head } from '@/components/Head'
import { Toaster } from '@/components/ui/Toaster'
import { installJuicecrowdWindowObject } from '@/lib/featureFlags'
import { fonts } from '@/lib/fonts'
import { AppProps } from 'next/app'
import { useEffect } from 'react'
import '../styles/globals.scss'

export default function JuicecrowdApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    installJuicecrowdWindowObject()
  }, [])

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
