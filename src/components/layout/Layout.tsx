import { PropsWithChildren } from 'react'
import { AppProvider } from './AppProvider'
import { Footer } from './Footer/'
import { NavBarType, Navbar } from './Navbar'

export type LayoutProps = {
  footer?: 'default' | 'minimal' | 'none'
  navbar?: NavBarType
}

export const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  children,
  footer: footerStyle,
  navbar,
}) => {
  footerStyle = footerStyle || 'default'
  navbar = navbar || 'default'

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar type={navbar} />
        <main className="flex flex-grow flex-col">{children}</main>
      </div>
      {footerStyle !== 'none' ? <Footer type={footerStyle} /> : null}
    </>
  )
}
