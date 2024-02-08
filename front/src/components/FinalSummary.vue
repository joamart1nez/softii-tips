<template>
  <div class="row">
    <div class="col-12 col-md-6">
      <div class="row">
        <div class="col-9">
          <h5 class="total-paid">Total pagado:</h5>
          <h5>Restante por pagar:</h5>
        </div>
        <div class="col-3">
          <h5 class="total-paid">{{ totalPaid }}</h5>
          <h5>{{ remainingToPay }}</h5>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 row justify-center">
      <q-btn
        unelevated
        rounded
        :disable="!canPayTips"
        :outline="!canPayTips"
        size="lg"
        color="deep-orange"
        class="pay-tips-btn"
        @click="recordTransaction()"
        >Pagar propinas</q-btn
      >
    </div>
  </div>
</template>

<script>
import { States, useTipsStore } from 'src/stores/tips-store';
import { formatToDollar } from 'src/utils';
const store = useTipsStore();
export default {
  methods: {
    recordTransaction() {
      if (this.canPayTips) store.recordTransaction();
    },
  },
  computed: {
    totalPaid: () => formatToDollar(store.totalPaid),
    remainingToPay: () => formatToDollar(store.remainingToPay),
    canPayTips: () => store.currentState === States.RECORD_TRANSACTION,
  },
};
</script>

<style scoped lang="scss">
h5 {
  margin: 0;
}
.pay-tips-btn {
  width: 100%;
}
.total-paid {
  color: $deep-orange-7;
}
</style>
