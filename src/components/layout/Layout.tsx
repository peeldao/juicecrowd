import { AppProvider } from './AppProvider'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </AppProvider>
  )
}
