import axios from "axios"
import { logger } from "./logger"
import { config } from "./config"

export const postMessageToSlack = async (
  message: string,
  gif: string,
  title: string,
) => {
  logger.info("Post to slack channel")

  await axios.post(
    config.slack.channelUrl,
    {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: message,
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
    { headers: { "Content-type": "application/json" } },
  )
}
