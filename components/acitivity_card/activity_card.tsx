import { Button, Card, Text, Title } from 'components/shared'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from 'styles/components/activity.module.scss'
import { ActivityModal } from './activity_modal'

interface Props {
  activity: Activity
}

export const ActivityCard = ({ activity, activity: { table: { id, name, capacity }, status: { name: statusName } } }: Props) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleClick = () => setShowDetails(!showDetails)
  return (
    <>
      <Card bg='lightbrown' hoverable={false} align='center' justify="center" onClick={handleClick} className={styles.card}>
        <Image src="/svg/table.svg" width={125} height={125} alt='tables dashboard' />
        <Title color='white' size="2xl" weight="bold" align="center">{name}</Title>
        <Text size='lg' color='white'>Capacidad: {capacity}</Text>
        <Text size='lg' transform="capitalize" color='white'>{statusName}</Text>

        <Link href={`/tables/${id}`}>
          <Button size='md' variant='white'>Ir a la mesa</Button>
        </Link>

      </Card>
      {
        showDetails &&
        <ActivityModal {...activity} onDismiss={() => setShowDetails(false)} />
      }
    </>
  )
}
