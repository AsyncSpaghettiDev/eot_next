import { ProtectedContent } from "components"
import { Layout } from "components/layout"
import { MenuPlates } from "components/menu_plates"
import { Button, Flex, Title } from "components/shared"
import { useContext, useEffect, useRef } from "react"
import { getPlates } from "services"
import { AuthContext, GlobalSettingsContext } from "utils"
import { configurationCreateCategory, configurationCreatePlate, configurationUpdatePlate } from "./inputs"


interface ServerPlates {
    category: string
    plates: Plate[]
}

interface Props {
    menu: ServerPlates[]
}

const Menu = ({ menu }: Props) => {
    // Hooks
    const { user: { role: { name } } } = useContext(AuthContext)
    //  const { showForm, FormModalComponent } = useFormModal()
    const platesRef = useRef<any>()

    useEffect(() => {
        platesRef.current.refreshPlates()
    }, [])

    // Handlers
    //  const createPlateHandler = async () => showForm(await configurationCreatePlate(platesRef.current.refreshPlates))

    //  const createCategoryHandler = () => showForm(configurationCreateCategory)

    const onUpdateHandler = async (plate: Plate) => {
        if (name !== 'ADMIN')
            return

        //  showForm(await configurationUpdatePlate(plate, platesRef.current.refreshPlates))
    }
    return (
        <Layout title="Menú" showBack showUser>
            <Title my={2} align="center" weight="bold" size="3xl">EatOnTime Menú</Title>
            <ProtectedContent requiredRole='admin'>
                <Flex wrap justify="center" textAlign="center" gap={4} px={4}>
                    <Button style="outline">Crear Platillo</Button>
                    <Button style="outline">Crear Categoria</Button>
                </Flex>
            </ProtectedContent>

            <MenuPlates ref={platesRef} menu={menu} onSelectPlate={onUpdateHandler} />
        </Layout>
    )
}

export async function getServerSideProps() {
    const menu = await getPlates()
    return {
        props: {
            menu,
        },
    }
}

export default Menu