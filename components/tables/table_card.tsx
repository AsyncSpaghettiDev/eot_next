import { Button, Card, Text, Title } from "components/shared"
import Image from "next/image"
import styles from 'styles/components/tables.module.scss'
import Link from "next/link"

interface Props {
    table: Table
    onClick: (current: Table) => void
}

export const TableCard = ({ table: { id, name, capacity, activities, }, table, onClick }: Props) => {
    const isAvailable = activities.length === 0
    const color = isAvailable ? 'black' : 'white'
    const bg = isAvailable ? 'white' : 'lightbrown'
    const classNames = [
        styles.table_card,
        isAvailable && styles.available
    ].filter(Boolean).join(' ')
    const handleClick = () => onClick(table)

    return (
        <Card hoverable={isAvailable} bg={bg} align='center' justify="center" onClick={handleClick} className={classNames}>
            <Image src="/svg/table.svg" width={125} height={125} alt='tables dashboard' />
            <Title color={color} size="2xl" weight="bold" align="center">{name}</Title>
            <Text size='lg' color={color}>Capacidad: {capacity}</Text>
            <Text size='lg' transform="capitalize" color={color}>{isAvailable ? 'Disponible' : activities[0].status.name}</Text>
            {
                !isAvailable &&
                <Link href={`/tables/${id}`}>
                    <Button size='md' variant='white'>Ver mesa</Button>
                </Link>
            }
        </Card>
    )
}