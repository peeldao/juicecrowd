import { Layout } from "@/components/layout/Layout";
import { AppProps } from "next/app";
import "../styles/globals.css";

export default function JuicecrowdApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
