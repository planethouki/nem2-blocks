<template>
  <div>
    <div v-if="blocks.length === 0">
      <b-spinner type="grow" label="Spinning"></b-spinner>
    </div>
    <transition-group v-else name="block-list" tag="div">
      <div
        v-for="b in latestBlocksData"
        :key="b.hash"
        class="d-flex align-items-center border-bottom my-2 py-2"
      >
        <div class="p-2 mr-3">
          <a :href="`${url}/blocks/${b.height}`" target="_blank">{{
            b.height
          }}</a>
        </div>
        <div class="text-truncate mx-3 flex-fill">
          <div class="text-truncate">
            Harvester
            <span class="text-monospace">
              <a
                :href="`${url}/accounts/${b.signerPublicKey}`"
                target="_blank"
                >{{ b.signerPublicKey }}</a
              >
            </span>
          </div>
          <div>
            <a
              :href="`${url}/transactions/confirmed?height=${b.height}`"
              target="_blank"
            >
              {{ b.transactionsCount }}</a
            >&nbsp;<small>transactions</small>
          </div>
        </div>
        <div class="ml-3 text-right">
          <div class="text-nowrap">
            <span>{{ $formatter.intPart(b.totalFee) }}</span
            >.<span class="small">{{ $formatter.fracPart(b.totalFee) }}</span>
            <small>total fee</small>
          </div>
          <div class="text-muted text-nowrap" style="font-size: 80%;">
            {{ $formatter.timePass(b.timeDiff) }} ago
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'LatestBlocksTable',
  props: {
    blocks: {
      type: Array,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  computed: {
    latestBlocksData() {
      return this.blocks.slice(0, 10).map((b) => {
        return {
          hash: b.meta.hash,
          timeDiff: this.$formatter.catapultTimeDiff(b.block.timestamp),
          height: b.block.height,
          signerPublicKey: b.block.signerPublicKey,
          transactionsCount: b.meta.transactionsCount,
          totalFee: Number(b.meta.totalFee)
        }
      })
    }
  }
}
</script>
