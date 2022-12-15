import { ReactNode } from "react"
import classNames from "/styles/shared/button.module.css"
import typography from "/styles/shared/typography.module.css"

interface Props {
    children: ReactNode

    p?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    px?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    py?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

    m?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
    mx?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
    my?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'

    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'

    font?: 'primary' | 'secondary'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'base'
    type?: 'button' | 'submit' | 'reset'

    style?: 'filled' | 'outline' | 'white' | 'outline-white'
    css?: React.CSSProperties
    className?: string
    // onclick event for the button, with the event as parameter
    onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = ({ children, className, css, onClick, type, ...props }: Props) => {
    const { m, mx, my, p, px, py, font, size, rounded, style } = props
    const classes = [
        classNames.button,
        classNames[style || 'filled'],
        typography[`ff-${font || 'primary'}`],
        p && `p-${p}`,
        m && `m-${m}`,
        mx && `mx-${mx}`,
        my && `my-${my}`,
        px && `px-${px}` || 'px-4',
        py && `py-${py}` || 'py-2',
        size && `text-${size}`,
        rounded && `rounded-${rounded}` || 'rounded-3xl',
        className
    ].filter(Boolean).join(' ')

    return (
        <button type={type} className={classes} style={css} onClick={onClick}>
            {children}
        </button>
    )
}