import { ReactNode } from "react"

interface Props {
    children: ReactNode
    wrap?: boolean
    direction?: "row" | "column"
    justify?: "start" | "end" | "center" | "between" | "around"
    align?: "start" | "end" | "center" | "stretch" | "baseline"

    p?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    px?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    py?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

    m?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
    mx?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
    my?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'

    gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

    className?: string
    style?: React.CSSProperties
    onClick?: () => void
}

export const Flex = ({ children, className, style, onClick, ...props }: Props) => {
    const { wrap, direction = 'row', justify, align, p, px, py, m, mx, my, gap } = props
    const classes = [
        'flex',
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
        className
    ].filter(Boolean).join(' ')

    return (
        <div className={classes} style={style} onClick={onClick}>
            {children}
        </div>
    )
}