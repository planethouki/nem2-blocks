<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">nem2 blocks</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="blocksLink">Blocks</b-nav-item>
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
  async middleware({ app, store }) {
    await app.$api.$get('/chain/height').then(({ height }) => {
      store.commit('blockHeight', height)
    })
  },
  computed: {
    ...mapGetters(['url', 'blocks', 'blockHeight']),
    blocksLink() {
      return `/blocks/${Math.ceil(this.blockHeight / 100)}`
    }
  },
  mounted() {
    this.startWs()
    this.getStorage()
    this.getLatestBlocks()
  },
  destroyed() {
    this.finishWs()
  },
  methods: {
    getStorage() {
      this.$api.$get(`/node/storage`).then((res) => {
        this.$store.commit('storage', { storage: res })
      })
    },
    getLatestBlocks() {
      const toBlock = this.blockHeight
      const fromBlock = toBlock - 10
      for (let h = fromBlock; h <= toBlock; h++) {
        this.$cachedApi.$get(`/blocks/${h}`).then((block) => {
          this.$store.commit('addBlock', { block })
          if (block.meta.numTransactions === 0) {
            return
          }
          const params = new URLSearchParams()
          params.append('height', block.block.height)
          params.append('pageSize', '100')
          return this.$cachedApi
            .$get(`/transactions/confirmed?${params.toString()}`)
            .then((res) => {
              this.$store.commit('addTransactions', { transactions: res.data })
            })
        })
      }
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
      this.$store.commit('newBlock', { newBlock })
      this.$cachedApi.$get(`/blocks/${newBlock.block.height}`).then((block) => {
        this.$store.commit('addBlock', { block })
        if (block.meta.numTransactions === 0) {
          return
        }
        const transactionsParams = new URLSearchParams()
        transactionsParams.append('height', block.block.height)
        transactionsParams.append('pageSize', '100')
        return this.$cachedApi
          .$get(`/transactions/confirmed?${transactionsParams.toString()}`)
          .then((res) => {
            this.$store.commit('addTransactions', {
              transactions: res.data
            })
          })
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
