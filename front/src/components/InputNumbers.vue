<template>
  <q-card class="input-number" :class="{ active }">
    <q-card-section class="row panel">
      <div class="col-1">{{ signCharacter }}</div>
      <div class="col-10">
        <q-input borderless disable v-model="inputPanel" />
      </div>
      <div class="col-1">
        <q-btn icon="backspace" size="sm" round flat @click="deleteNumber()" />
      </div>
    </q-card-section>

    <q-card-section class="row">
      <div
        class="col-4 text-center"
        round
        color="primary"
        v-for="n in 9"
        :key="n"
      >
        <q-btn
          class="input-button"
          color="white"
          text-color="blank"
          @click="writeNumber(n)"
        >
          {{ n }}
        </q-btn>
      </div>

      <div class="col-4 text-center">
        <q-btn
          class="input-button"
          color="white"
          text-color="blank"
          @click="writeNumber('00')"
          >00</q-btn
        >
      </div>
      <div class="col-4 text-center">
        <q-btn
          class="input-button"
          color="white"
          text-color="blank"
          @click="writeNumber(0)"
          >0</q-btn
        >
      </div>
      <div class="col-4 text-center">
        <q-btn class="input-button check-btn" @click="addValue()">
          <q-icon name="check_circle" color="white" />
        </q-btn>
      </div>
    </q-card-section>

    <q-card-section
      v-show="isChoosePaymentMethodCurrentState && active"
      class="row justify-center"
    >
      <q-btn
        unelevated
        rounded
        size="md"
        color="deep-orange"
        :label="remainingToPayText"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import { formatToDollar } from 'src/utils';
import { States, useTipsStore } from '../stores/tips-store';
const store = useTipsStore();
export default {
  data() {
    return {
      inputPanel: null,
      signCharacters: {
        [States.ENTER_TOTAL_TIPS]: '$',
        [States.ENTER_TOTAL_SPLITS]: '#',
      },
    };
  },
  methods: {
    writeNumber(number) {
      if (store.activeInputNumber)
        this.inputPanel = Number(`${this.inputPanel ?? 0}${number}`);
    },
    deleteNumber() {
      if (store.activeInputNumber)
        this.inputPanel = Number(`${this.inputPanel}`.slice(0, -1));
    },
    addValue() {
      store.nextState(this.inputPanel);
      this.inputPanel = null;
    },
  },
  computed: {
    active: () => store.activeInputNumber,
    isChoosePaymentMethodCurrentState: () =>
      store.currentState === States.ENTER_AMOUNT,
    remainingToPayText: () =>
      `Cantidad restante ${formatToDollar(store.remainingToPay)}`,
    signCharacter() {
      return this.signCharacters[store.currentState] ?? '';
    },
  },
};
</script>

<style lang="scss">
.input-number.active {
  border: 1px solid $deep-orange-7;
  background-color: $deep-orange-1;
}

.panel {
  border-bottom: 1px solid;
}

.input-button {
  margin-bottom: 10px;
  aspect-ratio: 2/1;
}

.check-btn {
  background: gray;
}

.active .check-btn {
  background: $deep-orange-7;
}
</style>
