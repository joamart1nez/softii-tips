<template>
  <h6>¿Entre cuántos quieres dividir las propinas?</h6>

  <div class="row split-tips-container">
    <div class="col-md-4">
      <q-input
        rounded
        standout
        disable
        v-model="totalSplits"
        placeholder="#"
        class="total-splits-input"
      />
    </div>
    <div class="col-md-8 self-center">
      <p class="tips-per-person-text">{{ tipsPerPerson }} x Persona</p>
    </div>
  </div>
</template>

<script>
import { formatToDollar } from '../utils';
import { States, useTipsStore } from '../stores/tips-store';
const store = useTipsStore();
export default {
  computed: {
    totalSplits: () => `#${store.totalSplits || ''}`,
    totalTips: () => store.totalTips,
    tipsPerPerson() {
      return !!store.totalSplits
        ? formatToDollar(store.totalTips / store.totalSplits)
        : formatToDollar(store.totalTips);
    },
  },
};
</script>

<style lang="scss">
.split-tips-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tips-per-person-text {
  margin: 0;
  padding: 0;
  color: $deep-orange-7;
  font-weight: bold;
}
</style>
