import axios from "axios";
import { logger } from "./logger";
import { config } from "./config";

export const postMessageToSlack = async (
  name: string,
  gif: string,
  title: string,
  birthdate?: string
) => {
  logger.info("Post to slack channel");

  await axios.post(
    config.slack.channelUrl,
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
};
