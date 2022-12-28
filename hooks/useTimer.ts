import { useState, useEffect, useContext } from 'react'
import { GlobalSettingsContext } from 'utils'

interface Timer {
  initialTime?: number
  callback?: () => void | Promise<void>
}

export const useTimer = ({ callback, initialTime = 30 }: Timer) => {
  const [elapsedTime, setElapsedTime] = useState<number>(initialTime)
  const [isActive, setIsActive] = useState<boolean>(true)
  const { updateIsLoading } = useContext(GlobalSettingsContext)

  let timer: ReturnType<typeof setTimeout>

  const executeCallback = async () => {
    updateIsLoading(true)
    await callback?.()
    updateIsLoading(false)
    setElapsedTime(initialTime)
  }

  useEffect(() => {
    if (!isActive) return setElapsedTime(initialTime)

    if (elapsedTime === 0) { executeCallback() }

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
