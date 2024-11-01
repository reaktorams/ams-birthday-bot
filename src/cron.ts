import { Cron } from "croner"
import { sendBirthdayWish } from "./bday"
import { logger } from "./logger"

const everyDayAt8am = "0 8 * * *"
const timezone = "Europe/Amsterdam"

export const startCronJob = () => {
  Cron(everyDayAt8am, { timezone }, () => sendBirthdayWish())
  logger.info("Cron job registered.")
}
