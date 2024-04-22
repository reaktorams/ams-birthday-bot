import { auth, sheets } from "@googleapis/sheets";
import { logger } from "./logger";
import { config } from "./config";

export const getSheetData = async () => {
  logger.info("Fetch data from google sheets");
  const authorization = new auth.GoogleAuth({
    credentials: config.google.credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const spreadsheets = sheets({
    version: "v4",
    auth: authorization,
  }).spreadsheets;

  const sheetData = await spreadsheets.values.get({
    spreadsheetId: config.google.spreadsheetId,
    range: "AMS!A:B",
  });

  return sheetData.data.values;
};
