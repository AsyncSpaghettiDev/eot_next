import { AutoUpdate, Layout, OrderCard } from 'components'
import { Flex, Title } from 'components/shared'
import { GetServerSidePropsContext } from 'next'
import { useContext, useEffect, useState } from 'react'
import { getOrders } from 'services'
import { authorize, GlobalSettingsContext, redirectHome, redirectLogin } from 'utils'
import styles from 'styles/components/order.module.scss'

export default function OrdersPage () {
  const { ShowLoader, updateIsLoading } = useContext(GlobalSettingsContext)
  const [orders, setOrders] = useState<ServerOrders>(undefined!)

  useEffect(() => {
    ShowLoader(true)
    getOrders().then(setOrders).finally(() => ShowLoader(false))
  }, [ShowLoader])

  const updateOrders = () => {
    updateIsLoading(true)
    getOrders().then(setOrders).finally(() => updateIsLoading(false))
  }

  const mapOrders = (orders: Order[]) => orders?.map(
    ({ id, quantity, statusId, plate: { image, name } }) =>
      <OrderCard
        key={id}
        id={id}
        quantity={quantity}
        statusId={statusId}
        img={image}
        name={name}
        updateOrders={updateOrders} />
  )

  return (
    <Layout title='Ordenes' showUser>
      <Title weight='bold' size='2xl' p={2} align='center'> Ordenes Activas </Title>
      <AutoUpdate pageName="orders" onUpdate={updateOrders} />

      <Title className={styles.title} transform='capitalize' weight='bold' size='2xl' p={2} align='center'> Ordenes Recien Llegadas </Title>
      <Flex textAlign='center' p={4} gap={4} wrap justify='center'>
        {
          mapOrders(orders?.ordered)
        }
      </Flex>

      <Title className={styles.title} transform='capitalize' weight='bold' size='2xl' p={2} align='center'> Ordenes En Preparación </Title>
      <Flex textAlign='center' p={4} gap={4} wrap justify='center'>
        {
          mapOrders(orders?.cooking)
        }
      </Flex>

      <Title className={styles.title} transform='capitalize' weight='bold' size='2xl' p={2} align='center'> Ordenes para entregar </Title>
      <Flex textAlign='center' p={4} gap={4} wrap justify='center'>
        {
          mapOrders(orders?.ready)
        }
      </Flex>

      <Title style={{ backgroundColor: 'salmon' }} color='white' className={styles.title} transform='capitalize' weight='bold' size='2xl' p={2} align='center'> Ordenes para cancelar </Title>
      <Flex textAlign='center' p={4} gap={4} wrap justify='center'>
        {
          mapOrders(orders?.cancel_request)
        }
      </Flex>

    </Layout>
  )
}

export async function getServerSideProps (ctx: GetServerSidePropsContext) {
  try {
    const { isStaff } = authorize(ctx, '/tables')
    if (!isStaff) return redirectHome

    ctx.res?.setHeader('set-cookie', 'origin=; max-age=-1;')

    return {
      props: {}
    }
  } catch (error) {
    return redirectLogin
  }
}
