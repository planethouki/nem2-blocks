<template>
  <div>
    <h4>Block Details</h4>
    <div v-if="block.block !== undefined">
      <div class="d-flex justify-content-between">
        <span>Height</span>
        <span>{{ block.block.height }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Difficulty</span>
        <span>{{ block.block.difficulty }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Timestamp</span>
        <span>{{ block.block.timestamp }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Hash</span>
        <span>{{ block.meta.hash }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Harvester</span>
        <span>{{ block.block.signerPublicKey }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Beneficiary</span>
        <span>{{ block.block.beneficiaryPublicKey }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Number of transactions</span>
        <span>{{ block.meta.numTransactions }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Fees</span>
        <span>{{ block.meta.totalFee }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Fees</span>
        <span>{{ block.meta.totalFee }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>State hash</span>
        <span>{{ block.block.stateHash }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Sub cache merkle roots</span>
        <div>
          <div
            v-for="(r, index) in block.meta.stateHashSubCacheMerkleRoots"
            :key="index"
            class="text-right"
          >
            {{ r }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BlockDetail',
  components: {},
  data() {
    return {
      block: {}
    }
  },
  computed: {
    ...mapGetters(['url']),
    height() {
      return this.$route.params.height
    }
  },
  mounted() {
    this.$axios.$get(`${this.url}/block/${this.height}`).then((b) => {
      this.block = b
    })
  }
}
</script>

<style scoped></style>
