import { Transition } from "components/transition"
import { useRouter } from "next/router"
import { createContext, useEffect } from "react"

export const GlobalSettingsContext = createContext<SettingsContext>(null!)

import { ReactNode, useState } from "react"
import styles from 'styles/components/transition.module.css'

interface Props {
    children: ReactNode
}

export const GlobalSettings = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [readScreen, setReadScreen] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        setReadScreen(localStorage.getItem('readScreen') === 'true')

        const routeFChanged = () => updateIsLoading(false)
        const routeSChanged = () => updateIsLoading(true)

        router.events.on('routeChangeComplete', routeFChanged)
        router.events.on('routeChangeStart', routeSChanged)

        return () => {
            router.events.off('routeChangeComplete', routeFChanged)
            router.events.off('routeChangeStart', routeSChanged)
        }
    }, [])

    const updateReadScreen = (value: boolean) => {
        localStorage.setItem('readScreen', value.toString())
        setReadScreen(value)
    }

    const updateIsLoading = (value: boolean) => {
        if (!value) {
            document.getElementById('transition')?.classList.add(styles.hide)
            setTimeout(() => setIsLoading(value), 500)
        }
        else
            setIsLoading(value)

    }

    const value = {
        isLoading,
        updateIsLoading,
        readScreen,
        updateReadScreen,
    }

    return <>
        <GlobalSettingsContext.Provider value={value}>
            {children}
            {
                isLoading &&
                <Transition />
            }
            <div id="modal_root" />
        </GlobalSettingsContext.Provider>
    </>
}