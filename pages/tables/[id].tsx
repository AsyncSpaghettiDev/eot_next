import { ConfirmModal, Layout, OrderDetail } from 'components'
import { Button, Container, Flex, Grid, Text, Title, Table } from 'components/shared'
import { GetServerSidePropsContext } from 'next'
import { getActivity, updateActivity } from 'services'
import { authorize, formatMoney, getElapsedTime, GlobalSettingsContext, parseDate, redirect404, redirectLogin } from 'utils'
import styles from 'styles/pages/table.module.scss'
import Image from 'next/image'
import { useStopwatch } from 'hooks'
import { useRouter } from 'next/router'
import { useContext, useMemo, useState } from 'react'
import { AxiosError } from 'axios'

interface Props extends Activity { }
export default function TableDetail ({
  tableId,
  status: { name },
  id: activityId,
  people,
  start,
  end,
  elapsed,
  orders
}: Props) {
  const { elapsedTime } = useStopwatch(elapsed!)
  const router = useRouter()
  const [showRelease, setShowRelease] = useState(false)
  const { ShowLoader } = useContext(GlobalSettingsContext)
  const currentSubtotal = useMemo(() => orders?.reduce((subTotal, order) => subTotal + parseInt(order.subtotal.toString()), 0), [orders])

  const handleOrder = () => {
    document.cookie = `order=${JSON.stringify({ tableId, activityId })}; path=/; max-age=${60 * 5};`
    router.push('/order/')
  }

  const handleRelease = () => setShowRelease(true)

  return (
    <Layout title={`Mesa #${tableId}`} showUser>
      <Container style={{ maxWidth: '800px' }} mx='auto' p={3}>
        <Grid className={styles.hero}>
          <Image src='/svg/hero.svg' alt='hero' width={125} height={125} style={{ gridArea: 'logo', justifySelf: 'center' }} />
          <Title mx={2} size='2xl' weight='bold' style={{ gridArea: 'title', alignSelf: 'end' }}>Mesa #{tableId}</Title>
          {
            name === 'occupied' && <Button size='sm' px={2} className='flex gap-2' variant='filled' style={{ gridArea: 'order' }} onClick={handleOrder}>
              <Image src='/svg/order.svg' alt='order' width={20} height={20} />
              Ordenar
            </Button>
          }
        </Grid>
        <Flex direction='col' align='center' className='text-center'>
          <Text size='lg' transform='capitalize' className='flex items-center gap-x-2'>
            Estado: {name} <span className={`${styles[name]} ${styles.status}`} />
          </Text>
          <Text size='lg' transform='capitalize'> {people} personas</Text>
          <Text size='lg' transform='capitalize'> {`Hora de entrada: ${parseDate(start)}`} </Text>
          <Text size='lg' transform='capitalize'> {elapsedTime} </Text>
          <Text size='lg' transform='capitalize'> {`Hora de salida: ${end ?? 'Sin Salida'}`} </Text>
        </Flex>
        <Container my={3}>
          <Title align='center' order={3} size='xl' weight='bold' transform='uppercase'>Ordenes</Title>
          <Table id='orders' mx='auto' rounded='md'>
            {
              orders.map(order => <OrderDetail key={order.id} order={order} />)
            }
          </Table>
        </Container>
        <Flex direction='col' align='center' gy={2}>
          <Text size='2xl' color='black' font='primary' transform='uppercase'>
            Subtotal <output id='subtotal'>${formatMoney(currentSubtotal)}</output> MXN
          </Text>
          {
            name === 'occupied' &&
            <Button onClick={handleRelease} variant='outline' rounded='full' px={10} py={4} size='lg'> PEDIR CUENTA </Button>
          }
        </Flex>
      </Container>
      {
        showRelease && (
          <ConfirmModal
            title={`Pedir cuenta de la mesa #${tableId}`}
            description='¿Desea solicitar la cuenta de la mesa?'
            onConfirm={async () => {
              setShowRelease(false)
              ShowLoader(true)
              updateActivity(activityId).then(router.reload)
                .catch(error => {
                  if (error instanceof AxiosError && error.response?.status === 409) { return alert('La mesa tiene ordenes pendientes') }
                })
                .finally(() => ShowLoader(false))
            }}
            onCancel={() => setShowRelease(false)}
          />
        )
      }
    </Layout>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const { id } = context.query
    if (!id) return redirect404
    const { isStaff, tableId } = authorize(context, '/tables')

    if (!isStaff && tableId !== parseInt(id as string)) return redirect404

    const activity = await getActivity(parseInt(id as string))

    return {
      props: {
        ...activity,
        elapsed: getElapsedTime(activity.start) ?? { hours: 0, minutes: 0, seconds: 0 }
      }
    }
  } catch (error) {
    return redirectLogin
  }
}
