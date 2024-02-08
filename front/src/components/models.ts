export type PaymentMethodID = number;
export interface PaymentMethod {
  id: PaymentMethodID;
  icon: string;
  label: string;
}

export type uuid = string;
export type Payment = PaymentMethod & {
  amount: number;
  uuid: uuid;
};
