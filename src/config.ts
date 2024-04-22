import dotenv from "dotenv";
dotenv.config();

const getEnvVar = (name: string) => {
  const value = process.env[name];
  if (value === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const config = {
  giphy: {
    apiKey: getEnvVar("GIPHY_API_KEY"),
  },
  google: {
    credentials: JSON.parse(
      Buffer.from(getEnvVar("GOOGLE_CLIENT_OPTIONS"), "base64").toString(
        "binary"
      )
    ),
    spreadsheetId: getEnvVar("SPREADSHEET_ID"),
  },
  slack: {
    channelUrl: getEnvVar("SLACK_CHANNEL_URL"),
  },
  triggerToken: getEnvVar("TRIGGER_TOKEN"),
};
