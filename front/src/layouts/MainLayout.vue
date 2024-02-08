<template>
  <div class="row main-container">
    <section class="col-sm-12 col-md-4 col-section">
      <TotalTips />
      <SplitTips />
      <PaymentMethod />
    </section>
    <section class="col-sm-12 col-md-4 col-section input-numbers-section">
      <InputNumbers :show-rest-amount="false" />
    </section>
    <section class="col-sm-12 col-md-4 col-section">
      <TotalPayments />
    </section>
    <section class="col-12 col-section">
      <FinalSummary />
    </section>
  </div>
</template>

<script lang="ts">
import TotalTips from '../components/TotalTips.vue';
import SplitTips from 'src/components/SplitTips.vue';
import PaymentMethod from 'src/components/PaymentMethod.vue';
import InputNumbers from 'src/components/InputNumbers.vue';
import TotalPayments from 'src/components/TotalPayments.vue';
import FinalSummary from 'src/components/FinalSummary.vue';

export default {
  components: {
    TotalTips,
    SplitTips,
    PaymentMethod,
    InputNumbers,
    TotalPayments,
    FinalSummary,
  },
  data() {
    return {
      totalTipsCollected: 0,
      totalSplits: 0,
    };
  },
};
</script>

<style lang="scss">
h6 {
  margin: 20px 0;
}

@media (max-width: 600px) {
  .input-numbers-section {
    order: -1;
  }
}

.col-section {
  padding: 20px;
}
</style>
