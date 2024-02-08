export interface Transaction {
  tipsAmount: number;
  distributionAmongEmployees: number;
  payments: Payment[];
}

export type PaymentMethodID = number;

export interface Payment {
  paymentMethod: string;
  paymentMethodID: PaymentMethodID;
  amount: number;
}
