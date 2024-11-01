import { getGiphyData } from "./giphy"
import { logger } from "./logger"
import { getSheetData } from "./sheets"
import { postMessageToSlack } from "./slack"
import { DateObject, areDatesEqual, getToday, isToday, toDate } from "./date"

type Options = {
  date?: DateObject
}

const createMessage = (name: string, date: DateObject) => {
  if (isToday(date)) {
    return `A very happy birthday to ${name} :partydancer:`
  }

  return `A very happy (belated 🙈) birthday to ${name} (${date.day}/${date.month}) :partydancer:`
}

export const sendBirthdayWish = async ({ date = getToday() }: Options = {}) => {
  logger.info("Checking birthdays list")

  const [, ...sheetData] = await getSheetData()
  if (sheetData.length === 0) {
    logger.info("No data found.")
    return
  }

  let birthdayCounter = 0

  logger.info("Check if someones has a birthday today")
  for (const row of sheetData) {
    const sheetDate = toDate(row[1])
    if (areDatesEqual(sheetDate, date)) {
      birthdayCounter++
      const { title, gif } = await getGiphyData()
      const message = createMessage(row[0], date)
      await postMessageToSlack(message, gif, title)
    }
  }
  logger.info(`Found ${birthdayCounter} birthday(s)`)
}
