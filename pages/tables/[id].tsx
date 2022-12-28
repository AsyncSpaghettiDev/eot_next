import { Layout } from 'components'
import { Button, Container, Flex, Grid, Text, Title, Table } from 'components/shared'
import { NextPageContext } from 'next'
import { getActivity } from 'services'
import { authorize, castDate, getElapsedTime, parseDate, redirect404, redirectLogin } from 'utils'
import styles from 'styles/pages/table.module.css'
import Image from 'next/image'
import { useStopwatch } from 'hooks'
import { useRouter } from 'next/router'

interface Props {
  activity: Activity
}
export default function TableDetail ({
  activity: {
    tableId,
    status: { name },
    id,
    people,
    start,
    end,
    elapsed,
    orders
  }
}: Props) {
  const { elapsedTime } = useStopwatch(elapsed!)
  const router = useRouter()

  const handleOrder = () => {
    document.cookie = `order=${JSON.stringify({ tableId, activityId: id })}; path=/; max-age=${60 * 5};`
    router.push('/order/')
  }

  return (
    <Layout title={`Mesa #${tableId}`} showUser>
      <Container style={{ maxWidth: '800px' }} mx='auto' p={3}>
        <Grid className={styles.hero}>
          <Image src='/svg/hero.svg' alt='hero' width={125} height={125} style={{ gridArea: 'logo', justifySelf: 'center' }} />
          <Title mx={2} size='2xl' weight='bold' style={{ gridArea: 'title', alignSelf: 'end' }}>Mesa #{tableId}</Title>
          <Button size='sm' px={2} className='flex gap-2' variant='filled' style={{ gridArea: 'order' }} onClick={handleOrder}>
            <Image src='/svg/order.svg' alt='order' width={20} height={20} />
            Ordenar
          </Button>
        </Grid>
        <Flex direction='col' align='center'>
          <Text size='lg' transform='capitalize' className='flex items-center gap-x-2'>
            Estado: {name} <span className={`${styles[name]} ${styles.status}`} />
          </Text>
          <Text size='lg' transform='capitalize'> {people} personas</Text>
          <Text size='lg' transform='capitalize'> {`Hora de entrada: ${start}`} </Text>
          <Text size='lg' transform='capitalize'> {elapsedTime} </Text>
          <Text size='lg' transform='capitalize'> {`Hora de salida: ${end ?? 'Sin Salida'}`} </Text>
        </Flex>
        <Container my={3}>
          <Title align='center' order={3} size='xl' weight='bold' transform='uppercase'>Ordenes</Title>
          <Table id='orders' mx='auto' rounded='md'>
            {
              orders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <img className='rounded-3xl' src={order.plate.image} alt={order.plate.name} width={70} height={70} />
                  </td>
                  <td>
                    <Title order={4} size='lg' weight='bold' transform='capitalize'>
                      {order.plate.name}
                    </Title>
                    <Text size='lg' transform='capitalize'>
                      {order.plate.price} MXN
                    </Text>
                    <Text size='lg' transform='capitalize'>
                      {order.quantity} {order.quantity > 1 ? 'porciones' : 'porción'}
                    </Text>
                  </td>
                  <td><Button /></td>
                </tr>
              ))
            }
          </Table>
        </Container>
        <Flex direction='col' align='center' gapY={2}>
          <Text size='2xl' color='black' font='primary' transform='uppercase'>
            Subtotal <output id='subtotal'>$0</output> MXN
          </Text>
          <Button variant='outline' rounded='full' px={10} py={4} size='lg'> PEDIR CUENTA </Button>
        </Flex>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const { id } = context.query
    if (!id) return redirect404
    const { isStaff, tableId, cookie } = authorize(context, '/tables')

    if (!isStaff && tableId !== parseInt(id as string)) return redirect404

    const activity = await getActivity(parseInt(id as string), cookie)
    const start = castDate(activity.start.toString())

    return {
      props: {
        activity: {
          ...activity,
          start: parseDate(start),
          elapsed: getElapsedTime(start) ?? { hours: 0, minutes: 0, seconds: 0 }
        }
      }
    }
  } catch (error) {
    return redirectLogin
  }
}
