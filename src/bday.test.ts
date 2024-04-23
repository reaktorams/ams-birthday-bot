import { sendBirthdayWish } from "./bday";
import { getToday } from "./date";
import { getGiphyData } from "./giphy";
import { getSheetData } from "./sheets";
import { postMessageToSlack } from "./slack";
import { mocked } from "jest-mock";

jest.mock("./sheets");
jest.mock("./giphy");
jest.mock("./slack");
jest.mock("./logger");

beforeEach(() => {
  jest.resetAllMocks();

  mocked(getGiphyData).mockResolvedValue({
    gif: "example.com/gif.gif",
    title: "GIF title",
  });
  mocked(postMessageToSlack).mockResolvedValue();
});

test("sendBirthdayWish without parameter", async () => {
  const today = getToday();
  mocked(getSheetData).mockResolvedValue([
    ["John Doe", "14/01"],
    ["Jane Doe", `${today.day}/${today.month}`],
  ]);

  await sendBirthdayWish();

  expect(postMessageToSlack).toHaveBeenCalledWith(
    "A very happy birthday to Jane Doe :partydancer:",
    "example.com/gif.gif",
    "GIF title"
  );
});

test("sendBirthdayWish with parameter", async () => {
  const tomorrow = getToday();
  tomorrow.day++;

  mocked(getSheetData).mockResolvedValue([
    ["John Doe", "14/01"],
    ["Jane Doe", `${tomorrow.day}/${tomorrow.month}`],
  ]);

  await sendBirthdayWish({ date: tomorrow });

  expect(postMessageToSlack).toHaveBeenCalledWith(
    `A very happy (belated 🙈) birthday to Jane Doe (${tomorrow.day}/${tomorrow.month}) :partydancer:`,
    "example.com/gif.gif",
    "GIF title"
  );
});
