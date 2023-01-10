import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Modal } from './modal'
import styles from 'styles/components/modal.module.scss'
import { Flex, Text } from 'components/shared'

export const Loading = forwardRef((_, ref) => {
  const modalRef = useRef<any>(null!)

  useImperativeHandle(ref, () => ({
    dismiss: async (callback?: () => void) => {
      modalRef.current.dismiss(callback)
    }
  }))

  return (
    <Modal ref={modalRef}>
      <Flex bg='brown' className={styles.loader} gy={2} mx='auto' align='center' wrap justify='center'>
        <span className={styles.ball} />
        <span className={styles.ball} />
        <span className={styles.ball} />
        <span className={styles.ball} />
        <Text color='white' size='lg' weight='bold' align='center' font='primary' className='w-full'> Cargando </Text>
      </Flex>
    </Modal>
  )
})

Loading.displayName = 'Loading'
