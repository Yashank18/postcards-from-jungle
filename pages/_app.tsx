import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Manrope } from "next/font/google";

const font = Manrope({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: font.style.fontFamily, 
          /** Put your mantine theme override here */
          colorScheme: "light",
          primaryColor: 'orange'
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
