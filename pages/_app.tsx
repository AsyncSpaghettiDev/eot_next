import '/styles/globals.css'
import type { AppProps } from 'next/app'
import { GlobalAuth, GlobalSettings } from 'utils'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>EatOnTime</title>
      <meta name="description" content="Tu cocinas nosotros programamos el sazón" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <GlobalSettings>
      <GlobalAuth>
        <Component {...pageProps} />
      </GlobalAuth>
    </GlobalSettings>

    <div id="modal_section" />
    <div id="transition_section" />
  </>
}
