import { PropsWithChildren } from 'react'
import { AppProvider } from './AppProvider'
import { Footer } from './Footer/'
import { Navbar } from './Navbar'

export type LayoutProps = {
  footer?: 'default' | 'none'
}

export const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  children,
  footer: footerStyle,
}) => {
  footerStyle = footerStyle || 'default'
  return (
    <AppProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>{children}</main>
      </div>
      {footerStyle === 'default' ? <Footer /> : null}
    </AppProvider>
  )
}
