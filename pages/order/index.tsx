import { CustomizeOrder, Layout, MenuPreview, OrderFinished } from 'components'
import { Container, Grid, Title } from 'components/shared'
import { parse } from 'cookie'
import { NextPageContext } from 'next'
import { useState } from 'react'
import { redirect404 } from 'utils'
import { getMenu } from 'services'

import styles from 'styles/components/order.module.scss'

interface Props {
  orderId: string
  tableId: string
  menu: ServerPlates[]
}

export type Step = {
  one: -1 | 0 | 1
  two: -1 | 0 | 1
  three: -1 | 0 | 1
}

export default function OrderPage ({ orderId, tableId, menu }: Props) {
  const [currentPlate, setCurrentPlate] = useState<Plate>(null!)
  const [orderInfo, setOrderInfo] = useState<Order>(null!)
  const [step, setStep] = useState<Step>({
    one: 1,
    two: 0,
    three: 0
  })
  return (
    <Layout title='Order'>
      <Title weight='bold' size='2xl' className='pb-0' p={2} align='center'> Orden de la mesa #{tableId} </Title>
      <Grid>
        <Container as='section' p={2}
          className={`${styles.step} ${step.one === -1 && styles.fade} ${step.one === 1 && styles.active}`}>
          <MenuPreview menu={menu} triggerStep={setStep} plateSelected={setCurrentPlate} />
        </Container>
        <Container as='section' p={2}
          className={`${styles.step} ${step.two === -1 && styles.fade} ${step.two === 1 && styles.active}`}>
          <CustomizeOrder
            {...currentPlate}
            triggerStep={setStep}
            setOrderInfo={setOrderInfo}
          />
        </Container>
        <Container as='section' p={2}
          className={`${styles.step} ${step.three === -1 && styles.fade} ${step.three === 1 && styles.active}`}>
          <OrderFinished
            {...orderInfo}
            triggerStep={setStep}
          />
        </Container>
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps (context: NextPageContext) {
  try {
    const { headers: { cookie } } = context.req!

    const { tableId, activityId } = JSON.parse(parse(cookie!).order)

    const menu = await getMenu()
    // DELETE COOKIE
    // context.res!.setHeader('Set-Cookie', 'order=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;')
    return {
      props: {
        tableId,
        activityId,
        menu
      }
    }
  } catch (error) {
    return redirect404
  }
}
