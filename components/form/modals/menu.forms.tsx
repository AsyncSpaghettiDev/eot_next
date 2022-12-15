import { Modal } from "components/modal"
import { Button, Flex } from "components/shared"
import { useForm } from "hooks"
import { useMemo } from "react"
import { createCategory, createPlate, deletePlate, updatePlate } from "services"
import { Category, Plate } from "types"
import { Input, Radio, Select, TextArea } from "../inputs"

interface CreatePlateFormProps {
    onClose: () => void
    onSuccess: (newPlate: Plate) => void
    categories: Category[]
}

export const CreatePlateForm = ({ categories, onSuccess, onClose }: CreatePlateFormProps) => {
    const { getInputProps, handleSubmit } = useForm({
        initialValues: {
            name: '',
            price: 1,
            description: '',
            image: '',
            quantity: 1,
            isVeg: 'false',
            categoryId: 0,
        },
        validate: (values: any) => {
            const errors: { [key: string]: string } = {}
            if (!values.name)
                errors.name = 'El nombre es requerido'
            if (!values.price)
                errors.price = 'El precio es requerido'
            if (!values.description)
                errors.description = 'La descripción es requerida'
            if (!values.image)
                errors.image = 'La imagen es requerida'
            if (!values.quantity)
                errors.quantity = 'La cantidad es requerida'
            if (!values.isVeg)
                errors.isVeg = 'La opción es requerida'
            if (!values.categoryId)
                errors.categoryId = 'La categoría es requerida'
            return errors
        },
        onSubmit: async (plateInfo: any) => {
            const newPlate = await createPlate(plateInfo)
            onSuccess(newPlate)
        },
    })
    const options = useMemo(() => categories.map(category => ({ value: category.id!, label: category.name })), [categories])
    return (
        <Modal title="Crear nuevo platillo" description="Agrega un nuevo platillo a la carta" onDismiss={onClose}>
            <form className="p-2 flex flex-col gap-y-2" onSubmit={handleSubmit}>
                <Input
                    {...getInputProps('name')}
                    bg='brown'
                    size='md'
                    color="white"
                    label='Nombre del platillo' />
                <TextArea
                    {...getInputProps('description')}
                    bg='brown'
                    size='md'
                    color="white"
                    label='Descripcion del platillo' />
                <Input
                    {...getInputProps('price')}
                    bg='brown'
                    size='md'
                    color="white"
                    type="number"
                    min={1}
                    input_style={{ width: '10ch' }}
                    label='Precio del platillo (en MXN)' />
                <Input
                    {...getInputProps('image')}
                    bg='brown'
                    size='md'
                    color="white"
                    label='Imagen del platillo'
                    input_style={{ width: '75%' }} />
                <Input
                    {...getInputProps('quantity')}
                    bg='brown'
                    size='md'
                    color="white"
                    type="number"
                    min={1}
                    input_style={{ width: '10ch' }}
                    label='Platillos disponibles' />
                <Select
                    {...getInputProps('categoryId')}
                    bg='brown'
                    size='md'
                    color="white"
                    type="number"
                    min={1}
                    options={options}
                    label='Selecciona la categoria' />
                <Radio
                    {...getInputProps('isVeg')}
                    bg='brown'
                    size='md'
                    color="white"
                    type="number"
                    min={1}
                    options={[
                        { value: 'true', label: 'Si' },
                        { value: 'false', label: 'No' },
                    ]}
                    label='¿Es vegano?' />
                <div id="display_errors" className="hidden" style={{ color: 'var(--clr-white)' }} />
                <Flex bg='brown' justify="center" align="center" gap={2}>
                    <Button css={{ width: '10ch' }} rounded="md" style='white' onClick={onClose}>Cancelar</Button>
                    <Button css={{ width: '10ch' }} rounded="md" style='white' type="submit">Añadir</Button>
                </Flex>
            </form>
        </Modal>
    )
}

interface EditPlateFormProps {
    plate: Plate
    categories: Category[]
    onClose: () => void
    onSuccess: (plate?: Plate) => void
}

export const EditPlateForm = ({ plate, categories, onSuccess, onClose }: EditPlateFormProps) => {
    const { id, name, price, description, image, quantity, isVeg, categoryId } = plate
    const { getInputProps, handleSubmit } = useForm({
        initialValues: {
            id,
            name,
            price,
            description,
            image,
            quantity,
            isVeg: isVeg.toString(),
            categoryId,
        },
        validate: (values: any) => {
            const errors: { [key: string]: string } = {}
            if (!values.name)
                errors.name = 'El nombre es requerido'
            if (!values.price)
                errors.price = 'El precio es requerido'
            if (!values.description)
                errors.description = 'La descripción es requerida'
            if (!values.image)
                errors.image = 'La imagen es requerida'
            if (!values.quantity)
                errors.quantity = 'La cantidad es requerida'
            if (!values.isVeg)
                errors.isVeg = 'La opción es requerida'
            if (!values.categoryId)
                errors.categoryId = 'La categoría es requerida'
            return errors
        },
        onSubmit: async (plateInfo: any) => {
            const newPlate = await updatePlate(plateInfo)
            onSuccess(newPlate)
        },
    })
    const options = useMemo(() => categories.map(category => ({ value: category.id!, label: category.name })), [categories])
    const onDelete = async () => {
        await deletePlate(id)
        onSuccess()
    }
    return (
        <Modal title="Editar platillo" description="Edita la información del platillo" onDismiss={onClose}>
            <form className="p-2 flex flex-col gap-y-2" onSubmit={handleSubmit}>
                <Input
                    {...getInputProps('name')}
                    bg='brown'
                    size='md'
                    color="white"
                    label='Nombre del platillo' />
                <TextArea
                    {...getInputProps('description')}
                    bg='brown'
                    size='md'
                    color="white"
                    label='Descripcion del platillo' />
                <Input
                    {...getInputProps('price')}
                    bg='brown'
                    size='md'
                    color="white"
                    type="number"
                    min={1}
                    input_style={{ width: '10ch' }}
                    label='Precio del platillo (en MXN)' />
                <Input
                    {...getInputProps('image')}
                    bg='brown'
                    size='md'
                    color="white"
                    label='Imagen del platillo'
                    input_style={{ width: '75%' }} />
                <Input
                    {...getInputProps('quantity')}
                    bg='brown'
                    size='md'
                    color="white"
                    type="number"
                    min={1}
                    input_style={{ width: '10ch' }}
                    label='Platillos disponibles' />
                <Select
                    {...getInputProps('categoryId')}
                    bg='brown'
                    size='md'
                    color="white"
                    type="number"
                    min={1}
                    options={options}
                    label='Selecciona la categoria' />
                <Radio
                    {...getInputProps('isVeg')}
                    bg='brown'
                    size='md'
                    color="white"
                    type="number"
                    min={1}
                    options={[
                        { value: 'true', label: 'Si' },
                        { value: 'false', label: 'No' },
                    ]}
                    label='¿Es vegano?' />
                <div id="display_errors" className="hidden" style={{ color: 'var(--clr-white)' }} />
                <Flex bg='brown' justify="center" align="center" gap={2}>
                    <Button css={{ width: '10ch' }} rounded="md" style='white' onClick={onClose}>Cancelar</Button>
                    <Button css={{ width: '10ch' }} rounded="md" style='white' onClick={onDelete} type="button">Eliminar</Button>
                    <Button css={{ width: '10ch' }} rounded="md" style='white' type="submit">Editar</Button>
                </Flex>
            </form>
        </Modal>
    )
}

interface CreateCategoryFormProps {
    onClose: () => void
    onSuccess: (newCategory: Category) => void
}

export const CreateCategoryForm = ({ onClose, onSuccess }: CreateCategoryFormProps) => {
    const { getInputProps, handleSubmit } = useForm({
        initialValues: {
            name: '',
            description: '',
            sortId: undefined,
        },
        validate: (values: any) => {
            const errors: { [key: string]: string } = {}
            if (!values.name)
                errors.name = 'El nombre es requerido'
            return errors
        },
        onSubmit: async (categoryInfo: any) => {
            const newCategory = await createCategory(categoryInfo)
            onSuccess(newCategory)
        },
    })
    return (
        <Modal title="Crear categoria" description="Crea una nueva categoria" onDismiss={onClose}>
            <form className="p-2 flex flex-col gap-y-2" onSubmit={handleSubmit}>
                <Input
                    {...getInputProps('name')}
                    bg='brown'
                    size='md'
                    color="white"
                    label='Nombre de la categoria' />
                <TextArea
                    {...getInputProps('description')}
                    bg='brown'
                    size='md'
                    color="white"
                    label='Descripción de la categoria' />
                <Input
                    {...getInputProps('sortId')}
                    bg='brown'
                    size='md'
                    color="white"
                    type="number"
                    input_style={{ width: '10ch' }}
                    label='Orden de la categoria' />
                <div id="display_errors" className="hidden" style={{ color: 'var(--clr-white)' }} />
                <Flex bg='brown' justify="center" align="center" gap={2}>
                    <Button css={{ width: '10ch' }} rounded="md" style='white' onClick={onClose}>Cancelar</Button>
                    <Button css={{ width: '10ch' }} rounded="md" style='white' type="submit">Añadir</Button>
                </Flex>
            </form>
        </Modal>
    )
}