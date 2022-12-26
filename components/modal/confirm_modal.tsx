import { Button, Flex } from "components/shared"
import { useRef } from "react"
import { Modal } from "./modal"

export const ConfirmModal = ({ title, description, onConfirm, onDismiss }: ConfirmProps) => {
    const modalRef = useRef<any>(null!)
    const dismissHandler = () => modalRef.current.dismiss(onDismiss)
    const confirmHandler = () => modalRef.current.dismiss(onConfirm)

    return (
        <Modal ref={modalRef} title={title} description={description} onDismiss={onDismiss}>
            <Flex bg='brown' align="center" justify="center" className="mt-3" gapX={2}>
                <Button variant='white' style={{ width: '11ch' }} rounded="md" size="md" onClick={dismissHandler}> Cancelar </Button>
                <Button variant='white' style={{ width: '11ch' }} rounded="md" size="md" onClick={confirmHandler}> Confirmar </Button>
            </Flex>
        </Modal>
    )
}