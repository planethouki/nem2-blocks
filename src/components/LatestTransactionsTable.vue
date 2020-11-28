<template>
  <div>
    <div v-if="latestTransactionsData.length === 0">
      None
    </div>
    <transition-group name="transaction-list" tag="div">
      <div
        v-for="t in latestTransactionsData"
        :key="t.hash"
        class="d-flex align-items-center border-bottom my-2 py-2"
      >
        <div class="text-truncate text-monospace mr-3" style="max-width: 4rem;">
          <a :href="`${url}/transactions/confirmed/${t.hash}`" target="_blank">
            {{ t.hash }}
          </a>
        </div>
        <div class="text-truncate mx-3 flex-fill">
          <div class="text-truncate" style="max-width: 10rem;">
            Sender
            <span class="text-monospace">
              <a
                :href="`${url}/accounts/${t.signerPublicKey}`"
                target="_blank"
                >{{ t.signerPublicKey }}</a
              >
            </span>
          </div>
          <div>
            {{ $formatter.txType(t.type) }}
            <small>Transaction</small>
          </div>
        </div>
        <div class="ml-3 text-right">
          <div class="text-nowrap">
            <span>{{ $formatter.intPart(t.maxFee) }}</span
            >.<span class="small">{{ $formatter.fracPart(t.maxFee) }}</span>
            <small>max fee</small>
          </div>
          <div class="text-muted text-nowrap" style="font-size: 80%;">
            <a :href="`${url}/blocks/${t.height}`" target="_blank">{{
              t.height
            }}</a>
            height
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'LatestTransactionsTable',
  props: {
    transactions: {
      type: Array,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  computed: {
    latestTransactionsData() {
      return this.transactions.map((t) => {
        return {
          hash: t.meta.hash,
          signerPublicKey: t.transaction.signerPublicKey,
          maxFee: t.transaction.maxFee,
          height: t.meta.height,
          type: t.transaction.type
        }
      })
    }
  }
}
</script>
