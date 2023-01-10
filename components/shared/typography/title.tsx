import classNames from 'styles/shared/typography.module.css'
import { marginClassnames, paddingClassnames } from '../classnames'

export const Title = ({ children, id, className, color = 'black', font = 'primary', display, ...props }: TitleProps) => {
  const { p, px, py, pt, pb, pl, pr, m, mx, my, mt, mb, mr, ml } = props
  const { order = 1, weight, size, align, style, decoration, transform, onClick } = props
  const classes = [
    font && classNames[`ff-${font}`],
    color && classNames[`color-${color}`],
    weight && `font-${weight}`,
    size && `text-${size}`,
    align && `text-${align}`,
    paddingClassnames({ p, px, py, pt, pb, pl, pr }),
    marginClassnames({ m, mx, my, mt, mb, ml, mr }),
    display,
    decoration,
    transform,
    className

  ].filter(Boolean).join(' ')

  // render h1, h2, ... h6 depending on order
  const Tag = `h${order}` as keyof JSX.IntrinsicElements

  return (
    <Tag className={classes} id={id} style={style} onClick={onClick}>
      {children}
    </Tag>
  )
}
