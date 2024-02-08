<template>
  <h6>Total de propinas</h6>
  <div class="total-tips-input-container">
    <q-input
      standout
      disable
      class="total-tips-input"
      :class="{ active: activeInput }"
      v-model="totalTips"
    />
    <div class="total-tips-edit">
      <q-btn round flat icon="edit" @click="startPaymentProcess()" />
    </div>
  </div>
</template>

<script>
import { States, useTipsStore } from 'src/stores/tips-store';
import { formatToDollar } from 'src/utils';

const store = useTipsStore();

export default {
  data() {
    return {
      text: 0,
    };
  },
  methods: {
    startPaymentProcess() {
      store.startPaymentProcess();
    },
  },
  computed: {
    totalTips: () => formatToDollar(store.totalTips),
    activeInput: () => store.currentState === States.ENTER_TOTAL_TIPS,
  },
};
</script>

<style lang="scss">
.total-tips-input-container {
  display: flex;

  & > .total-tips-input {
    flex: 1;
  }

  & > .total-tips-input.active {
    border: 1px solid $deep-orange-7;
  }

  & > .total-tips-edit {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
