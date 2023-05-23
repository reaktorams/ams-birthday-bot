import { auth, sheets } from "@googleapis/sheets";
import axios from "axios";

export async function getSheetData() {
  console.log("Fetch data from google sheets");
  const authorization = new auth.GoogleAuth({
    credentials: JSON.parse(
      Buffer.from(process.env.GOOGLE_CLIENT_OPTIONS, "base64").toString(
        "binary"
      )
    ),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const spreadsheets = sheets({
    version: "v4",
    auth: authorization,
  }).spreadsheets;

  const sheetData = await spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: "AMS!A:B",
  });

  return sheetData.data.values;
}

export async function getGiphyData() {
  console.log("Fetch GIF to display in message");
  const giphyOptions = {
    api_key: process.env.GIPHY_API_KEY,
    tag: "Happy Birthday",
    rating: "g",
  };

  const {
    data: { data: giphyData },
  } = await axios.get(
    `https://api.giphy.com/v1/gifs/random?api_key=${giphyOptions.api_key}&tag=${giphyOptions.tag}&rating=${giphyOptions.rating}`
  );

  return {
    title: giphyData.title,
    gif: giphyData.images.downsized.url,
  };
}

export async function postMessageToSlack(
  name: string,
  gif: string,
  title: string,
  birthdate?: string
) {
  console.log("Post to slack channel");
  await axios.post(
    process.env.SLACK_CHANNEL_URL,
    {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `A very happy birthday to ${name} ${
              birthdate ? `(on ${birthdate})` : ""
            } :partydancer:`,
          },
        },
        {
          type: "image",
          block_id: "image4",
          image_url: `${gif}`,
          alt_text: `${title}`,
        },
      ],
    },
    { headers: { "Content-type": "application/json" } }
  );
}
