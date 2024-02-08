import { Request, Response } from "express";
import { Transaction } from "./dto/transaction.dto";
import { TransactionsService } from "./transactions.service";

export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  getAll(_: Request, res: Response) {
    const transactions = this.transactionsService.getAll();
    res.json({ transactions });
  }

  recordTransaction(req: Request, res: Response) {
    const transaction = req.body as Transaction;
    const saved = this.transactionsService.recordTransaction(transaction);
    res.json({ saved });
  }
}
