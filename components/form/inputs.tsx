import { Flex, Text } from 'components/shared'
import { useState } from 'react'
import styles from 'styles/components/input.module.css'

interface Props {
    label: string
    value?: string | number
    name: string
    id: string
    hookForm?: any
    placeholder?: string
    onChange: (value: string) => void
    dir?: "row" | "col" | "row-reverse" | "col-reverse"
    type?: "text" | "password" | "email" | "number" | "tel" | "url"
    step?: number
    min?: number
    max?: number
    font?: "primary" | "secondary"
    size?: "sm" | "md" | "lg" | "xl" | "2xl"
}

export const Input = ({
    label,
    id,
    name,
    value,
    onChange,
    placeholder,
    dir = 'col',
    type = 'text',
    font = 'secondary',
    size = 'lg',
    hookForm,
    ...props
}: Props) => {
    const { step, min, max } = props
    return (
        <Flex direction={dir} gap={1} justify='center' align='center'>
            <label htmlFor={id}>
                <Text font={font} size={size}>{label}</Text>
            </label>
            <input
                {...hookForm}
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={styles.input}
                placeholder={placeholder}
                step={step}
                min={min}
                max={max}
            />

        </Flex>
    )
}

export const PasswordInput = ({ hookForm, value, label, id, name, onChange, dir = 'col', font = 'secondary', size = 'lg', placeholder }: Props) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <Flex direction={dir} gap={1} justify='center' align='center'>
            <label htmlFor={id}>
                <Text font={font} size={size}>{label}</Text>
            </label>
            <Flex className={styles.password} direction='row' justify='center' align='center'>
                <input
                    {...hookForm}
                    id={id}
                    name={name}
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    className={styles.input}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                <span
                    className={styles.toggle}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? '🔐' : '🔓'}
                </span>
            </Flex>
        </Flex>
    )
}