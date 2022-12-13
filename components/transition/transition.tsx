import styles from 'styles/components/transition.module.css'

export const Transition = () => {
    return (
        <div className={styles.transition} id='transition'>
            <img className={styles.logo} src='/img/logo.png' alt="EatOnTime logo" />
            <div className={styles.footer}>
                <div className={styles.ball_1} />
                <div className={styles.ball_2} />
            </div>
        </div>
    )
}

export default Transition