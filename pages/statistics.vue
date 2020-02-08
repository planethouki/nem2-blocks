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
        :data="difficultyChartData"
        :options="difficultyChartOptions"
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
        title: 'Block time differences (last 100 blocks)'
      },
      difficultyChartOptions: {
        title: 'Block difficulty (last 100 blocks)'
      },
      transactionsChartOptions: {
        title: 'Transactions per block (last 100 blocks)'
      },
      transactionFeeChartOptions: {
        title: 'Fee per block (last 100 blocks)'
      },
      transactionFeeMulChartOptions: {
        title: 'Fee multiplier per block (last 100 blocks)'
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
            feeMultiplier: b.block.feeMultiplier,
            difficulty: Number(b.block.difficulty) / 100000000000000
          }
        })
        .sort((x, y) => {
          const a = Number(x.height)
          const b = Number(y.height)
          return a - b
        })
    },
    blockTimeChartData() {
      const averageWindow = 10
      const q = this.blocksForChart.map((b, idx, org) => {
        if (idx === 0) {
          return [b.height, null, null]
        } else if (idx < averageWindow + 1) {
          return [b.height, (b.timestamp - org[idx - 1].timestamp) / 1000, null]
        }
        return [
          b.height,
          (b.timestamp - org[idx - 1].timestamp) / 1000,
          (b.timestamp - org[idx - averageWindow].timestamp) /
            averageWindow /
            1000
        ]
      })
      return [
        [
          'Height',
          'Time Difference (in seconds)',
          `Avg Time Difference (per ${averageWindow} blocks)`
        ],
        ...q
      ]
    },
    difficultyChartData() {
      const q = this.blocksForChart
        .map((b, idx) => {
          if (idx === 0) {
            return [b.height, null]
          }
          return [b.height, b.difficulty]
        })
        .slice(1)
      return [['Height', 'Block difficulty'], ...q]
    },
    transactionsChartData() {
      const averageWindow = 10
      const q = this.blocksForChart.map((b, idx, org) => {
        if (idx < averageWindow + 1) {
          return [b.height, b.numTransactions, null]
        }
        return [
          b.height,
          b.numTransactions,
          org
            .slice(idx - averageWindow, idx)
            .map((b) => b.numTransactions)
            .reduce((prev, curr) => {
              return prev + curr
            }) / averageWindow
        ]
      })
      return [
        [
          'Height',
          'Number of transactions',
          `Avg number of transactions (per ${averageWindow} blocks)`
        ],
        ...q
      ]
    },
    transactionFeeChartData() {
      const averageWindow = 10
      const q = this.blocksForChart.map((b, idx, org) => {
        if (idx < averageWindow + 1) {
          return [b.height, b.totalFee / 1000000, null]
        }
        return [
          b.height,
          b.totalFee / 1000000,
          org
            .slice(idx - averageWindow, idx)
            .map((b) => b.totalFee)
            .reduce((prev, curr) => {
              return prev + curr
            }) /
            averageWindow /
            1000000
        ]
      })
      return [['Height', 'Fee', `Avg fee (per ${averageWindow} blocks)`], ...q]
    },
    transactionFeeMulChartData() {
      const averageWindow = 10
      const q = this.blocksForChart.map((b, idx, org) => {
        if (idx < averageWindow + 1) {
          return [b.height, b.feeMultiplier, null]
        }
        return [
          b.height,
          b.feeMultiplier,
          org
            .slice(idx - averageWindow, idx)
            .map((b) => b.feeMultiplier)
            .reduce((prev, curr) => {
              return prev + curr
            }) / averageWindow
        ]
      })
      return [
        [
          'Height',
          'Fee multiplier',
          `Avg fee multiplier (per ${averageWindow} blocks)`
        ],
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
          const q = Math.max(Number(res.height) - 100, 1)
          return this.$axios.$get(`${this.url}/blocks/${q}/limit/100`)
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
