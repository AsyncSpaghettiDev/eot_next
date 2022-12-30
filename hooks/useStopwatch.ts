import { useState, useEffect } from 'react'

export const useStopwatch = ({ seconds: s, minutes: m, hours: h }: ElapsedTime = { seconds: 0, minutes: 0, hours: 0 }) => {
  const [seconds, setSeconds] = useState(s)
  const [minutes, setMinutes] = useState(m)
  const [hours, setHours] = useState(h)
  const [isActive, setIsActive] = useState(true)

  let timer: ReturnType<typeof setTimeout>
  useEffect(() => {
    if (!isActive) return setSeconds(0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    timer = setInterval(() => {
      setSeconds(seconds + 1)

      if (minutes === 59 && seconds === 59) {
        setHours(hours + 1)
        setMinutes(0)
        setSeconds(0)
      } else if (seconds === 59) {
        setMinutes(minutes + 1)
        setSeconds(0)
      }
    }, 1000)

    return () => clearInterval(timer)
  })

  const stopTime = () =>
    setIsActive(false)

  const elapsedTime = `Tiempo Corrido: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  const setInitial = ({ seconds, minutes, hours }: ElapsedTime) => {
    setSeconds(seconds)
    setMinutes(minutes)
    setHours(hours)
  }

  return { elapsedTime, stopTime, setInitial }
}
