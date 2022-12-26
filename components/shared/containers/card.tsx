import styles from "styles/shared/container.module.css"
import { createElement } from "react"

export const Card = ({ children, id, className, style, as, bg = 'white', onClick, hoverable = true, ...props }: CardProps) => {
    const { wrap, direction = 'col', justify, align, p = 2, px, py, m, mx, my, gap, gapX, gapY = 1, rounded, textAlign } = props
    const classes = [
        'flex',
        styles.card,
        hoverable && styles.hoverable,
        styles[bg],
        wrap && 'flex-wrap',
        direction && `flex-${direction}`,
        justify && `justify-${justify}`,
        align && `items-${align}`,
        p && `p-${p}`,
        px && `px-${px}`,
        py && `py-${py}`,
        m && `m-${m}`,
        mx && `mx-${mx}`,
        my && `my-${my}`,
        gap && `gap-${gap}`,
        gapX && `gap-x-${gapX}`,
        gapY && `gap-y-${gapY}`,
        rounded && `rounded-${rounded}`,
        textAlign && `text-${textAlign}`,
        className
    ].filter(Boolean).join(' ')

    return createElement(as || 'div', { className: classes, style, id, onClick }, children)
}