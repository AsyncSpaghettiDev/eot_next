/* eslint-disable no-unused-vars */
interface InputProps extends SizeProps, FontProps, BgProps, ColorProps {
  label: string
  value?: string | number
  name: string
  id: string
  readonly?: boolean
  placeholder?: string
  onChange: (e: OnChangeFormEvent) => void
  dir?: 'row' | 'col' | 'row-reverse' | 'col-reverse'
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
  step?: number
  min?: number
  max?: number
  labelStyle?: CSSProperties
  inputStyle?: CSSProperties
}

interface SelectProps extends InputProps {
  options: { value: string | number, label: string }[]
}
