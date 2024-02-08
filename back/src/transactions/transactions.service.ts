import { Transaction } from "./dto/transaction.dto";
import { TransactionRepository } from "./transaction.repository";

export class TransactionsService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  getAll() {
    return this.transactionRepository.getAll();
  }

  recordTransaction(transaction: Transaction) {
    return this.transactionRepository.save(transaction);
  }
}
