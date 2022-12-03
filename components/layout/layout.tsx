import { ReactNode } from 'react'
import Head from 'next/head'
import { Header } from './header'

interface Props {
    children: ReactNode
    title?: string
    showUser?: boolean
    showBack?: boolean
}

export const Layout = ({ children, title, showUser = false, showBack = false }: Props) => {
    // Take 1
    // let utterance = new SpeechSynthesisUtterance("Hello World");
    //Take 2
    return (
        <>
            <Head>
                <title>{title ? `EatOnTime - ${title}` : 'EatOnTime'}</title>
                <meta name="description" content="Tu cocinas nosotros programamos el sazón" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header showUser={showUser} showBack={showBack} />

            <main>
                {children}
                <button onClick={() => {
                    let utterance = new SpeechSynthesisUtterance();
                    utterance.text = "Subtotal: 10.00 pesos mexicanos";
                    console.log(speechSynthesis.getVoices());
                    speechSynthesis.speak(utterance);
                }}>Speak</button>
            </main>

        </>
    )
}
