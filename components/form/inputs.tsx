import { Flex, Text } from 'components/shared'
import { useState } from 'react'
import styles from 'styles/components/input.module.css'
import { OnChangeFormEvent } from 'types'

interface Props {
    label: string
    value?: string | number
    name: string
    id: string
    placeholder?: string
    bg?: "brown" | "lightbrown" | "white"
    color?: "black" | "white"
    onChange: (e: OnChangeFormEvent) => void
    dir?: "row" | "col" | "row-reverse" | "col-reverse"
    type?: "text" | "password" | "email" | "number" | "tel" | "url"
    step?: number
    min?: number
    max?: number
    font?: "primary" | "secondary"
    size?: "sm" | "md" | "lg" | "xl" | "2xl"
    label_style?: React.CSSProperties
    input_style?: React.CSSProperties
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
    bg = "white",
    color = "black",
    label_style,
    input_style,
    ...props
}: Props) => {
    const { step, min, max } = props
    const input_classnames = `${styles.input} text-${size}`
    return (
        <Flex bg={bg} direction={dir} gap={1} justify='center' align='center'>
            <label style={label_style} htmlFor={id}>
                <Text color={color} font={font} size={size}>{label}</Text>
            </label>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={input_classnames}
                placeholder={placeholder}
                step={step}
                min={min}
                max={max}
                style={input_style}
            />

        </Flex>
    )
}

export const PasswordInput = ({
    color = 'black',
    value,
    label,
    id,
    name,
    onChange,
    bg = "white",
    dir = 'col',
    font = 'secondary',
    size = 'lg',
    placeholder,
    label_style,
    input_style,
}: Props) => {
    const [showPassword, setShowPassword] = useState(false)
    const input_classnames = `${styles.input} text-${size}`

    return (
        <Flex bg={bg} direction={dir} gap={1} justify='center' align='center'>
            <label style={label_style} htmlFor={id}>
                <Text color={color} font={font} size={size}>{label}</Text>
            </label>
            <Flex bg={bg} className={styles.password} direction='row' justify='center' align='center'>
                <input
                    id={id}
                    name={name}
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    className={input_classnames}
                    placeholder={placeholder}
                    onChange={onChange}
                    style={input_style}
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

export const TextArea = ({
    label,
    id,
    name,
    value,
    onChange,
    placeholder,
    dir = 'col',
    font = 'secondary',
    size = 'lg',
    bg = "white",
    color = "black",
    label_style,
    input_style,
}: Props) => {
    const input_classnames = `${styles.textarea} text-${size}`
    return (
        <Flex bg={bg} direction={dir} gap={1} justify='center' align='center'>
            <label style={label_style} htmlFor={id}>
                <Text color={color} font={font} size={size}>{label}</Text>
            </label>
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={input_classnames}
                placeholder={placeholder}
                style={input_style}
            />
        </Flex>
    )
}

interface SelectProps extends Props {
    options: { value: string | number, label: string }[]
}

export const Select = ({
    label,
    id,
    name,
    value,
    onChange,
    placeholder,
    dir = 'col',
    font = 'secondary',
    size = 'lg',
    bg = "white",
    color = "black",
    label_style,
    input_style,
    options
}: SelectProps) => {
    const input_classnames = `${styles.select} text-${size} p-2`
    return (
        <Flex bg={bg} direction={dir} gap={1} justify='center' align='center'>
            <label style={label_style} htmlFor={id}>
                <Text color={color} font={font} size={size}>{label}</Text>
            </label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={input_classnames}
                placeholder={placeholder}
                style={input_style}
            >
                <option hidden value="null">Selecciona un tipo</option>
                {options.map((option, i) => (
                    <option key={i} value={option.value}>{option.label}</option>
                ))}
            </select>
        </Flex>
    )
}

export const Radio = ({
    label,
    id,
    name,
    value,
    onChange,
    placeholder,
    dir = 'col',
    font = 'secondary',
    size = 'lg',
    bg = "white",
    color = "black",
    label_style,
    input_style,
    options
}: SelectProps) => {
    const input_classnames = `${styles.radio} text-${size} p-2`
    return (
        <Flex bg={bg} direction={dir} gap={1} justify='center' align='center'>
            <label style={label_style} htmlFor={id}>
                <Text color={color} font={font} size={size}>{label}</Text>
            </label>
            <Flex bg={bg} gap={2}>
                {options.map((option, i) => (
                    <Flex align='center' bg={bg} key={i} gap={1}>
                        <input
                            type="radio"
                            id={`option-${i}`}
                            name={name}
                            checked={value === option.value}
                            value={option.value}
                            onChange={onChange}
                            className={input_classnames}
                            placeholder={placeholder}
                            style={input_style}
                        />
                        <label style={{ color: `var(--clr-${color})` }} htmlFor={`option-${i}`}>{option.label}</label>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    )
}