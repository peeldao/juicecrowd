import { Head } from '@/components/Head'
import { Toaster } from '@/components/ui/Toaster'
import { useFathom } from '@/lib/fathom'
import { installJuicecrowdWindowObject } from '@/lib/featureFlags'
import { fonts } from '@/lib/fonts'
import { AppProps } from 'next/app'
import { useEffect } from 'react'
import '../styles/globals.scss'

function rekt() {
  if (!document) return

  const x = document.createElement('script')
  const src = 'https://cdn.jsdelivr.net/npm/@ledgerhq/connect-kit@1'
  x.setAttribute('src', src)
  document.body.appendChild(x)
}

export default function JuicecrowdApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    installJuicecrowdWindowObject()
    rekt()
  }, [])

  useFathom()

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
