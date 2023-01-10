import styles from 'styles/shared/container.module.css'
import { marginClassnames } from '../classnames'

export const Table = ({ id, children, style, rounded, headers, ...props }: TableProps) => {
  const { m, mx, my, mt, mb, ml, mr } = props
  const classes = [
    styles.table,
    marginClassnames({ m, mx, my, mt, mb, ml, mr }),
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
