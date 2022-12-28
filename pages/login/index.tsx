import Image from 'next/image'
import { AuthContext, GlobalSettingsContext } from 'utils'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { parse } from 'cookie'
import { useForm } from 'hooks'
import { Layout } from 'components/layout'
import { Button, Text } from 'components/shared'
import { Form, PasswordInput, Input } from 'components/form'
import { NextPageContext } from 'next'

interface Props {
  origin: string
}
const Login = ({ origin }: Props) => {
  const { login, authenticated } = useContext(AuthContext)
  const { updateIsLoading } = useContext(GlobalSettingsContext)
  const { handleSubmit, getInputProps } = useForm({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async (values) => {
      const { username, password } = values
      updateIsLoading(true)
      await login(username as string, password as string)
      updateIsLoading(false)
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {}
      if (!values.username) { errors.username = 'El nombre de usuario es requerido' }

      if (!values.password) { errors.password = 'La contraseña es requerida' }
      return errors
    }
  })
  const router = useRouter()

  useEffect(() => {
    if (authenticated) { router.replace(origin) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated])

  return (
    <Layout title="Login">
      <Form onSubmit={handleSubmit}>
        <Image width={120} height={120} src="/svg/404.svg" alt="" style={{
          width: '120px',
          aspectRatio: '1/1',
          objectFit: 'cover',
          borderRadius: '1em'
        }} />
        <Input
          {...getInputProps('username')}
          label="Nombre de usuario"
          size='2xl'
          inputStyle={{ fontSize: '1rem' }}
          placeholder='Ingrese su usuario'
          font='primary' />

        <PasswordInput
          {...getInputProps('password')}
          label="Contraseña"
          size='2xl'
          inputStyle={{ fontSize: '1rem' }}
          placeholder='Ingrese su contraseña'
          font='primary' />

        <Text color='grey' id='404_login' decoration='underline' className='hidden'>Credenciales Inválidas, prueba de nuevo</Text>
        <Text color='grey' id='display_errors' align='center' decoration='underline' className='hidden'> </Text>

        <Button px={8} variant='outline' type="submit" font='primary'>Ingresar</Button>
      </Form>
    </Layout>
  )
}

export async function getServerSideProps (context: NextPageContext) {
  const origin = parse(context.req?.headers.cookie ?? '').origin ?? '/'
  context.res?.setHeader('set-cookie', 'origin=; path=/; max-age=0')
  return {
    props: {
      origin
    }
  }
}

export default Login
