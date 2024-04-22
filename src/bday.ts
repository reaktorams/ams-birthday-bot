import { getGiphyData } from "./giphy";
import { logger } from "./logger";
import { getSheetData } from "./sheets";
import { postMessageToSlack } from "./slack";

export const sendBirthdayWish = async () => {
  logger.info("Checking birthdays list");

  const sheetData = await getSheetData();
  if (sheetData.length === 0) {
    logger.info("No data found.");
    return;
  }

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  let birthdayCounter = 0;

  logger.info("Check if someones has a birthday today");
  for (const row of sheetData) {
    const [day, month] = row[1].split("/");
    if (+day === currentDay && +month === currentMonth) {
      birthdayCounter++;
      const { title, gif } = await getGiphyData();
      await postMessageToSlack(row[0], gif, title);
    }
  }
  logger.info(`Found ${birthdayCounter} birthday(s)`);
};
