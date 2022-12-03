import { ReactNode } from "react"
import classNames from "styles/typography.module.css"

interface Props {
    children: ReactNode
    className?: string
    font?: 'primary' | 'secondary'
    order?: 1 | 2 | 3 | 4 | 5 | 6
    weight?: 'light' | 'normal' | 'semibold' | 'bold'

    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'base'
    p?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    px?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    py?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    m?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
    mx?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
    my?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'

    decoration?: 'underline' | 'overline' | 'line-through'
    transform?: 'uppercase' | 'lowercase' | 'capitalize'


    align?: 'left' | 'center' | 'right' | 'justify'
    style?: React.CSSProperties
    onClick?: () => void
}

export const Title = ({ children, className, font = 'primary', ...props }: Props) => {
    const { order = 1, weight, size, align, style, p, px, py, m, mx, my, decoration, transform, onClick } = props
    const classes = [
        font && classNames[`ff-${font}`],
        weight && `font-${weight}`,
        size && `text-${size}`,
        align && `text-${align}`,
        p && `p-${p}`,
        px && `px-${px}`,
        py && `py-${py}`,
        m && `m-${m}`,
        mx && `mx-${mx}`,
        my && `my-${my}`,
        decoration,
        transform,
        className
    ].filter(Boolean).join(' ')

    // render h1, h2, ... h6 depending on order
    const Tag = `h${order}` as keyof JSX.IntrinsicElements

    return (
        <Tag className={classes} style={style} onClick={onClick}>
            {children}
        </Tag>
    )
} 