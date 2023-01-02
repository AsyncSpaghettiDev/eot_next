import { Modal } from 'components/modal'
import { Text } from 'components/shared'
import { parseDate } from 'utils'

interface Props extends Activity {
  onDismiss: () => void
}

export const ActivityModal = ({ onDismiss, table: { name }, status: { name: statusName }, start, end, people, orders }: Props) => {
  return (
    <Modal title={name} onDismiss={onDismiss}>
      <Text color='white' transform='capitalize' size='lg'>Estado: {statusName}</Text>
      <Text color='white' transform='capitalize' size='lg'>Hora de entrada: {parseDate(start)}</Text>
      <Text color='white' transform='capitalize' size='lg'>Hora de salida: {end ? parseDate(end) : 'Sin Salida'}</Text>
      <Text color='white' transform='capitalize' size='lg'>Personas en la mesa: {people}</Text>
      <Text color='white' transform='capitalize' size='lg'>Ordenes:</Text>
      <ul>
        {orders.map(({ id, plate: { name }, subtotal, quantity }) => (
          <li key={id}>
            <Text color='white' decoration='underline' transform='capitalize' weight='light' size='md'>
              {name} - {subtotal} - {quantity}
            </Text>
          </li>
        ))}
      </ul>
    </Modal>
  )
}
