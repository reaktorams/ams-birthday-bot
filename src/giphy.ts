import axios from "axios"
import { logger } from "./logger"
import { config } from "./config"

const safeForWorkGifIds = [
  "g5R9dok94mrIvplmZd",
  "OKO0B2hRlG6KycHSZG",
  "T1mwiKjGsITzaWMGu4",
  "dl2l3By1qopSlsxlAD",
  "GvjRy6pUMUjQxiKNlh",
  "4R9iPofhP6lQzmTlhA",
  "UJnRqJWD0KrbW",
  "XBcp5KwC2vRQnZJgwN",
  "VkUdMsK42kNgrPWuHd",
  "WRL7YgP42OKns22wRD",
  "SydF69oKAHQK7OUJqT",
  "uyHf2xWInLB3xmI1HV",
  "3o6MbhgBx0MaN0nOr6",
  "26BRL7YrutHKsVtJK",
  "mcJohbfGPATW8",
  "kaBuCyQLuCANfmoFMC",
  "DXhmNiA8F1i4fLnMdb",
  "3ofT5SmFuVS6s0AEPC",
  "xT8qB6yf3ZmoDscN7a",
  "3oKIPeISmDwwJZkvoA",
]

const getRandomGifId = () => {
  const index = Math.floor(Math.random() * safeForWorkGifIds.length)
  return safeForWorkGifIds[index]
}

export const getGiphyData = async () => {
  logger.info("Fetch GIF to display in message")
  const apiKey = config.giphy.apiKey
  const randomId = getRandomGifId()

  const {
    data: { data: giphyData },
  } = await axios.get(
    `https://api.giphy.com/v1/gifs/${randomId}?api_key=${apiKey}`,
  )

  return {
    title: giphyData.title,
    gif: giphyData.images.downsized.url,
  }
}
