import Link from "next/link"
import Router from "next/router"
import { useContext } from "react"
import { EotContext } from "utils"

interface Props {
    showUser?: boolean
    showBack?: boolean
}

export const Header = ({ showBack = true, showUser = true }: Props) => {
    // Hooks
    const { user: { auth, role, username }, logout } = useContext(EotContext)

    // Handlers
    const returnHandler = () => Router.back()

    // Render Section
    return (
        <nav className="navbar__header">
            {
                // In case we dont want back arrow or we are not admin, we display back arrow
                showBack &&
                <span className='navbar__back' onClick={returnHandler}> &#5176; </span>
            }
            <Link href='/'>
                <h1 className='navbar-header'>EatOnTime</h1>
            </Link>
            {
                // If we have an active session we can logout by clicking in out name
                // also is conditional render, if we dont want it
                showUser && auth &&
                <span className="navbar__logout" onClick={logout}>Welcome {username} ({role}) </span>
            }
        </nav>
    )
}