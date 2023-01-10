import styles from 'styles/shared/container.module.css'
import { createElement } from 'react'
import { marginClassnames, paddingClassnames } from '../classnames'

export const Container = ({ children, id, className, style, as, bg = 'white', onClick, ...props }: ContainerProps) => {
  const { p, px, py, pt, pb, pl, pr, m, mx, my, mt, mb, mr, ml } = props
  const { rounded, textAlign } = props
  const classes = [
    styles[bg],
    paddingClassnames({ p, px, py, pt, pb, pl, pr }),
    marginClassnames({ m, mx, my, mt, mb, ml, mr }),
    rounded && `rounded-${rounded}`,
    textAlign && `text-${textAlign}`,
    className
  ].filter(Boolean).join(' ')

  return createElement(as || 'div', { className: classes, style, id, onClick }, children)
}
