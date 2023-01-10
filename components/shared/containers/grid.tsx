import styles from 'styles/shared/container.module.scss'
import { createElement } from 'react'
import { gapClassnames, marginClassnames, paddingClassnames } from '../classnames'

export const Grid = ({ children, id, style, onClick, as, ...props }: GridProps) => {
  const { p, px, py, pt, pb, pl, pr, m, mx, my, mt, mb, mr, ml } = props
  const {
    g,
    gx,
    gy,
    placeContent,
    placeItems,
    className,
    justify,
    align,
    bg = 'white',
    textAlign
  } = props
  const classes = [
    'grid',
    styles[bg],
    justify && `justify-${justify}`,
    align && `items-${align}`,
    paddingClassnames({ p, px, py, pt, pb, pl, pr }),
    marginClassnames({ m, mx, my, mt, mb, ml, mr }),
    gapClassnames({ g, gx, gy }),
    placeContent && `place-content-${placeContent}`,
    placeItems && `place-items-${placeItems}`,
    textAlign && `text-${textAlign}`,
    className
  ].filter(Boolean).join(' ')

  return createElement(as || 'div', { className: classes, id, style, onClick }, children)
}
