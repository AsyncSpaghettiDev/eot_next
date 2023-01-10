import classNames from 'styles/shared/button.module.scss'
import typography from 'styles/shared/typography.module.css'
import { marginClassnames, paddingClassnames } from '../classnames'

export const Button = ({ children, className, variant, disabled, onClick, type = 'button', ...props }: ButtonProps) => {
  const { p = 2, px = 4, py = 2, pt, pb, pl, pr, m, mx, my, mt, mb, mr, ml } = props
  const { font, size, rounded, style } = props
  const classes = [
    classNames.button,
    classNames[variant || 'filled'],
    typography[`ff-${font || 'primary'}`],
    paddingClassnames({ p, px, py, pt, pb, pl, pr }),
    marginClassnames({ m, mx, my, mt, mb, ml, mr }),
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
