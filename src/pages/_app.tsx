import { AppProvider } from '@/components/layout/AppProvider'
import { Footer } from '@/components/layout/Footer'
import { AppProps } from 'next/app'
import localFont from 'next/font/local'
import '../styles/globals.css'
import { Toaster } from '@/components/ui/Toaster'
import { Head } from '@/components/Head'

const agrandirWide = localFont({
  src: [
    {
      path: '../../public/assets/fonts/PPAgrandir-WideMedium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/PPAgrandir-WideBold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-agrandir-wide',
})

const agrandir = localFont({
  src: [
    {
      path: '../../public/assets/fonts/PPAgrandir-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/PPAgrandir-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-agrandir',
})

const beatrice = localFont({
  src: [
    {
      path: '../../public/assets/fonts/Beatrice-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Beatrice-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-beatrice',
})

export default function JuicecrowdApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <AppProvider>
        <main
          className={`${beatrice.variable} ${agrandir.variable} ${agrandirWide.variable} font-body text-base md:text-sm`}
        >
          <Component {...pageProps} />
        </main>
        <Footer
          className={`${beatrice.variable} ${agrandir.variable} ${agrandirWide.variable} font-body text-base md:text-sm`}
        />
        <div
          className={`${beatrice.variable} ${agrandir.variable} ${agrandirWide.variable} font-body text-base md:text-sm`}
        >
          <Toaster />
        </div>
      </AppProvider>
    </>
  )
}
