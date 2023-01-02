import classNames from 'styles/shared/typography.module.css'

export const Text = ({ children, span, id, className, color = 'black', font = 'secondary', ...props }: TextProps) => {
  const { weight, size, align, style, p, px, py, m, mx, my, decoration, transform, breaks, display, onClick } = props
  const classes = [
    font && classNames[`ff-${font}`],
    color && classNames[`color-${color}`],
    span && 'inline',
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
