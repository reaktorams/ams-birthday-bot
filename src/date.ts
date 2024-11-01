export type DateObject = {
  day: number
  month: number
}

export const toDate = (str: string) => {
  const dateSplit = str.split("/").map((x) => parseInt(x, 10))
  if (dateSplit.length !== 2) {
    throw new Error(`Invalid date format: ${str}`)
  }

  const [day, month] = dateSplit

  if (day < 1 || day > 31) {
    throw new Error(`Invalid day: ${day}`)
  }

  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}`)
  }

  return { day, month }
}

export const getToday = () => {
  const today = new Date()
  const day = today.getDate()
  const month = today.getMonth() + 1
  return {
    day,
    month,
  }
}

export const isToday = (date: DateObject) => {
  const today = getToday()
  return areDatesEqual(date, today)
}

export const areDatesEqual = (date1: DateObject, date2: DateObject) => {
  return date1.day === date2.day && date1.month === date2.month
}
