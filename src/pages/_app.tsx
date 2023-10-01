import { Layout } from "@/components/layout/Layout";
import { AppProps } from "next/app";
import localFont from "next/font/local";
import "../styles/globals.css";

const agrandirWide = localFont({
  src: [
    {
      path: "../../public/assets/fonts/PPAgrandir-WideMedium.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/PPAgrandir-WideBold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-agrandir-wide",
});

const agrandir = localFont({
  src: [
    {
      path: "../../public/assets/fonts/PPAgrandir-Medium.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-agrandir",
});

const beatrice = localFont({
  src: [
    {
      path: "../../public/assets/fonts/Beatrice-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Beatrice-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-beatrice",
});

export default function JuicecrowdApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <div
        className={`${agrandirWide.variable} ${agrandir.variable} ${beatrice.variable}`}
      >
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}
