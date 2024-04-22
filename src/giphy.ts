import axios from "axios";
import { logger } from "./logger";
import { config } from "./config";

export const getGiphyData = async () => {
  logger.info("Fetch GIF to display in message");
  const apiKey = config.giphy.apiKey;
  const giphyOptions = {
    api_key: apiKey,
    tag: "Happy Birthday",
    rating: "g",
  };

  const {
    data: { data: giphyData },
  } = await axios.get(
    `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${giphyOptions.tag}&rating=${giphyOptions.rating}`
  );

  return {
    title: giphyData.title,
    gif: giphyData.images.downsized.url,
  };
};
