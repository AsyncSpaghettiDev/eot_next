export const castDate = (rawDate: Date): Date => new Date(rawDate)

export enum DateStyle {
  // eslint-disable-next-line no-unused-vars
  time = 'time'
}

export const parseDate = (date: Date, style: DateStyle = DateStyle.time): string => {
  if (typeof date === 'string') date = new Date(date)
  switch (style) {
    case DateStyle.time:
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`

    default:
      return date.toLocaleString()
  }
}

export const getElapsedTime = (start: Date): ElapsedTime => {
  if (typeof start === 'string') start = new Date(start)
  const now = new Date()
  const elapsed = now.getTime() - start.getTime()
  const seconds = Math.floor((elapsed / 1000) % 60)
  const minutes = Math.floor((elapsed / (1000 * 60)) % 60)

  // Without trim hours to 24
  const hours = Math.floor((elapsed / (1000 * 60 * 60)))
  // Trim hours to 24
  // const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24)

  return { hours, minutes, seconds }
}

export const formatMoney = (amount: number): string => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
