import express from "express";
import { logger } from "./logger";
import { sendBirthdayWish } from "./bday";
import { getHealthStatus } from "./health";
import { config } from "./config";
import { toDate } from "./date";

const app = express();
const port = 8080;

const asyncRoute = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export const startWebServer = () => {
  app.get(
    "/health",
    asyncRoute(async (_req, res) => {
      const healthStatus = await getHealthStatus();
      res.status(200).send({ healthStatus });
    })
  );

  app.use(express.json());

  app.post(
    "/trigger",
    asyncRoute(async (req, res) => {
      if (req.body.triggerToken !== config.triggerToken) {
        return res.sendStatus(401);
      }

      const date = req.body.date ? toDate(req.body.date) : undefined;
      await sendBirthdayWish({ date });
      res.sendStatus(200);
    })
  );

  app.use((err, _req, res, _next) => {
    logger.error(err.stack || err.message || err);
    res.sendStatus(500);
  });

  app.listen(port, () => {
    logger.info(`Web server is listening at http://localhost:${port}`);
  });
};
