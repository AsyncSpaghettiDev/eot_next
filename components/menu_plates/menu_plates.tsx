import { Flex, Text, Title } from "components/shared"
import { Hearable, Card } from "components/shared"
import { useState, Fragment, forwardRef, useImperativeHandle } from "react"
import { getMenu } from "services"

interface PlatesProps {
    menu: ServerPlates[]
    onSelectPlate: (plate: any) => void
    showPrices?: boolean
}

interface ServerPlates {
    category: string
    plates: Plate[]
}

export const MenuPlates = forwardRef(({ menu, onSelectPlate, showPrices = false }: PlatesProps, ref) => {
    // Hooks
    const [menuPlates, setMenuPlates] = useState<ServerPlates[]>(menu)

    // Return fresh menu plates
    useImperativeHandle(ref, () => ({
        refreshPlates: () => fetchMenuPlates()
    }))

    // Functions
    const fetchMenuPlates = () => getMenu().then(setMenuPlates)

    const returnPlate = (id: number) => {
        let plateFinded
        menuPlates.forEach(cats =>
            cats.plates.find(plate => {
                if (plate.id === id) {
                    plateFinded = plate
                    return true
                }
            })
        )
        onSelectPlate(plateFinded)
    }

    // Render Section
    return (
        <Flex direction="col" my={2} gap={2}>
            {
                menuPlates?.map(plt =>
                    <Fragment key={`${plt.category}_section`}>
                        <Title order={2} transform="capitalize" weight="bold" size="2xl" align="center">{plt.category}</Title>
                        <Flex p={4} gap={4} wrap justify="center">
                            {
                                plt.plates.map(plate =>
                                    <MenuPlate
                                        key={plate.id}
                                        {...plate}
                                        showPrice={showPrices}
                                        onClick={returnPlate}
                                    />
                                )
                            }
                        </Flex>
                    </Fragment>
                )
            }
        </Flex>
    )
})

import styles from 'styles/components/plate.module.css'
import { Plate } from "types"

interface PlateProps extends Plate {
    showPrice: boolean
    onClick: (id: number) => void
}

// Menu plate view for menu page
export const MenuPlate = ({ id, image, name, description, price, showPrice, onClick }: PlateProps) => {
    // Handlers
    const onClickHandler = async () => {
        onClick(id)
    }

    // Render section
    return (
        <Card textAlign="center" p={2} className={styles.plate} onClick={onClickHandler}>
            <img className={styles.image} src={image} alt={name + ' ' + description} />
            <Title order={3} transform="capitalize" weight="bold" size="lg">{name}</Title>
            <Text className={styles.description}> {description} </Text>
            {
                showPrice && <p className="plate-price"> {`Ordenar $${price} MXN`} </p>
            }
            <Hearable />
        </Card>
    )
}