import { Modal } from 'components/modal'
import { Button, Text } from 'components/shared'
import { requestOrderCancellation } from 'services'
import { OrderStatus, parseDate } from 'utils'

interface Props {
  status: Status
  onDismiss: () => void
  order: Order
}

export const OrderModal = ({ status: { id: statusId }, onDismiss, order }: Props) => {
  const { id, plate: { name }, quantity, subtotal, createdAt, updatedAt } = order

  const submitCancel = async () => {
    if (confirm('¿Estás seguro de cancelar la orden?')) {
      await requestOrderCancellation(id)
      onDismiss()
    }
  }

  return (
    <Modal title={`Orden #${id}`} onDismiss={onDismiss}>
      <Text color='white' size='lg'> Nombre del platillo: {name} </Text>
      <Text color='white' size='lg'> Costo: {subtotal} MXN </Text>
      <Text color='white' size='lg'> Cantidad: {quantity} </Text>
      <Text color='white' size='lg'> Fecha de la orden: {parseDate(createdAt)} </Text>
      <Text color='white' size='lg'> Estado: {OrderStatus[statusId]} </Text>
      {
        statusId === OrderStatus.Servida && (
          <Text color='white' size='lg'> Fecha de entrega: {parseDate(updatedAt)} </Text>
        )
      }
      {
        statusId === OrderStatus.Cancelada && (
          <Text color='white' size='lg'> Fecha de cancelación: {parseDate(updatedAt)} </Text>
        )
      }
      {
        statusId === OrderStatus.Ordenada && (
          <Button variant='white' rounded='md' onClick={submitCancel} className='mt-2' size='sm' px={2} py={2}>
            Solicitar Cancelación
          </Button>
        )
      }
    </Modal>
  )
}
