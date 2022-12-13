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
        const routeChanged = () => updateIsLoading(false)
        router.events.on('routeChangeComplete', routeChanged)
        return () => router.events.off('routeChangeComplete', routeChanged)
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
        updateReadScreen
    }

    return <>
        <GlobalSettingsContext.Provider value={value}>
            {children}
            {
                isLoading &&
                <Transition />
            }
        </GlobalSettingsContext.Provider>
    </>

}