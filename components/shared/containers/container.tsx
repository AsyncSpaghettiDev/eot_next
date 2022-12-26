import styles from "styles/shared/container.module.css"
import { createElement } from "react"

export const Container = ({ children, id, className, style, as, bg = 'white', onClick, ...props }: ContainerProps) => {
    const { p, px, py, m, mx, my, rounded, textAlign } = props
    const classes = [
        styles[bg],
        p && `p-${p}`,
        px && `px-${px}`,
        py && `py-${py}`,
        m && `m-${m}`,
        mx && `mx-${mx}`,
        my && `my-${my}`,
        rounded && `rounded-${rounded}`,
        textAlign && `text-${textAlign}`,
        className
    ].filter(Boolean).join(' ')

    return createElement(as || 'div', { className: classes, style, id, onClick }, children)
}