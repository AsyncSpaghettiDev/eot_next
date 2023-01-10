import styles from 'styles/shared/container.module.css'
import { createElement } from 'react'
import { gapClassnames, marginClassnames, paddingClassnames } from '../classnames'

export const Flex = ({ children, id, className, style, as, bg = 'white', onClick, ...props }: FlexProps) => {
  const { p, px, py, pt, pb, pl, pr, m, mx, my, mt, mb, mr, ml } = props
  const { wrap, direction = 'row', justify, align, g, gx, gy, rounded, textAlign } = props
  const classes = [
    'flex',
    styles[bg],
    wrap && 'flex-wrap',
    direction && `flex-${direction}`,
    justify && `justify-${justify}`,
    align && `items-${align}`,
    paddingClassnames({ p, px, py, pt, pb, pl, pr }),
    marginClassnames({ m, mx, my, mt, mb, ml, mr }),
    gapClassnames({ g, gx, gy }),
    rounded && `rounded-${rounded}`,
    textAlign && `text-${textAlign}`,
    className
  ].filter(Boolean).join(' ')

  return createElement(as || 'div', { className: classes, style, id, onClick }, children)
}
