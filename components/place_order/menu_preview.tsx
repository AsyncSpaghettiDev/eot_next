import { MenuPlates } from "components/menu_plates"
import { Step } from "pages/order"
import { Dispatch, SetStateAction } from "react"

interface Props {
    menu: ServerPlates[]
    plateSelected: (plate: Plate) => void
    triggerStep: Dispatch<SetStateAction<Step>>
}
export const MenuPreview = ({ menu, plateSelected, triggerStep }: Props) => {
    const triggerPlateSelected = (selectedPlate: Plate) => {
        plateSelected(selectedPlate)
        triggerStep({ one: -1, two: 1, three: 0 })
        window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }
    return <MenuPlates showPrices menu={menu} onSelectPlate={triggerPlateSelected} />

}