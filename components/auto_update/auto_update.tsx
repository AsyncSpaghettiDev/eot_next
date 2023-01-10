import { useTimer } from 'hooks'
import { useEffect, useState } from 'react'
import { Flex } from '../shared/containers'
import { Text, Title } from '../shared/typography'

interface Props {
  onUpdate: () => void
  pageName: string
  interval?: number
}
export const AutoUpdate = ({ onUpdate, interval, pageName }: Props) => {
  const [autoUpdate, setAutoUpdate] = useState(false)
  const { elapsedMessage, stopTime, enableTimer } = useTimer({
    callback: onUpdate,
    initialTime: interval
  })

  useEffect(() => {
    const autoUpdate = localStorage.getItem(`autoUpdate_${pageName}`)
    if (autoUpdate) setAutoUpdate(autoUpdate === 'true')
  }, [pageName])

  useEffect(() => {
    if (autoUpdate) enableTimer()
    else stopTime()
  }, [autoUpdate, enableTimer, stopTime])

  const onChange = () => {
    localStorage.setItem(`autoUpdate_${pageName}`, (!autoUpdate).toString())
    setAutoUpdate(!autoUpdate)
  }

  return (
    <Flex justify='center' align='center' direction='col'>
      <Title align='center' size='xl' order={3}>{elapsedMessage}</Title>
      <Flex justify='center' align='center' gx={2}>
        <label htmlFor='autoUpdate'>
          <Text size='lg'>Actualizar automaticamente</Text>
        </label>
        <input checked={autoUpdate} onChange={onChange} id='autoUpdate' type='checkbox' />
      </Flex>
    </Flex>
  )
}
