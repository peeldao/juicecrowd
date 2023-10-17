import { AppProvider } from './AppProvider'
import { Footer } from './Footer/'
import { Navbar } from './Navbar'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </AppProvider>
  )
}
