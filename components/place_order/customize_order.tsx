/* eslint-disable @next/next/no-img-element */
import { ConfirmModal } from 'components'
import { Button, Flex, Text, Title } from 'components/shared'
import { useCounter } from 'hooks'
import { Step } from 'pages/order'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { createOrder } from 'services'
import styles from 'styles/components/order.module.scss'
import { formatMoney, GlobalSettingsContext } from 'utils'

interface Props extends Plate {
  activityId: number
  notes: Note[]
  triggerStep: Dispatch<SetStateAction<Step>>
  setOrderInfo: Dispatch<SetStateAction<Order>>
}

export const CustomizeOrder = ({ triggerStep, setOrderInfo, notes, activityId, id, ...plate }: Props) => {
  const { name, price, description, image } = plate
  const { counter, increase, decrease, greaterOne, reset } = useCounter()
  const [confirm, setConfirm] = useState(false)
  const { ShowLoader } = useContext(GlobalSettingsContext)

  const handleConfirm = () => {
    setConfirm(true)
  }

  const handleBack = () => triggerStep(prev => ({ ...prev, two: -1, one: 1 }))

  return (
    <>
      <Flex direction='col' justify='center' align='center' gy={1} textAlign='center'>
        <img className={`${styles.image}`} src={image} alt={name} />
        <Title order={3} weight='bold' size='xl'> {name} </Title>
        <Text size='lg' weight='bold'> ${formatMoney(counter * price)} MXN </Text>
        <Text size='lg'> {description} </Text>
        <Text size='lg'> {notes.map(note => note.name).join(', ')} </Text>

        <Flex align='center' gx={1} className={styles.counter}>
          <Button variant='outline' onClick={decrease} disabled={(!greaterOne())} >-</Button>
          <output>{counter.toString().padStart(2, '0')}</output>
          <Button variant='outline' onClick={increase}>+</Button>
        </Flex>

        <Button size='lg' px={8} py={4} rounded='full' onClick={handleConfirm} className='uppercase mt-4'> Ordenar </Button>
        <Button size='lg' px={8} py={4} rounded='full' onClick={handleBack} className='uppercase mt-10' variant='outline'> Volver al menú </Button>
      </Flex>
      {
        confirm && (
          <ConfirmModal title='Confirmar orden' description={`¿Estás seguro de ordenar ${counter} ${name}?`}
            onConfirm={async () => {
              ShowLoader(true)
              setConfirm(false)
              // await wait(2000)
              await createOrder({
                quantity: counter,
                subtotal: counter * price,
                activityId,
                plateId: id
              }).then(setOrderInfo)
              ShowLoader(false)
              reset()
              triggerStep(prev => ({ ...prev, two: -1, three: 1 }))
            }}
            onDismiss={() => setConfirm(false)}
            onCancel={() => setConfirm(false)} />
        )
      }
    </>
  )
}
