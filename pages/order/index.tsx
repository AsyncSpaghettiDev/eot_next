import { CustomizeOrder, Layout, MenuPreview, OrderFinished } from 'components'
import { Container, Grid, Title } from 'components/shared'
import { parse } from 'cookie'
import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import { authorize, redirect404 } from 'utils'
import { getMenu, getNotes } from 'services'

import styles from 'styles/components/order.module.scss'

interface Props {
  activityId: number
  orderId: string
  tableId: string
  menu: ServerPlates[]
  notes: Note[]
}

export type Step = {
  one: -1 | 0 | 1
  two: -1 | 0 | 1
  three: -1 | 0 | 1
}

export default function OrderPage ({ activityId, notes, tableId, menu }: Props) {
  const [currentPlate, setCurrentPlate] = useState<Plate>(null!)
  const [orderInfo, setOrderInfo] = useState<Order>(null!)
  const [step, setStep] = useState<Step>({
    one: 1,
    two: 0,
    three: 0
  })
  return (
    <Layout title='Order' showUser>
      <Title weight='bold' size='2xl' p={2} align='center'> Orden de la mesa #{tableId} </Title>
      <Grid>
        <Container as='section' p={2}
          className={`${styles.step} ${step.one === -1 && styles.fade} ${step.one === 1 && styles.active}`}>
          <MenuPreview menu={menu} triggerStep={setStep} plateSelected={setCurrentPlate} />
        </Container>
        <Container as='section' p={2}
          className={`${styles.step} ${step.two === -1 && styles.fade} ${step.two === 1 && styles.active}`}>
          <CustomizeOrder
            {...currentPlate}
            activityId={activityId}
            notes={notes}
            triggerStep={setStep}
            setOrderInfo={setOrderInfo}
          />
        </Container>
        <Container as='section' p={2}
          className={`${styles.step} ${step.three === -1 && styles.fade} ${step.three === 1 && styles.active}`}>
          {
            orderInfo && <OrderFinished {...orderInfo} triggerStep={setStep} />
          }
        </Container>
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  try {
    const { headers: { cookie } } = context.req

    authorize(context, 'order')
    const { tableId, activityId } = JSON.parse(parse(cookie!).order)

    const menu = await getMenu()
    const notes = await getNotes()
    // DELETE COOKIE
    // context.res!.setHeader('Set-Cookie', 'order=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;')
    return {
      props: {
        tableId,
        activityId,
        menu,
        notes
      }
    }
  } catch (error) {
    return redirect404
  }
}
