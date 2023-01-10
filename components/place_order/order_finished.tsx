import { Button, Flex, Text } from 'components/shared'
import Image from 'next/image'
import { Step } from 'pages/order'
import { Dispatch, SetStateAction } from 'react'
import styles from 'styles/components/order.module.scss'
import { castDate, formatMoney } from 'utils'
interface Props extends Order {
  triggerStep: Dispatch<SetStateAction<Step>>
}

export const OrderFinished = ({ triggerStep, ...order }: Props) => {
  const { id, plate: { name }, subtotal, quantity, createdAt } = order
  const handleBack = () => triggerStep(prev => ({ ...prev, three: -1, one: 1 }))
  return (
    <Flex align='center' direction='col' p={4} gy={2}>
      <Image width={150} height={150} className={styles.order_img} src='/svg/check.svg' alt="order completed successfully" />
      <Text size='xl'> Orden completada con éxito, a continuación se muestran los detalles de la orden </Text>
      <Text size='xl' weight='bold'> Orden No.{id} </Text>
      <Text size='lg'> Nombre del platillo: {name} </Text>
      <Text size='lg'> Subtotal: ${formatMoney(subtotal)} MXN </Text>
      <Text size='lg'> Cantidad ordenada: {quantity} pieza{quantity > 1 && 's'} </Text>
      <Text size='lg'> Fecha de orden: {`${castDate(createdAt)}`} </Text>
      <Button size='lg' px={8} py={4} rounded='full' onClick={handleBack} className='uppercase mt-10' variant='outline'> Volver al menú </Button>
    </Flex>
  )
}
