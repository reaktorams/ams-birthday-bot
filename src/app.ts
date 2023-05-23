import dotevn from "dotenv";
dotevn.config();

import express from "express";
import { Cron } from "croner";
import { getGiphyData, getSheetData, postMessageToSlack } from "./utilities";
const app = express();
const port = 8080;

// Check birthday list everyday at 08:00 and send slack notification if something is found
Cron("* 8 * * *", { timezone: "Europe/Amsterdam" }, async function () {
  console.log("Checking birthdays list");
  const sheetData = await getSheetData();
  if (sheetData.length === 0) {
    console.log("No data found.");
  } else {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    let birthdayCounter = 0;

    console.log("Check if someones has a birthday today");
    for (const row of sheetData) {
      const [day, month] = row[1].split("/");
      if (+day === currentDay && +month === currentMonth) {
        birthdayCounter++;
        const { title, gif } = await getGiphyData();
        await postMessageToSlack(row[0], gif, title);
      }
    }
    console.log(`Found ${birthdayCounter} birthday(s)`);
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
