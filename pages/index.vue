<template>
  <div class="container-fluid mt-3">
    <div class="row no-gutters">
      <div
        v-for="data in topCardList"
        :key="data.key"
        class="col col-12 col-sm-6 col-md-4"
      >
        <div class="card m-3">
          <div
            class="card-body d-flex justify-content-between align-items-center"
          >
            <font-awesome-icon :icon="data.icon" style="font-size: 3rem;" />
            <div class="text-right">
              <div class="text-muted">{{ data.title }}</div>
              <div class="h4">{{ data.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row no-gutters">
      <div class="col col-12 col-md-8">
        <div class="card m-3">
          <div class="card-body">
            <h5>
              Top Harvesters <small>(last {{ blocks.length }} blocks)</small>
            </h5>
            <b-table
              striped
              hover
              small
              responsive
              :items="harvesterData"
              :fields="harvesterTableFields"
              class="mt-3"
            ></b-table>
          </div>
        </div>
      </div>
      <div class="col col-12 col-md-4">
        <div class="card m-3 p-1">
          <GChart
            v-if="blocks.length > 0"
            :settings="{ packages: ['corechart'] }"
            type="PieChart"
            :data="harvesterPiChartData"
            :options="harvesterPiChartOptions"
          />
        </div>
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
      harvesterPiChartOptions: {
        title: 'Harvester (last 241 blocks)'
      },
      harvesterTableFields: [
        { key: 'rank', label: 'Rank', class: 'text-center' },
        {
          key: 'signerPublicKey',
          label: 'Harvester',
          tdClass: 'harvesterFont'
        },
        { key: 'count', label: 'Blocks' },
        { key: 'fee', label: 'Fee' }
      ],
      blocks: []
    }
  },
  computed: {
    ...mapGetters(['url', 'ws', 'storage']),
    topCardList() {
      if (!this.storage.numBlocks) {
        return []
      }
      return [
        {
          key: 'height',
          title: 'Height',
          value: this.storage.numBlocks,
          icon: 'cube'
        },
        {
          key: 'transactions',
          title: 'Transactions',
          value: this.storage.numTransactions,
          icon: 'scroll'
        },
        {
          key: 'accounts',
          title: 'Accounts',
          value: this.storage.numAccounts,
          icon: 'user'
        }
      ]
    },
    signerToCount() {
      if (this.blocks.length === 0) {
        return []
      }
      const signerToCount = {}
      for (const b of this.blocks) {
        if (signerToCount[b.block.signerPublicKey] === undefined) {
          signerToCount[b.block.signerPublicKey] = {
            harvestCount: 1,
            totalFee: Number(b.meta.totalFee)
          }
        } else {
          signerToCount[b.block.signerPublicKey].harvestCount += 1
          signerToCount[b.block.signerPublicKey].totalFee += Number(
            b.meta.totalFee
          )
        }
      }
      return signerToCount
    },
    harvesterData() {
      return Object.keys(this.signerToCount)
        .map((key) => {
          return {
            signerPublicKey: key,
            count: this.signerToCount[key].harvestCount,
            fee: this.signerToCount[key].totalFee
          }
        })
        .sort((x, y) => {
          const a = x.count
          const b = y.count
          if (a < b) {
            return 1
          }
          if (a > b) {
            return -1
          }
          return 0
        })
        .map((d, index) => {
          return {
            rank: index + 1,
            ...d
          }
        })
    },
    harvesterPiChartData() {
      const q = Object.keys(this.signerToCount).map((signerPublicKey) => {
        return [
          signerPublicKey,
          this.signerToCount[signerPublicKey].harvestCount
        ]
      })
      return [['Signer', 'Count'], ...q]
    }
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'host') {
        this.$nextTick(() => {
          this.get()
        })
      }
    })
    this.get()
  },
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
.harvesterFont {
  font-size: 80%;
  vertical-align: middle !important;
  font-family: monospace;
}
</style>
