import Link from "next/link"
import Router from "next/router"
import { useContext } from "react"

import styles from 'styles/components/header.module.css'
import { Flex, Grid, Text, Title } from "components/shared"
import { AuthContext } from "utils"
interface Props {
    showUser: boolean
    showBack: boolean
}

export const Header = ({ showBack, showUser }: Props) => {
    // Hooks
    const { user: { username, role: { name } }, authenticated, logout } = useContext(AuthContext)

    // Handlers
    const returnHandler = () => Router.back()

    // Render Section
    return (
        <Flex direction="col" as='header' textAlign="center" bg="brown" p={2} className={styles.header}>
            {
                // In case we dont want back arrow or we are not admin, we display back arrow
                showBack &&
                <Grid placeItems="center" bg='brown' onClick={returnHandler} className={styles.back} >
                    <Text color="white" font="primary" size="md"> &#5176; </Text>
                </Grid>
            }
            <Title align="center" color="white" size="2xl" weight="bold" className={styles.title}>
                <Link href='/'>
                    EatOnTime
                </Link>
            </Title>
            {
                // If we have an active session we can logout by clicking in out name
                // also is conditional render, if we dont want it
                showUser && authenticated &&
                <Text color="white" font="primary" size="lg" className={styles.logout} onClick={logout}>Welcome {username} ({name}) </Text>
            }
        </Flex >
    )
}