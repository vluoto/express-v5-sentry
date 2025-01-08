import * as Sentry from "@sentry/node";
import express from "express";

const app = express();

Sentry.setupExpressErrorHandler(app);

app.listen(3000, () => {
  console.info("👂");
});
