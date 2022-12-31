// Styles
import styles from 'styles/components/modal.module.scss'

import { forwardRef, MouseEvent, useImperativeHandle, useRef } from 'react'
import { Text, Title } from 'components/shared'
import { createPortal } from 'react-dom'

export const Modal = forwardRef(({ title, description, children, onDismiss }: ModalProps, ref) => {
  const modalRef = useRef<HTMLDivElement>(null!)

  useImperativeHandle(ref, () => ({
    dismiss: async (callback?: () => void) => {
      modalRef.current.classList.add(styles.hide)
      setTimeout(() => {
        callback?.()
        Promise.resolve()
      }, 500)
    }
  }))
  // Handlers
  const dismissHandler = (e: MouseEvent<HTMLDivElement>) => {
    propagationHandler(e)
    modalRef.current?.classList.add(styles.hide)
    setTimeout(() => onDismiss?.(), 500)
  }

  const propagationHandler = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation()

  if (!title && !description) {
    return createPortal(
      <div className={styles.modal} ref={modalRef} onClick={dismissHandler}>
        <div onClick={propagationHandler} className={styles.body} role="dialog">
          {children}
        </div>
      </div>, document.getElementById('modal_root')!
    )
  }

  return createPortal(
    <div className={styles.modal} ref={modalRef} onClick={dismissHandler}>
      <div onClick={propagationHandler} className={styles.body} role="dialog" aria-labelledby="modal_title" aria-describedby="modal_description">
        <Title color='white' transform='capitalize' size='2xl' weight='semibold' order={2} my={2} id="modal_title"> {title} </Title>
        <Text color='white' size='lg' id="modal_description"> {description} </Text>
        {children}
      </div>
    </div>, document.getElementById('modal_root')!
  )
})

Modal.displayName = 'Modal'
