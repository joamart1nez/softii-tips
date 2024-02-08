import axios from 'axios';
import { defineStore } from 'pinia';
import {
  Payment,
  PaymentMethod,
  PaymentMethodID,
  uuid,
} from 'src/components/models';
import { uuidv4 } from 'src/utils';

const API_URL = 'http://localhost:8080/api';

export enum States {
  INITIAL,
  ENTER_TOTAL_TIPS,
  ENTER_TOTAL_SPLITS,
  CHOOSE_PAYMENT_METHOD,
  ENTER_AMOUNT,
  RECORD_TRANSACTION,
}

const StateTransitions: Record<number, States> = {
  [States.INITIAL]: States.ENTER_TOTAL_TIPS,
  [States.ENTER_TOTAL_TIPS]: States.ENTER_TOTAL_SPLITS,
  [States.ENTER_TOTAL_SPLITS]: States.CHOOSE_PAYMENT_METHOD,
  [States.CHOOSE_PAYMENT_METHOD]: States.ENTER_AMOUNT,
  [States.ENTER_AMOUNT]: States.RECORD_TRANSACTION,
};

interface State {
  currentState: States;
  activeInputNumber: boolean;

  totalTips: number;
  totalSplits: number;
  selectedPaymentMethodID: PaymentMethodID | null;

  paymentMethods: PaymentMethod[];
  payments: Payment[];

  totalPaid: number;
  remainingToPay: number;
}

export const useTipsStore = defineStore('tips-store', {
  state: (): State => {
    return {
      currentState: States.INITIAL,
      activeInputNumber: false,

      totalTips: 0,
      totalSplits: 0,
      selectedPaymentMethodID: null,

      paymentMethods: [
        { id: 1, label: 'Efectivo', icon: 'payments' },
        { id: 2, label: 'BBVA 1234', icon: 'credit_card' },
        { id: 3, label: 'Santander 1234', icon: 'credit_card' },
      ],
      payments: [],

      totalPaid: 0,
      remainingToPay: 0,
    };
  },
  actions: {
    nextState<T extends number | PaymentMethodID>(value: T) {
      switch (this.currentState) {
        case States.INITIAL:
          this.currentState = StateTransitions[this.currentState];
          break;
        case States.ENTER_TOTAL_TIPS:
          if (Number.isNaN(value)) {
            alert('Ingrese un valor correcto');
            this.currentState = States.ENTER_TOTAL_TIPS;
          } else {
            this.totalTips = value;
            this.currentState = StateTransitions[this.currentState];
          }
          break;

        case States.ENTER_TOTAL_SPLITS:
          this.totalSplits = value;
          this.activeInputNumber = false;
          this.calculateSummaryAmount();
          this.currentState = StateTransitions[this.currentState];
          break;

        case States.CHOOSE_PAYMENT_METHOD:
          this.selectedPaymentMethodID = value;
          this.activeInputNumber = true;
          this.currentState = StateTransitions[this.currentState];
          break;

        case States.ENTER_AMOUNT:
          if (this.selectPaymentMethod === null) {
            alert('Seleccione un método de pago');
            this.currentState = States.CHOOSE_PAYMENT_METHOD;
            return;
          }
          if (
            Number(value) === 0 ||
            value > this.totalTips ||
            value > this.remainingToPay
          ) {
            alert('Ingrese un valor correcto');
            this.activeInputNumber = false;
            this.selectedPaymentMethodID = null;
            this.currentState = States.CHOOSE_PAYMENT_METHOD;
            return;
          }
          const selectedPaymentMethod = this.paymentMethods.find(
            ({ id }) => id === this.selectedPaymentMethodID
          );
          if (!selectedPaymentMethod) return;

          this.payments.push({
            ...selectedPaymentMethod,
            amount: value,
            uuid: uuidv4(),
          });
          this.calculateSummaryAmount();

          this.selectedPaymentMethodID = null;
          if (this.remainingToPay > 0) {
            this.currentState = States.CHOOSE_PAYMENT_METHOD;
          } else if (this.remainingToPay === 0) {
            this.currentState = States.RECORD_TRANSACTION;
          }
          this.activeInputNumber = false;
          break;
      }
    },
    startPaymentProcess() {
      this.$reset();
      this.activeInputNumber = true;
      this.nextState(0);
    },
    selectPaymentMethod(id: PaymentMethodID) {
      this.selectedPaymentMethodID = id;
    },
    deletePaymentByID(paymentMethodUUID: uuid) {
      this.payments = this.payments.filter(
        ({ uuid }) => uuid !== paymentMethodUUID
      );
      this.currentState = States.CHOOSE_PAYMENT_METHOD;
      this.calculateSummaryAmount();
    },
    calculateSummaryAmount() {
      this.totalPaid = this.payments.reduce(
        (prev, current) => (prev += current.amount),
        0
      );
      this.remainingToPay = this.totalTips - this.totalPaid;
    },

    recordTransaction() {
      const payments = this.payments.map(({ label, id, amount }) => ({
        paymentMethod: label,
        paymentMethodID: id,
        amount: amount,
      }));

      const transactions = {
        tipsAmount: this.totalTips,
        distributionAmongEmployees: this.totalSplits,
        payments,
      };

      axios
        .post(`${API_URL}/transactions`, transactions)
        .then((res) => {
          if (res.data.saved) alert('Transaccion guardada correctamente');
          else alert('Ocurrió un error al intentar guardar la transacción');

          this.$reset();
        })
        .catch((error) => console.log(error));
    },
  },
});
