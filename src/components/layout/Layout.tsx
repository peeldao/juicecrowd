import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AppProvider } from "./AppProvider";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </AppProvider>
  );
}
