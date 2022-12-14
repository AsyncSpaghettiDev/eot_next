/* eslint-disable @next/next/no-img-element */
import { Button, Text, Title } from 'components/shared'
import { useContext, useState } from 'react'
import { getOrderStatus } from 'services'
import styles from 'styles/components/order.module.scss'
import { GlobalSettingsContext } from 'utils'
import { OrderModal } from './order_modal'

interface Props {
  order: Order
}

export const OrderDetail = ({ order: { id, plate: { name, price, image }, quantity }, order }: Props) => {
  const [orderStatus, setOrderStatus] = useState<Status | undefined>(undefined)
  const [showStatus, setShowStatus] = useState(false)
  const { ShowLoader } = useContext(GlobalSettingsContext)

  // Handlers
  const handleClick = async () => {
    ShowLoader(true)
    await getOrderStatus(id).then(setOrderStatus).then(_ => setShowStatus(true))
    ShowLoader(false)
  }

  return (
    <>
      <tr>
        <td>
          <img className={styles.order_img} src={image} alt={name} width={70} height={70} />
        </td>
        <td>
          <Title order={4} size='lg' weight='bold' transform='capitalize'>
            {name}
          </Title>
          <Text size='lg' transform='capitalize'>
            {price} MXN
          </Text>
          <Text size='lg' transform='capitalize'>
            {quantity} {quantity > 1 ? 'porciones' : 'porción'}
          </Text>
        </td>
        <td>
          <Button onClick={handleClick} size='sm' px={2} py={2}>
            Estado
          </Button>
        </td>
      </tr>
      {
        showStatus && (
          <OrderModal order={order} status={orderStatus!} onDismiss={() => setShowStatus(false)} />
        )
      }
    </>
  )
}
