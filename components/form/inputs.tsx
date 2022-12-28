import { Flex, Text } from 'components/shared'
import { useState } from 'react'
import styles from 'styles/components/input.module.scss'

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
  bg = 'white',
  color = 'black',
  labelStyle,
  inputStyle,
  readonly = false,
  ...props
}: InputProps) => {
  const { step, min, max } = props
  const inputClassnames = `${styles.input} text-${size}`
  return (
    <Flex bg={bg} direction={dir} gap={1} justify='center' align='center'>
      <label style={labelStyle} htmlFor={id}>
        <Text color={color} font={font} size={size}>{label}</Text>
      </label>
      <input
        readOnly={readonly}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={inputClassnames}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        style={inputStyle}
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
  bg = 'white',
  dir = 'col',
  font = 'secondary',
  size = 'lg',
  placeholder,
  labelStyle,
  inputStyle
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const inputClassnames = `${styles.input} text-${size}`

  return (
    <Flex bg={bg} direction={dir} gap={1} justify='center' align='center'>
      <label style={labelStyle} htmlFor={id}>
        <Text color={color} font={font} size={size}>{label}</Text>
      </label>
      <Flex bg={bg} className={styles.password} direction='row' justify='center' align='center'>
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          className={inputClassnames}
          placeholder={placeholder}
          onChange={onChange}
          style={inputStyle}
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
  bg = 'white',
  color = 'black',
  labelStyle,
  inputStyle
}: InputProps) => {
  const inputClassnames = `${styles.textarea} text-${size}`
  return (
    <Flex bg={bg} direction={dir} gap={1} justify='center' align='center'>
      <label style={labelStyle} htmlFor={id}>
        <Text color={color} font={font} size={size}>{label}</Text>
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={inputClassnames}
        placeholder={placeholder}
        style={inputStyle}
      />
    </Flex>
  )
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
  bg = 'white',
  color = 'black',
  labelStyle,
  inputStyle,
  options
}: SelectProps) => {
  const inputClassnames = `${styles.select} text-${size} p-2`
  return (
    <Flex bg={bg} direction={dir} gap={1} justify='center' align='center'>
      <label style={labelStyle} htmlFor={id}>
        <Text color={color} font={font} size={size}>{label}</Text>
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={inputClassnames}
        placeholder={placeholder}
        style={inputStyle}
      >
        <option hidden value='null'>Selecciona un tipo</option>
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
  bg = 'white',
  color = 'black',
  labelStyle,
  inputStyle,
  options
}: SelectProps) => {
  const inputClassnames = `${styles.radio} text-${size} p-2`
  return (
    <Flex bg={bg} direction={dir} gap={1} justify='center' align='center'>
      <label style={labelStyle} htmlFor={id}>
        <Text color={color} font={font} size={size}>{label}</Text>
      </label>
      <Flex bg={bg} gap={2}>
        {options.map((option, i) => (
          <Flex align='center' bg={bg} key={i} gap={1}>
            <input
              type='radio'
              id={`option-${i}`}
              name={name}
              checked={value === option.value}
              value={option.value}
              onChange={onChange}
              className={inputClassnames}
              placeholder={placeholder}
              style={inputStyle}
            />
            <label style={{ color: `var(--clr-${color})` }} htmlFor={`option-${i}`}>{option.label}</label>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
