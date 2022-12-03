import { ReactNode } from "react";

interface Props {
    children: ReactNode
    p?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    px?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    py?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

    m?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
    mx?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
    my?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'

    gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    style?: React.CSSProperties
    onClick?: () => void
}

export const Grid = ({ children, style, onClick, ...props }: Props) => {
    const { p, px, py, m, mx, my, gap } = props
    const classes = [
        'grid',
        p && `p-${p}`,
        px && `px-${px}`,
        py && `py-${py}`,
        m && `m-${m}`,
        mx && `mx-${mx}`,
        my && `my-${my}`,
        gap && `gap-${gap}`,
    ].filter(Boolean).join(' ')

    return (
        <div className={classes} onClick={onClick} style={style}>
            {children}
        </div>
    )
}