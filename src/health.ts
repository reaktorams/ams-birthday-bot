import { getGiphyData } from "./giphy"
import { logger } from "./logger"
import { getSheetData } from "./sheets"

const isSheetsHealthy = async () => {
  try {
    const sheetData = await getSheetData()
    return sheetData.length > 0
  } catch (e) {
    logger.error("Sheets health check failed", e.stack || e.message || e)
    return false
  }
}

const isGiphyHealthy = async () => {
  try {
    const giphy = await getGiphyData()
    return giphy.title !== "" && giphy.gif !== ""
  } catch (e) {
    logger.error("Giphy health check failed", e.stack || e.message || e)
    return false
  }
}

export const getHealthStatus = async () => {
  return {
    sheets: await isSheetsHealthy(),
    giphy: await isGiphyHealthy(),
  }
}
