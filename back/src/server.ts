import express, { Application, json, urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { TransactionRouter } from "./transactions/transaction.router";

export function initServer() {
  dotenv.config();

  const app: Application = express();
  const port = process.env.PORT || 8080;

  app.use(cors());
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use("/api/transactions", TransactionRouter);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}
