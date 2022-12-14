/* eslint-disable no-unused-vars */
interface ButtonProps extends PaddingProps, MarginProps, RoundedProps, SizeProps, BaseSharedProps, FontProps, StyleProps {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean

  variant?: 'filled' | 'outline' | 'white' | 'white-filled'
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void
}
