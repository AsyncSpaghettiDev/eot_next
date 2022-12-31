/* eslint-disable no-unused-vars */
interface ModalProps {
  title?: string
  description?: string
  onDismiss?: () => void
  children?: ReactNode
}

interface ConfirmProps extends ModalProps {
  onConfirm: () => void
  onCancel: () => void
}
