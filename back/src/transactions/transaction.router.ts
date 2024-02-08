import { Router } from "express";

import { MemoryTransactionRepository } from "./transaction.repository";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";

const transactionsController = new TransactionsController(
  new TransactionsService(new MemoryTransactionRepository())
);

export const TransactionRouter = Router()
  .get("/", (req, res) => transactionsController.getAll(req, res))
  .post("/", (req, res) => transactionsController.recordTransaction(req, res));
