<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">nem2 blocks</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/blocks/1">Blocks</b-nav-item>
          <b-nav-item to="/statistics">Statistics</b-nav-item>
          <b-nav-item to="/peers">Peers</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <nuxt id="content" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  data() {
    return {
      socket: null
    }
  },
  computed: {
    ...mapGetters(['url', 'blocks', 'host'])
  },
  mounted() {
    this.startWs()
    this.getStorage()
    this.getHeight()
    this.getBlocks().then(() => {
      this.getTransactions()
    })
  },
  destroyed() {
    this.finishWs()
  },
  methods: {
    getHeight() {
      this.$api.$get('/chain/height').then((res) => {
        this.$store.commit('chainHeight', res)
      })
    },
    getStorage() {
      this.$api.$get(`/node/storage`).then((res) => {
        this.$store.commit('storage', { storage: res })
      })
    },
    getBlocks() {
      const params = new URLSearchParams()
      params.append('pageSize', 100)
      params.append('order', 'desc')
      return this.$api.$get(`/blocks?${params.toString()}`).then((res) => {
        this.$store.commit('blocks', { blocks: res.data })
      })
    },
    getTransactions() {
      if (this.blocks.length === 0) {
        return
      }
      let totalTxCount = 0
      const blocksHasTx = this.blocks
        .filter((b) => {
          return b.meta.numTransactions > 0
        })
        .sort((a, b) => {
          return Number(b.block.height) - Number(a.block.height)
        })
      const blocksConstantTx = blocksHasTx
        .map((b) => {
          totalTxCount += b.meta.numTransactions
          return {
            totalTxCount,
            ...b
          }
        })
        .filter((b) => {
          return b.totalTxCount < 20
        })
      const getTransactionsPromises = blocksConstantTx.map((b) => {
        const params = new URLSearchParams()
        params.append('height', b.block.height)
        params.append('pageSize', '20')
        return this.$cachedApi
          .$get(`/transactions/confirmed?${params.toString()}`)
          .then((res) => {
            return res.data
          })
      })
      return Promise.all(getTransactionsPromises).then((results) => {
        const transactions = []
        for (const result of results) {
          transactions.push(...result)
        }
        this.$store.commit('transactions', { transactions })
      })
    },
    startWs() {
      this.socket = new WebSocket(process.env.WS_URL)
      this.socket.onopen = () => {
        // eslint-disable-next-line no-console
        console.log('connection open')
      }
      this.socket.onclose = () => {
        // eslint-disable-next-line no-console
        console.log('connection close')
      }
      this.socket.onmessage = (e) => {
        const obj = JSON.parse(e.data)
        if ('uid' in obj) {
          this.socket.send('{"uid": "' + obj.uid + '", "subscribe":"block"}')
        } else if ('block' in obj) this.blockHandler(obj)
      }
    },
    finishWs() {
      if (this.socket) this.socket.close()
    },
    blockHandler(newBlock) {
      this.getStorage()
      this.getHeight()
      this.$store.commit('newBlock', { newBlock })
      this.$api.$get(`/blocks/${newBlock.block.height}`).then((block) => {
        this.$store.commit('addBlock', { block })
        if (block.meta.numTransactions > 0) {
          const transactionsParams = new URLSearchParams()
          transactionsParams.append('height', block.block.height)
          transactionsParams.append('pageSize', '20')
          return this.$cachedApi
            .$get(`/transactions/confirmed?${transactionsParams.toString()}`)
            .then((res) => {
              this.$store.commit('prependTransactions', {
                transactions: res.data
              })
            })
        }
      })
    }
  }
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.1s;
}
.page-enter, .page-leave-to /* .page-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.transaction-list-move,
.block-list-move {
  transition: transform 0.3s;
}

#content {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

#content a {
  color: #35495e;
  text-decoration: underline;
}
#content a:hover {
  text-decoration: none;
}
</style>
