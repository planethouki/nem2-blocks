<template>
  <div class="container">
    <BlockDetail />
    <Receipts />
    <Transactions />
    <hr />
    <pre>{{ JSON.stringify(block, null, '  ') }}</pre>
    <pre>{{ JSON.stringify(receipts, null, '  ') }}</pre>
    <pre>{{ JSON.stringify(transactions, null, '  ') }}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Transactions from '~/components//Transactions'
import Receipts from '~/components/Receipts'
import BlockDetail from '~/components/BlockDetail'

export default {
  components: { BlockDetail, Transactions, Receipts },
  validate({ params }) {
    return /^\d+$/.test(params.height)
  },
  data() {
    return {
      block: {},
      receipts: {},
      transactions: []
    }
  },
  computed: {
    ...mapGetters(['url', 'ws', 'currentHeight']),
    height() {
      return Number(this.$route.params.height)
    }
  },
  mounted() {
    this.get()
  },
  methods: {
    get() {
      this.$axios
        .$get(`${this.url}/block/${this.$route.params.height}`)
        .then((b) => {
          this.block = b
        })
      this.$axios
        .$get(`${this.url}/block/${this.$route.params.height}/receipts`)
        .then((r) => {
          this.receipts = r
        })
      this.$axios
        .$get(`${this.url}/block/${this.$route.params.height}/transactions`)
        .then((t) => {
          this.transactions = t
        })
    }
  }
}
</script>

<style scoped></style>
