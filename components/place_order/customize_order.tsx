import { Step } from 'pages/order'
import { Dispatch, SetStateAction } from 'react'

interface Props extends Plate {
  triggerStep: Dispatch<SetStateAction<Step>>
  setOrderInfo: Dispatch<SetStateAction<Order>>
}

export const CustomizeOrder = ({ triggerStep, setOrderInfo, ...plate }: Props) => {
  // eslint-disable-next-line no-unused-vars
  const { name, price, description, image } = plate
  return (
    <div>
      <h1>Customize Plate</h1>
    </div>
  )
}
