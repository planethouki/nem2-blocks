<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div
          v-for="(value, key) in storage"
          :key="key"
          class="d-flex justify-content-between"
          style="max-width: 300px;"
        >
          <span>{{ key }}</span>
          <span>{{ value }}</span>
        </div>
      </div>
    </div>
    <div class="card p-1" style="height: 400px;">
      <GChart
        v-if="blocks.length > 0"
        :settings="{ packages: ['corechart'] }"
        type="LineChart"
        :data="blockTimeChartData"
        :options="blockTimeChartOptions"
        style="height: 100%; width: 100%;"
      />
      <div
        v-else
        class="d-flex justify-content-center align-items-center h-100"
      >
        <b-spinner type="grow" label="Spinning"></b-spinner>
      </div>
    </div>
    <div class="card p-1" style="height: 400px;">
      <GChart
        v-if="blocks.length > 0"
        :settings="{ packages: ['corechart'] }"
        type="LineChart"
        :data="transactionsChartData"
        :options="transactionsChartOptions"
        style="height: 100%; width: 100%;"
      />
      <div
        v-else
        class="d-flex justify-content-center align-items-center h-100"
      >
        <b-spinner type="grow" label="Spinning"></b-spinner>
      </div>
    </div>
    <div class="card p-1" style="height: 400px;">
      <GChart
        v-if="blocks.length > 0"
        :settings="{ packages: ['corechart'] }"
        type="LineChart"
        :data="transactionFeeChartData"
        :options="transactionFeeChartOptions"
        style="height: 100%; width: 100%;"
      />
      <div
        v-else
        class="d-flex justify-content-center align-items-center h-100"
      >
        <b-spinner type="grow" label="Spinning"></b-spinner>
      </div>
    </div>
    <div class="card p-1" style="height: 400px;">
      <GChart
        v-if="blocks.length > 0"
        :settings="{ packages: ['corechart'] }"
        type="LineChart"
        :data="transactionFeeMulChartData"
        :options="transactionFeeMulChartOptions"
        style="height: 100%; width: 100%;"
      />
      <div
        v-else
        class="d-flex justify-content-center align-items-center h-100"
      >
        <b-spinner type="grow" label="Spinning"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GChart } from 'vue-google-charts'

export default {
  components: { GChart },
  data() {
    return {
      blockTimeChartOptions: {
        title: 'Block time differences (last 241 blocks)'
      },
      transactionsChartOptions: {
        title: 'Transactions per block (last 240 blocks)'
      },
      transactionFeeChartOptions: {
        title: 'Fee per block (last 240 blocks)'
      },
      transactionFeeMulChartOptions: {
        title: 'Fee multiplier per block (last 240 blocks)'
      },
      blocks: []
    }
  },
  computed: {
    ...mapGetters(['url', 'ws', 'currentHeight', 'storage']),
    blocksForChart() {
      return this.blocks
        .map((b) => {
          return {
            timestamp: Number(b.block.timestamp),
            height: b.block.height,
            numTransactions: b.meta.numTransactions,
            totalFee: Number(b.meta.totalFee),
            feeMultiplier: b.block.feeMultiplier
          }
        })
        .sort((x, y) => {
          const a = x.height
          const b = y.height
          if (a < b) {
            return -1
          }
          if (a > b) {
            return 1
          }
          return 0
        })
    },
    blockTimeChartData() {
      const q = this.blocksForChart
        .map((b, idx, org) => {
          if (idx === 0) {
            return [b.height, null, null]
          } else if (idx < 61) {
            return [b.height, b.timestamp - org[idx - 1].timestamp, null]
          }
          return [
            b.height,
            b.timestamp - org[idx - 1].timestamp,
            (b.timestamp - org[idx - 60].timestamp) / 60
          ]
        })
        .slice(1)
      return [
        [
          'Height',
          'Time Difference (in ms)',
          'Avg Time Difference (per 60 blocks)'
        ],
        ...q
      ]
    },
    transactionsChartData() {
      const q = this.blocksForChart
        .map((b, idx, org) => {
          if (idx === 0) {
            return [b.height, null, null]
          } else if (idx < 61) {
            return [b.height, b.numTransactions, null]
          }
          return [
            b.height,
            b.numTransactions,
            org
              .slice(idx - 60, idx)
              .map((b) => b.numTransactions)
              .reduce((prev, curr) => {
                return prev + curr
              }) / 60
          ]
        })
        .slice(1)
      return [
        [
          'Height',
          'Number of transactions',
          'Avg number of transactions (per 60 blocks)'
        ],
        ...q
      ]
    },
    transactionFeeChartData() {
      const q = this.blocksForChart
        .map((b, idx, org) => {
          if (idx === 0) {
            return [b.height, null, null]
          } else if (idx < 61) {
            return [b.height, b.totalFee, null]
          }
          return [
            b.height,
            b.totalFee,
            org
              .slice(idx - 60, idx)
              .map((b) => b.totalFee)
              .reduce((prev, curr) => {
                return prev + curr
              }) / 60
          ]
        })
        .slice(1)
      return [['Height', 'Fee', 'Avg fee (per 60 blocks)'], ...q]
    },
    transactionFeeMulChartData() {
      const q = this.blocksForChart
        .map((b, idx, org) => {
          if (idx === 0) {
            return [b.height, null, null]
          } else if (idx < 61) {
            return [b.height, b.feeMultiplier, null]
          }
          return [
            b.height,
            b.feeMultiplier,
            org
              .slice(idx - 60, idx)
              .map((b) => b.feeMultiplier)
              .reduce((prev, curr) => {
                return prev + curr
              }) / 60
          ]
        })
        .slice(1)
      return [
        ['Height', 'Fee multiplier', 'Avg fee multiplier (per 60 blocks)'],
        ...q
      ]
    }
  },
  mounted() {
    this.get()
  },
  destroyed() {},
  methods: {
    get() {
      this.$axios
        .$get(`${this.url}/chain/height`)
        .then((res) => {
          const q = Math.max(Number(res.height) - 241, 1)
          return this.$axios.$get(
            `${this.url}/diagnostic/blocks/${q}/limit/241`
          )
        })
        .then((res) => {
          this.blocks = res
        })
    }
  }
}
</script>

<style>
.card {
  margin-top: 1rem;
}
</style>
