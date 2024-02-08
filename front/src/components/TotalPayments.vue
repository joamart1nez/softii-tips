<template>
  <h6>Pagos</h6>

  <template v-if="payments.length > 0">
    <q-card
      v-for="payment in payments"
      :key="payment.id"
      style="margin: 10px 0"
    >
      <div class="row">
        <q-card-section class="col">
          <q-icon :name="payment.icon" style="margin-right: 10px" />
          <strong> {{ payment.label }}</strong>
        </q-card-section>

        <q-card-section
          class="col"
          style="display: flex; justify-content: space-between"
        >
          ${{ payment.amount }}
          <q-btn
            size="sm"
            round
            flat
            icon="clear"
            color="deep-orange"
            @click="deletePaymentByID(payment.uuid)"
          />
        </q-card-section>
      </div>
    </q-card>
  </template>
  <template v-else>
    <q-card style="margin: 10px 0">
      <div class="row">
        <q-card-section class="col">
          <strong> Sin pagos</strong>
        </q-card-section>
      </div>
    </q-card>
  </template>
</template>

<script lang="ts">
import { useTipsStore } from 'src/stores/tips-store';
import { uuid } from './models';
const store = useTipsStore();
export default {
  methods: {
    deletePaymentByID: (id: uuid) => store.deletePaymentByID(id),
  },
  computed: {
    payments: () => store.payments,
  },
};
</script>
