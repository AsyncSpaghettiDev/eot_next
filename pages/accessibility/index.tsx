import { Layout } from "components/layout"
import { Card, Flex, Hearable, Text, Title } from "components/shared"
import { useContext } from "react"
import { GlobalSettingsContext } from "utils"
import styles from 'styles/pages/accessibility.module.css'
import Image from "next/image"

const AccessibilityPage = () => {
    const { updateReadScreen, readScreen } = useContext(GlobalSettingsContext)
    const toogleHearable = () => {
        updateReadScreen(!readScreen)
        const utterance = new SpeechSynthesisUtterance()
        utterance.text = `Escuchar sonidos al dar click ${readScreen ? 'deshabilitado' : 'habilitado'}`
        speechSynthesis.speak(utterance)
    }
    return (
        <Layout>
            <Title my={2} align='center' size="2xl" weight="bold">Opciones de accesibilidad</Title>
            <Flex p={4} wrap>
                <Card textAlign="center" p={2} className={styles.setting} onClick={toogleHearable}>
                    <Title order={2} size="lg" weight="bold">Escuchar sonidos</Title>
                    <Text size="sm">Escuchar sonidos al dar click por los elementos</Text>
                    <Image className="mx-auto" src="/img/sound.png" width={80} height={80} alt='toggle sound' />
                    <Hearable />
                    <input className={styles.checkbox} type="checkbox" checked={readScreen} />
                </Card>
            </Flex>
        </Layout>
    )
}

export default AccessibilityPage
