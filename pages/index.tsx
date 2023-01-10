import { useContext } from 'react'
import { AuthContext, GlobalSettingsContext } from 'utils'
import styles from 'styles/pages/home.module.css'

// Components
import Link from 'next/link'
import { ProtectedContent } from 'components'
import { Title, Flex, Text, Grid } from 'components/shared'
import Image from 'next/image'

export default function Home () {
  const { logout, authenticated, user: { username, role: { name } } } = useContext(AuthContext)
  const { updateIsLoading } = useContext(GlobalSettingsContext)

  const handleLogout = async () => {
    updateIsLoading(true)
    await logout(false)
    updateIsLoading(false)
  }

  return (
    <>
      <Grid placeItems='center' p={4} style={{ height: '95vh', overflowY: 'auto' }}>
        <Flex style={{ paddingBlockEnd: '1.5em' }} id='navigate' justify='center' g={5} align='center' wrap className='text-center'>
          <Title my={2} size='4xl' weight='bold' className='w-full'>Bienvenido a EatOnTime</Title>

          <Link className={styles.link} href='/tables'>
            <Flex direction='col' rounded='sm' align='center' gy={2} p={4} m={2} textAlign='center'>
              <Image width={200} height={200} src='/img/tables.png' alt="eat on time tables dashboard" />
              <Text>Mesas</Text>
            </Flex>
          </Link>

          <Link className={styles.link} href='/menu'>
            <Flex direction='col' rounded='sm' align='center' gy={2} p={4} m={2} textAlign='center'>
              <Image width={200} height={200} src='/img/menu.png' alt="eat on time menu" />
              <Text>Menu</Text>
            </Flex>
          </Link>

          <ProtectedContent adminOnly>
            <Link className={styles.link} href='/employees'>
              <Flex direction='col' rounded='sm' align='center' gy={2} p={4} m={2} textAlign='center'>
                <Image width={200} height={200} src='/img/employees.png' alt="" />
                <Text>Empleados</Text>
              </Flex>
            </Link>
          </ProtectedContent>

          <ProtectedContent staffOnly>
            <Link className={styles.link} href='/orders'>
              <Flex direction='col' rounded='sm' align='center' gy={2} p={4} m={2} textAlign='center'>
                <Image width={200} height={200} src='/img/orders.png' alt="" />
                <Text>Ordenes</Text>
              </Flex>
            </Link>
          </ProtectedContent>

          <ProtectedContent staffOnly>
            <Link className={styles.link} href='/activities'>
              <Flex direction='col' rounded='sm' align='center' gy={2} p={4} m={2} textAlign='center'>
                <Image width={200} height={200} src='/img/activities.png' alt="" />
                <Text>Actividades en curso</Text>
              </Flex>
            </Link>
          </ProtectedContent>

          <ProtectedContent adminOnly>
            <Link className={styles.link} href='/records'>
              <Flex direction='col' rounded='sm' align='center' gy={2} p={4} m={2} textAlign='center'>
                <Image width={200} height={200} src='/img/records.png' alt="" />
                <Text>Historial</Text>
              </Flex>
            </Link>
          </ProtectedContent>

          <Link className={styles.link} href='/accessibility'>
            <Flex direction='col' rounded='sm' align='center' gy={2} p={4} m={2} textAlign='center'>
              <Image width={200} height={200} src='/img/accessibility.png' alt="" />
              <Text>Accesibilidad</Text>
            </Flex>
          </Link>
        </Flex>
        {
          authenticated
            ? <Text align='center' size='2xl' font='primary' className={styles.welcome_message} onClick={handleLogout}>{`Welcome ${username} (${name}) `}</Text>
            : <Link className={styles.flotant} href='/login' replace={false} >
              <Image width={50} height={50} className='w-full aspect-square' src='/img/login.png' alt="eat on time login" />
              <Text font='secondary'>Login</Text>
            </Link>
        }
      </Grid>
    </>
  )
}
