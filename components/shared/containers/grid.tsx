import styles from "styles/shared/container.module.css"
import { createElement } from "react"

export const Grid = ({ children, id, style, onClick, as, ...props }: GridProps) => {
    const {
        p,
        px,
        py,
        m,
        mx,
        my,
        gap,
        gapX,
        gapY,
        placeContent,
        placeItems,
        className,
        justify,
        align,
        bg = 'white',
        textAlign, } = props
    const classes = [
        'grid',
        styles[bg],
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
        placeContent && `place-content-${placeContent}`,
        placeItems && `place-items-${placeItems}`,
        textAlign && `text-${textAlign}`,
        className,
    ].filter(Boolean).join(' ')

    return createElement(as || 'div', { className: classes, id, style, onClick }, children)
}