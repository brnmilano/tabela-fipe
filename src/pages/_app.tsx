import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { ReqsProvider } from "@/hooks/useReq";
import { CommonProvider } from "@/hooks/useCommon";
import "@/styles/globals.scss";
import "@/styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Roboto({ weight: "400", subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <CommonProvider>
        <ReqsProvider>
          <ToastContainer autoClose={2000} theme="colored" />
          <Component {...pageProps} />
        </ReqsProvider>
      </CommonProvider>
    </main>
  );
}
