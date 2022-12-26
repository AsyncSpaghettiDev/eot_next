import classNames from "styles/shared/typography.module.css"

export const Title = ({ children, id, className, color = 'black', font = 'primary', display, ...props }: TitleProps) => {
    const { order = 1, weight, size, align, style, p, px, py, m, mx, my, decoration, transform, onClick } = props
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
        display,
        decoration,
        transform,
        className,

    ].filter(Boolean).join(' ')

    // render h1, h2, ... h6 depending on order
    const Tag = `h${order}` as keyof JSX.IntrinsicElements

    return (
        <Tag className={classes} id={id} style={style} onClick={onClick}>
            {children}
        </Tag>
    )
} 