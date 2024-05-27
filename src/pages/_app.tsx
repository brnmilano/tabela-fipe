import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { CommonProvider } from "@/hooks/useCommon";
import { RequestsProvider } from "@/hooks/useRequests";
import "@/styles/index.scss";

const inter = Roboto({ weight: "400", subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <CommonProvider>
        <RequestsProvider>
          <Component {...pageProps} />
        </RequestsProvider>
      </CommonProvider>
    </main>
  );
}
