/* eslint-disable @next/next/no-img-element */
import { ConfirmModal } from 'components/modal'
import { Card, Text } from 'components/shared'
import { useContext, useState } from 'react'
import { cancelOrder, updateOrderStatus } from 'services'
import styles from 'styles/components/order.module.scss'
import { GlobalSettingsContext, OrderStatus } from 'utils'

interface Props {
  id: number
  quantity: number
  statusId: number
  img: string
  name: string
  updateOrders: () => void
}

export const OrderCard = ({ id, quantity, statusId, img, name, updateOrders }: Props) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const { ShowLoader } = useContext(GlobalSettingsContext)

  const showConfirmHandler = () => setShowConfirm(true)

  const updateOrder = async () => {
    ShowLoader(true)
    if (statusId === OrderStatus['Cancelación solicitada']) {
      return cancelOrder(id).then(updateOrders).finally(() => ShowLoader(false))
    }
    updateOrderStatus(id, statusId + 1).finally(() => {
      updateOrders()
      ShowLoader(false)
    }).catch(() => {
      alert('Se ha solicitado la cancelación de la orden, recuerde que debe cancelarla en el tiempo establecido')
    })
  }

  return (
    <>
      <Card align='center' className={styles.card} onClick={showConfirmHandler}>
        <img className={styles.order_img} src={img} alt={name} />
        <Text> Platillo: {name} </Text>
        <Text> Cantidad Ordenada: {quantity}</Text>
        <Text> Número de orden: {id} </Text>
        <Text> Estado: {OrderStatus[statusId]} </Text>
      </Card>
      {
        showConfirm && (
          <ConfirmModal
            title={`¿Desea actualizar la orden #${id}?`}
            description={`Seleccione sí para cambiar el status de ${OrderStatus[statusId]} a ${OrderStatus[statusId + 1]}`}
            onConfirm={updateOrder}
            onDismiss={() => setShowConfirm(false)}
            onCancel={() => setShowConfirm(false)}
          />
        )
      }
    </>
  )
}
