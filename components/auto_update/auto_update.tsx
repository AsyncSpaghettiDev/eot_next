import { useTimer } from "hooks"
import { useEffect, useState } from "react"
import { Flex } from "../shared/containers"
import { Text, Title } from "../shared/typography"

interface Props {
    onUpdate: () => void
    page_name: string
    interval?: number
}
export const AutoUpdate = ({ onUpdate, interval, page_name }: Props) => {
    const [autoUpdate, setAutoUpdate] = useState(false)
    const { elapsedMessage, stopTime, enableTimer } = useTimer({
        callback: onUpdate,
        initial_time: interval
    })

    useEffect(() => {
        const auto_update = localStorage.getItem(`auto_update_${page_name}`)
        if (auto_update)
            setAutoUpdate(auto_update === 'true')
    }, [])

    useEffect(() => {
        if (autoUpdate)
            enableTimer()
        else
            stopTime()
    }, [autoUpdate])

    const onChange = () => {
        localStorage.setItem(`auto_update_${page_name}`, (!autoUpdate).toString())
        setAutoUpdate(!autoUpdate)
    }

    return (
        <Flex justify="center" align="center" direction="col">
            <Title align="center" size="xl" order={3}>{elapsedMessage}</Title>
            <Flex justify="center" align="center" gapX={2}>
                <label htmlFor="auto_update">
                    <Text size="lg">Actualizar automaticamente</Text>
                </label>
                <input checked={autoUpdate} onChange={onChange} id='auto_update' type="checkbox" />
            </Flex>
        </Flex>
    )
}