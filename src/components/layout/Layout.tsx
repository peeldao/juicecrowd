import { PropsWithChildren } from 'react'
import { AppProvider } from './AppProvider'
import { Footer } from './Footer/'
import { NavBarType, Navbar } from './Navbar'

export type LayoutProps = {
  footer?: 'default' | 'minimal' | 'none'
  navbar?: NavBarType
  projectId?: bigint
}

export const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  children,
  footer: footerStyle,
  navbar,
  // TODO: Remove
  projectId,
}) => {
  footerStyle = footerStyle || 'default'
  navbar = navbar || 'default'

  return (
    <>
      <div className="min-h-screen">
        <Navbar type={navbar} projectId={projectId} />
        <main>{children}</main>
      </div>
      {footerStyle !== 'none' ? <Footer type={footerStyle} /> : null}
    </>
  )
}
