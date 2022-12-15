import styles from "styles/shared/container.module.css"
import { createElement, MouseEvent, ReactNode } from "react"

interface Props {
    children: ReactNode
    textAlign?: "right" | "left" | "center" | "justify"
    bg?: 'brown' | 'lightbrown' | 'white'
    id?: string

    as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer' | 'nav' | 'figure' | 'figcaption' | 'address' | 'time' | 'mark' | 'blockquote' | 'ol' | 'ul' | 'li' | 'dl' | 'dt' | 'dd' | 'table' | 'caption' | 'thead' | 'tbody' | 'tfoot' | 'tr' | 'th' | 'td' | 'hr' | 'pre' | 'code' | 'em' | 'strong' | 'small' | 's' | 'cite' | 'q' | 'dfn' | 'abbr' | 'ruby' | 'rt' | 'rp' | 'data' | 'time' | 'var' | 'samp' | 'kbd' | 'sub' | 'sup' | 'i' | 'b' | 'u' | 'span' | 'bdi' | 'bdo' | 'br' | 'wbr' | 'ins' | 'del' | 'img' | 'iframe' | 'embed' | 'object' | 'param' | 'video' | 'audio' | 'source' | 'track' | 'canvas' | 'map' | 'area' | 'svg' | 'math' | 'a' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

    p?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    px?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    py?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

    m?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
    mx?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
    my?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'

    rounded?: 0 | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'

    className?: string
    style?: React.CSSProperties
    onClick?: (e: MouseEvent<HTMLElement>) => void
}

export const Card = ({ children, id, className, style, as, bg = 'white', onClick, ...props }: Props) => {
    const { p, px, py, m, mx, my, rounded, textAlign } = props
    const classes = [
        styles.card,
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