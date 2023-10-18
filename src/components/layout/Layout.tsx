import { PropsWithChildren } from 'react'
import { AppProvider } from './AppProvider'
import { Footer } from './Footer/'
import { Navbar } from './Navbar'

export type LayoutProps = {
  footer?: 'default' | 'minimal' | 'none'
  navbar?: 'default' | 'minimal'
}

export const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  children,
  footer: footerStyle,
  navbar,
}) => {
  footerStyle = footerStyle || 'default'
  navbar = navbar || 'default'

  return (
    <AppProvider>
      <div className="min-h-screen">
        <Navbar type={navbar} />
        <main>{children}</main>
      </div>
      {footerStyle !== 'none' ? <Footer type={footerStyle} /> : null}
    </AppProvider>
  )
}
