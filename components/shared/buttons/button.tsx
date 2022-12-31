import classNames from 'styles/shared/button.module.scss'
import typography from 'styles/shared/typography.module.css'

export const Button = ({ children, className, variant, disabled, onClick, type = 'button', ...props }: ButtonProps) => {
  const { m, mx, my, p, px, py, font, size, rounded, style } = props
  const classes = [
    classNames.button,
    classNames[variant || 'filled'],
    typography[`ff-${font || 'primary'}`],
    p && `p-${p}`,
    m && `m-${m}`,
    mx && `mx-${mx}`,
    my && `my-${my}`,
    (px && `px-${px}`) ?? 'px-4',
    (py && `py-${py}`) ?? 'py-2',
    size && `text-${size}`,
    (rounded && `rounded-${rounded}`) || 'rounded-3xl',
    className
  ].filter(Boolean).join(' ')

  return (
    <button type={type} className={classes} style={style} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
