import Image from 'next/image'
import styles from 'styles/shared/accessibility.module.css'

export const Hearable = () => {
  return (
    <span className={styles.hearable}>
      <Image width={25} height={25} src='/img/sound.png' alt='Hearable' />
    </span>
  )
}
