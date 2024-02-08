<template>
  <h6><q-icon name="account_balance_wallet" /> Elije el método de pago</h6>

  <q-card
    v-for="paymentMethod in paymentMethods"
    :key="paymentMethod.label"
    class="payment-method-card"
    :class="paymentMethod.id === selectedPaymentMethodID && 'selected'"
    @click="selectPaymentMethod(paymentMethod.id)"
  >
    <q-card-section>
      <q-icon :name="paymentMethod.icon" />
      {{ paymentMethod.label }}
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { PaymentMethodID } from './models';

import { useTipsStore, States } from 'src/stores/tips-store';
const store = useTipsStore();

export default {
  methods: {
    selectPaymentMethod(id: PaymentMethodID) {
      if (store.currentState === States.CHOOSE_PAYMENT_METHOD)
        store.nextState(id);
    },
  },
  computed: {
    paymentMethods: () => store.paymentMethods,
    selectedPaymentMethodID: () => store.selectedPaymentMethodID,
  },
};
</script>

<style lang="scss">
.payment-method-card {
  margin: 10px 0;
}

.selected {
  background: $deep-orange-7;
}
</style>
