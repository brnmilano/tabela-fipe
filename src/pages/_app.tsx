import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { ReqsProvider } from "@/hooks/useReq";
import { CommonProvider } from "@/hooks/useCommon";
import "@/styles/globals.scss";
import "@/styles/index.scss";

const inter = Roboto({ weight: "400", subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <CommonProvider>
        <ReqsProvider>
          <Component {...pageProps} />
        </ReqsProvider>
      </CommonProvider>
    </main>
  );
}
