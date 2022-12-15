import Image from 'next/image'
import { AuthContext } from 'utils'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import { useForm } from 'hooks'
import { Layout } from 'components/layout'
import { Button, Text } from 'components/shared'
import { Form, PasswordInput, Input } from 'components/form'

const Login = () => {
    const { login, authenticated } = useContext(AuthContext)
    const { handleSubmit, getInputProps } = useForm({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: (values) => {
            const { username, password } = values
            login(username as string, password as string)

        },
        validate: (values) => {
            const errors: { [key: string]: string } = {}
            if (!values.username)
                errors.username = 'El nombre de usuario es requerido'

            if (!values.password)
                errors.password = 'La contraseña es requerida'
            return errors
        }
    })
    const router = useRouter()

    useEffect(() => {
        if (authenticated) {
            const prevPath = localStorage.getItem('redirect')
            localStorage.removeItem('redirect')
            router.replace(prevPath || "/")
        }
    }, [authenticated])


    return (
        <Layout showBack title="Login">
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
                    input_style={{ fontSize: '1rem' }}
                    placeholder='Ingrese su usuario'
                    font='primary' />

                <PasswordInput
                    {...getInputProps('password')}
                    label="Contraseña"
                    size='2xl'
                    input_style={{ fontSize: '1rem' }}
                    placeholder='Ingrese su contraseña'
                    font='primary' />

                <Text color='grey' id='404_login' decoration='underline' className='hidden'>Credenciales Inválidas, prueba de nuevo</Text>
                <Text color='grey' id='display_errors' align='center' decoration='underline' className='hidden'> </Text>

                <Button px={8} style='outline' type="submit" font='primary'>Ingresar</Button>
            </Form>
        </Layout>
    )
}

export default Login