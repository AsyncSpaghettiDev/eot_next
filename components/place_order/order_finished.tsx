import { Step } from 'pages/order'
import { Dispatch, SetStateAction } from 'react'

interface Props extends Order {
  triggerStep: Dispatch<SetStateAction<Step>>
}

export const OrderFinished = ({ triggerStep, ...order }: Props) => {
  return (
    <div>
      <h1>Order Finished</h1>
    </div>
  )
}
