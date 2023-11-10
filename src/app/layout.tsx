import { fonts } from '@/lib/fonts'
import '../styles/globals.scss'
import { ClientRootComponents } from './_components/ClientRootComponents'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${fonts.beatrice.variable} ${fonts.agrandir.variable} ${fonts.agrandirWide.variable} font-body text-base md:text-sm`}
      >
        {children}
        <ClientRootComponents />
      </body>
    </html>
  )
}
