import { Cron } from "croner";
import { getGiphyData, getSheetData, postMessageToSlack } from "./utilities";

// Check birthday list everyday at 08:00 and send slack notification if something is found
Cron("0 8 * * *", { timezone: "Europe/Amsterdam" }, async function () {
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

const server = Bun.serve({
  port: 3000,
  fetch() {
    return new Response(`Ams Birthday Bot is running!!`);
  },
});
console.log(`App is running at http://localhost:${server.port}`);
