interface InputProps extends SizeProps, FontProps, BgProps, ColorProps {
    label: string
    value?: string | number
    name: string
    id: string
    readonly?: boolean
    placeholder?: string
    onChange: (e: OnChangeFormEvent) => void
    dir?: "row" | "col" | "row-reverse" | "col-reverse"
    type?: "text" | "password" | "email" | "number" | "tel" | "url"
    step?: number
    min?: number
    max?: number
    label_style?: CSSProperties
    input_style?: CSSProperties
}

interface SelectProps extends InputProps {
    options: { value: string | number, label: string }[]
}