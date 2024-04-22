import { getGiphyData } from "./giphy";
import { getSheetData } from "./sheets";

const isSheetsHealthy = async () => {
  try {
    const sheetData = await getSheetData();
    return sheetData.length > 0;
  } catch (_) {
    return false;
  }
};

const isGiphyHealthy = async () => {
  try {
    const giphy = await getGiphyData();
    return giphy.title !== "" && giphy.gif !== "";
  } catch (_) {
    return false;
  }
};

export const getHealthStatus = async () => {
  return {
    sheets: await isSheetsHealthy(),
    giphy: await isGiphyHealthy(),
  };
};
