import classNames from 'styles/shared/typography.module.css'
import { marginClassnames, paddingClassnames } from '../classnames'

export const Text = ({ children, span, id, className, color = 'black', font = 'secondary', ...props }: TextProps) => {
  const { p, px, py, pt, pb, pl, pr, m, mx, my, mt, mb, mr, ml } = props
  const { weight, size, align, style, decoration, transform, breaks, display, onClick } = props
  const classes = [
    font && classNames[`ff-${font}`],
    color && classNames[`color-${color}`],
    span && 'inline',
    weight && `font-${weight}`,
    size && `text-${size}`,
    align && `text-${align}`,
    paddingClassnames({ p, px, py, pt, pb, pl, pr }),
    marginClassnames({ m, mx, my, mt, mb, ml, mr }),
    breaks && `break-${breaks}`,
    display,
    decoration,
    transform,
    className
  ].filter(Boolean).join(' ')

  return (
    <p className={classes} id={id} style={style} onClick={onClick}>
      {children}
    </p>
  )
}
