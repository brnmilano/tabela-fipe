import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import "@/styles/globals.scss";
import "@/styles/index.scss";

const inter = Roboto({ weight: "400", subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
