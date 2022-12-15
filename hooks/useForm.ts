import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import styles from 'styles/components/input.module.css'

interface InitialValues {
    [key: string]: string | number | undefined
}

interface InputProps {
    id: string
    name: string
    value: string | number | undefined
    onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
}

interface Props {
    initialValues?: InitialValues
    onSubmit?: (values: InitialValues) => void
    validate?: (values: InitialValues) => { [key: string]: string }
}

export const useForm = ({ initialValues, onSubmit, validate }: Props) => {
    const [values, setValues] = useState(initialValues || {})
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        errors && showErrors()
    }, [errors])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        // destructuring the event object based on the target type
        if (e.target instanceof HTMLInputElement) {
            const { target: { name, value, valueAsNumber } } = e
            setValues(prev => {
                return {
                    ...prev,
                    [name]: valueAsNumber || value
                }
            })
        }
        else {
            const { target: { name, value } } = e
            setValues(prev => {
                return {
                    ...prev,
                    [name]: value
                }
            })
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validate) {
            const errors = validate(values)
            if (Object.keys(errors).length)
                return setErrors(errors)
        }
        if (onSubmit)
            onSubmit(values)
    }

    const showErrors = () => {
        const elements: HTMLElement[] = []
        const errorsContainer = document.getElementById('display_errors')
        errorsContainer?.classList.remove('hidden')
        Object.keys(errors).forEach(key => {
            const el = document.querySelector(`#${key}`)
            if (el) {
                elements.push(el as HTMLElement)
                el.classList.add(styles.error)
                errorsContainer?.insertAdjacentHTML('beforeend', `<p>${errors[key]}</p>`)
            }
        })

        setTimeout(() => {
            elements.forEach(el => {
                el.classList.remove(styles.error)
            })
            if (errorsContainer) {
                errorsContainer.innerHTML = ''
                errorsContainer.classList.add('hidden')
            }
        }, 2000)
    }


    const getInputProps = (name: string): InputProps => ({
        id: name,
        name,
        value: values[name],
        onChange: handleChange
    })

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        getInputProps,
    }
}