import styles from 'styles/components/form.module.css'
import { Flex } from "components/shared"
import { ReactNode } from "react"

interface Props {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    children: ReactNode
    autoComplete?: string
}

export const Form = ({ onSubmit, children, autoComplete = 'off' }: Props) => {
    return (
        <form onSubmit={onSubmit} autoComplete={autoComplete}>
            <Flex direction="col" gap={3} p={8} rounded='lg' m={3} mx='auto' justify='center' align='center' className={styles.form}>
                {children}
            </Flex>
        </form>
    )
}