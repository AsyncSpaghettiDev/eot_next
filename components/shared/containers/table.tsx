import { ReactNode } from "react"

interface Props {
    children: ReactNode

    m?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
    mx?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
    my?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
    style?: React.CSSProperties
}

export const Table = ({ children, style, ...props }: Props) => {
    const { m, mx, my } = props
    const classes = [
        'table',
        m && `m-${m}`,
        mx && `mx-${mx}`,
        my && `my-${my}`,
    ].filter(Boolean).join(' ')

    return (
        <table className={classes} style={style}>
            {children}
        </table>
    )
}