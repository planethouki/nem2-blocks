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
              :tbody-transition-props="transProps"
              class="mt-3"
            >
              <template v-slot:cell(fee)="data">
                <span>{{ $formatter.intPart(data.value) }}</span
                >.<span class="small">{{
                  $formatter.fracPart(data.value)
                }}</span>
              </template>
              <template v-slot:cell(signerPublicKey)="data">
                <a :href="`${url}/account/${data.value}`" target="_blank">{{
                  data.value
                }}</a>
              </template>
            </b-table>
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
    <div class="row no-gutters">
      <div class="col col-12 col-md-6">
        <div class="card m-3">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5>
                Latest blocks
              </h5>
              <small>
                <nuxt-link to="/blocks/0">see more</nuxt-link>
              </small>
            </div>
            <transition-group name="block-list" tag="div">
              <div
                v-for="b in latestBlocksData"
                :key="b.hash"
                class="d-flex align-items-center border-bottom my-2 py-2"
              >
                <div class="p-2 mr-3">
                  <a :href="`${url}/block/${b.height}`" target="_blank">{{
                    b.height
                  }}</a>
                </div>
                <div class="text-truncate mx-3 flex-fill">
                  <div class="text-truncate" style="max-width: 10rem;">
                    Harvester
                    <span class="text-monospace">
                      <a
                        :href="`${url}/account/${b.signerPublicKey}`"
                        target="_blank"
                        >{{ b.signerPublicKey }}</a
                      >
                    </span>
                  </div>
                  <div>
                    <a
                      :href="`${url}/block/${b.height}/transactions`"
                      target="_blank"
                    >
                      {{ b.numTransactions }}</a
                    >&nbsp;<small>transactions</small>
                  </div>
                </div>
                <div class="ml-3 text-right">
                  <div class="text-nowrap">
                    <span>{{ $formatter.intPart(b.totalFee) }}</span
                    >.<span class="small">{{
                      $formatter.fracPart(b.totalFee)
                    }}</span>
                    <small>total fee</small>
                  </div>
                  <div class="text-muted text-nowrap" style="font-size: 80%;">
                    {{ $formatter.timePass(b.timeDiff) }} ago
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
      <div class="col col-12 col-md-6">
        <div class="card m-3">
          <div class="card-body">
            <h5>
              Latest transactions
            </h5>
            <div v-if="latestTransactionsData.length === 0">
              None
            </div>
            <transition-group name="transaction-list" tag="div">
              <div
                v-for="t in latestTransactionsData"
                :key="t.hash"
                class="d-flex align-items-center border-bottom my-2 py-2"
              >
                <div
                  class="text-truncate text-monospace mr-3"
                  style="max-width: 4rem;"
                >
                  <a :href="`${url}/transaction/${t.hash}`" target="_blank">{{
                    t.hash
                  }}</a>
                </div>
                <div class="text-truncate mx-3 flex-fill">
                  <div class="text-truncate" style="max-width: 10rem;">
                    Sender
                    <span class="text-monospace">
                      <a
                        :href="`${url}/account/${t.signerPublicKey}`"
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
                    >.<span class="small">{{
                      $formatter.fracPart(t.maxFee)
                    }}</span>
                    <small>max fee</small>
                  </div>
                  <div class="text-muted text-nowrap" style="font-size: 80%;">
                    <a :href="`${url}/block/${t.height}`" target="_blank">{{
                      t.height
                    }}</a>
                    height
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
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
      transProps: {
        name: 'block-list'
      },
      harvesterPiChartOptions: {
        title: 'Harvester (last 100 blocks)'
      },
      harvesterTableFields: [
        { key: 'rank', label: 'Rank', class: 'text-center' },
        {
          key: 'signerPublicKey',
          label: 'Harvester',
          tdClass: 'text-monospace small align-middle'
        },
        { key: 'count', label: 'Blocks' },
        { key: 'fee', label: 'Fees earned' }
      ],
      blocks: [],
      transactions: [],
      now: Date.now()
    }
  },
  computed: {
    ...mapGetters(['url', 'ws', 'storage', 'currentHeight']),
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
        return {}
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
      const q = Object.keys(this.signerToCount)
        .map((signerPublicKey) => {
          return [
            signerPublicKey,
            this.signerToCount[signerPublicKey].harvestCount
          ]
        })
        .sort((x, y) => {
          return y[1] - x[1]
        })
      return [['Signer', 'Count'], ...q]
    },
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
    },
    latestBlocksData() {
      return this.blocks.slice(0, 10).map((b) => {
        return {
          hash: b.meta.hash,
          timeDiff: this.now - Number(b.block.timestamp) - 1459468800000,
          height: b.block.height,
          signerPublicKey: b.block.signerPublicKey,
          numTransactions: b.meta.numTransactions,
          totalFee: Number(b.meta.totalFee)
        }
      })
    }
  },
  watch: {
    blocks() {
      if (this.blocks.length === 0) {
        return {}
      }
      const getTransactionsPromises = this.blocks
        .filter((b) => {
          return b.meta.numTransactions > 0
        })
        .map((b) => {
          return b.block.height
        })
        .sort((a, b) => {
          return Number(b) - Number(a)
        })
        .slice(0, 10)
        .map((h) => {
          return this.$axios.$get(`${this.url}/block/${h}/transactions`)
        })
      Promise.all(getTransactionsPromises).then((results) => {
        const transactions = []
        for (const result of results) {
          transactions.push(...result)
        }
        this.transactions = transactions.slice(0, 20)
      })
    }
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (
        mutation.type === 'newBlock' &&
        state.newBlock.block.height !== undefined
      ) {
        this.$nextTick(() => {
          this.addNewBlock(mutation.payload.newBlock)
        })
      }
    })
    this.get()
    this.secondsInterval = setInterval(() => {
      this.now = Date.now()
    }, 1000)
  },
  destroyed() {
    clearInterval(this.secondsInterval)
  },
  methods: {
    get() {
      this.$axios
        .$get(`${this.url}/chain/height`)
        .then((res) => {
          const q = Math.max(Number(res.height) - 99, 1)
          return this.$axios.$get(
            `${this.url}/diagnostic/blocks/${q}/limit/100`
          )
        })
        .then((res) => {
          this.blocks = res
        })
    },
    addNewBlock(newBlock) {
      this.$axios
        .$get(`${this.url}/block/${newBlock.block.height}`)
        .then((b) => {
          const copy = [b, ...JSON.parse(JSON.stringify(this.blocks))]
          this.blocks = copy.slice(0, 100)
        })
    }
  }
}
</script>

<style>
.transaction-list-move,
.block-list-move {
  transition: transform 0.3s;
}
</style>

<style scoped>
a {
  color: #35495e;
  text-decoration: underline;
}
a:hover {
  text-decoration: none;
}
</style>
