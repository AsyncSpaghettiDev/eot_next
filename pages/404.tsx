import { useEffect } from 'react'

import { Button, Flex, Text, Title } from 'components/shared'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

const NotFound = () => {
    const router = useRouter()
    // Hooks
    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 5000)
    }, [])
    return (
        <>
            <Head>
                <title>EatOnTime - 404</title>
            </Head>
            <Flex as='main' justify='center' align='center' gapY={2} textAlign='center' p={4} direction='col' className='h-screen'>
                <Link href='/'>
                    <Image width={250} height={250} src='/svg/404.svg' alt="Not found page logo" />
                </Link>
                <Title size='3xl' weight='bold'>
                    Oops... Página no encontrada
                </Title>
                <Text weight='light' color='grey' font='primary'>
                    La página que ingresaste no existe, prueba otra vez.
                </Text>
                <Button px={8} size='md' onClick={() => router.push('/')}>
                    Volver
                </Button>
            </Flex>
        </>
    )
}

export default NotFound