import { createCategory, createPlate, getCategories, updatePlate } from "services"

// Inputs for modal configs
const categoryInputs = [
    {
        "id": "category__name",
        "label": "Título de la categoria",
        "input__type": "text"
    },
    {
        "id": "category__description",
        "label": "Descripción de la categoria",
        "input__type": "textarea",
        "style": {
            "height": "4em",
            "resize": "none",
            "width": "clamp(100px, 60%, 250px)"
        }
    }
]

const plateInputs = (categories: any) => [
    {
        "id": "plate__id",
        "input__type": "hidden",
    },
    {
        "id": "plate__name",
        "label": "Nombre del platillo",
        "input__type": "text",
    },
    {
        "id": "plate__description",
        "label": "Descripción del platillo",
        "input__type": "textarea",
        "style": {
            "height": "4em",
            "resize": "none",
            "width": "clamp(100px, 60%, 250px)"
        },
    },
    {
        "id": "plate__price",
        "label": "Precio del platillo (en MXN)",
        "input__type": "number",
        "style": {
            "width": "12ch"
        },
    },
    {
        "id": "plate__image",
        "label": "Imagen del platillo",
        "input__type": "text",
        "style": {
            "width": "80%"
        },
    },
    {
        "id": "plate__category__id",
        "label": "Tipo de platillo",
        "input": true,
        "input__type": "select",
        "radios__name": "table-status-actual",
        "options": [
            {
                "name": "Selecciona un tipo",
                "value": "null",
                "hidden": true
            },
            ...categories?.map((ctg: any) => ({
                "name": ctg.category__name,
                "value": ctg.category__id,
            }))
        ]
    },
    {
        "id": "plate__quantity",
        "label": "Cantidad de platillos disponibles",
        "input__type": "number",
        "style": {
            "width": "12ch"
        },
    },
    {
        "id": "plate__isVeg",
        "label": "¿Es un platillo vegano?",
        "input": true,
        "input__type": "radio",
        "radios__name": "plate-veg-opt",
        "radios__buttons": [
            {
                "id": "plate-isVeg-true",
                "label": "Si",
                "value": "1",
            },
            {
                "id": "plate-isVeg-false",
                "label": "No",
                "value": "0"
            }
        ]
    },

]

export const configurationUpdatePlate = async (selectedPlate: any, finallyCallback: any) => ({
    title: 'Actualizar platillo',
    description: null,
    inputs: plateInputs(await getCategories()),
    confirmButtonText: 'Actualizar',
    initialState: selectedPlate,
    onSubmitAction: async (plateInfo: any) => {
        const plateUpdated = await updatePlate(plateInfo)
        console.log(plateUpdated)
        await finallyCallback()
    }
}
)

export const configurationCreatePlate = async (finallyCallback: any) => {
    const inputs = plateInputs(await getCategories())
    inputs.shift()
    return {
        title: 'Registar nuevo platillo',
        description: 'Agregar nuevo platillo al menú',
        inputs,
        confirmButtonText: 'Añadir',
        onSubmitAction: async (plateInfo: any) => {
            const newPlate = createPlate(plateInfo)
            console.log(newPlate)
            await finallyCallback()
        }
    }
}

export const configurationCreateCategory = {
    title: 'Crear nueva categoria',
    inputs: categoryInputs,
    confirmButtonText: 'Crear',
    onSubmitAction: async (categoryInfo: any) => {
        const newCategory = createCategory(categoryInfo)
        console.log(newCategory)
    }
}