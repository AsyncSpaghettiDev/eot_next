import { useState, useEffect, useContext } from "react"
import { GlobalSettingsContext } from "utils"

interface Timer {
    initial_time?: number
    callback?: () => void | Promise<void>
}

export const useTimer = ({ callback, initial_time = 30 }: Timer) => {
    const [elapsedTime, setElapsedTime] = useState<number>(initial_time)
    const [isActive, setIsActive] = useState<boolean>(true)
    const { updateIsLoading } = useContext(GlobalSettingsContext)

    let timer: ReturnType<typeof setTimeout>

    const executeCallback = async () => {
        updateIsLoading(true)
        await callback?.()
        updateIsLoading(false)
        setElapsedTime(initial_time)
    }

    useEffect(() => {
        if (!isActive) return setElapsedTime(initial_time)

        if (elapsedTime === 0)
            executeCallback()

        timer = setInterval(() => {
            setElapsedTime(elapsedTime - 1)
        }, 1000)

        return () => clearInterval(timer)
    })

    const enableTimer = () => setIsActive(true)
    const stopTime = () => setIsActive(false)

    const elapsedMessage = `Tiempo para la siguiente actualización: ${elapsedTime}s`
    return { elapsedTime, elapsedMessage, stopTime, enableTimer }
}