import { CSSProperties, MouseEvent, ReactNode } from "react"
import classNames from "styles/shared/typography.module.css"

interface Props {
    children: ReactNode
    className?: string
    id?: string
    font?: 'primary' | 'secondary'
    weight?: 'light' | 'normal' | 'semibold' | 'bold'
    color?: 'white' | 'black' | 'grey'

    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'base'
    p?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    px?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    py?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    m?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
    mx?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
    my?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'

    decoration?: 'underline' | 'overline' | 'line-through'
    transform?: 'uppercase' | 'lowercase' | 'capitalize'
    breaks?: 'normal' | 'words' | 'all'

    display?: 'block' | 'inline' | 'inline-block'
    align?: 'left' | 'center' | 'right' | 'justify'
    style?: CSSProperties

    onClick?: (e: MouseEvent<HTMLElement>) => void
}

export const Text = ({ children, id, className, color = 'black', font = 'secondary', ...props }: Props) => {
    const { weight, size, align, style, p, px, py, m, mx, my, decoration, transform, breaks, display, onClick } = props
    const classes = [
        font && classNames[`ff-${font}`],
        color && classNames[`color-${color}`],
        weight && `font-${weight}`,
        size && `text-${size}`,
        align && `text-${align}`,
        p && `p-${p}`,
        px && `px-${px}`,
        py && `py-${py}`,
        m && `m-${m}`,
        mx && `mx-${mx}`,
        my && `my-${my}`,
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