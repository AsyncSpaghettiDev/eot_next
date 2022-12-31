import styles from 'styles/shared/container.module.css'

export const Table = ({ id, children, style, rounded, headers, ...props }: TableProps) => {
  const { m, mx, my } = props
  const classes = [
    styles.table,
    m && `m-${m}`,
    mx && `mx-${mx}`,
    my && `my-${my}`,
    rounded && `rounded-${rounded}`
  ].filter(Boolean).join(' ')

  return (
    <table id={id} className={classes} style={style}>
      {
        headers && (
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
        )
      }
      <tbody>
        {children}
      </tbody>
    </table>
  )
}
