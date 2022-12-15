// Styles
import styles from 'styles/components/modal.module.css'

import { MouseEvent, ReactNode, useRef } from 'react'
import { Text, Title } from 'components/shared'
import { createPortal } from 'react-dom'

interface Props {
    title: string
    description: string
    onDismiss?: () => void
    children?: ReactNode
}

export const Modal = ({ title, description, children, onDismiss }: Props) => {
    const modalRef = useRef<HTMLDivElement>(null!)
    // Handlers
    const dismissHandler = (e: MouseEvent<HTMLDivElement>) => {
        propagationHandler(e)
        modalRef.current?.classList.add(styles.hide)
        setTimeout(() => onDismiss?.(), 500)
    }

    const propagationHandler = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation()

    return createPortal(
        <div className={styles.modal} ref={modalRef} onClick={dismissHandler}>
            <div onClick={propagationHandler} className={styles.body} role="dialog" aria-labelledby="modal_title" aria-describedby="modal_description">
                <Title color='white' transform='capitalize' size='2xl' weight='semibold' order={2} my={2} id="modal_title"> {title} </Title>
                <Text color='white' size='lg' id="modal_description"> {description} </Text>
                {children}
            </div>
        </div>, document.getElementById('modal_root')!
    )
}