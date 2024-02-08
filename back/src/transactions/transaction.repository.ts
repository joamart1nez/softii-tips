import { Transaction } from "./dto/transaction.dto";

export interface TransactionRepository {
  getAll: () => Transaction[];
  save: (transaction: Transaction) => boolean;
}

export class MemoryTransactionRepository implements TransactionRepository {
  transactions: Transaction[];
  constructor() {
    this.transactions = [];
  }

  getAll() {
    return this.transactions;
  }

  save(transaction: Transaction) {
    this.transactions.push(transaction);
    return true;
  }
}
