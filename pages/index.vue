<template>
  <div class="container-fluid">
    <b-table
      hover
      primary-key="Timestamp"
      :items="blocks"
      :tbody-transition-props="transProps"
    ></b-table>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      transProps: {
        // Transition name
        name: 'flip-list'
      },
      blocks: [],
      socket: null,
      host: 'elephant3.48gh23s.xyz:3000'
    }
  },
  computed: {
    url() {
      return `http://${this.host}`
    },
    ws() {
      return `ws://${this.host}/ws`
    }
  },
  mounted() {
    this.render()
    this.startWs()
  },
  destroyed() {
    this.finishWs()
  },
  methods: {
    blockHandler(b) {
      const copy = [
        {
          Height: b.block.height,
          Timestamp: b.block.timestamp,
          Harvester: b.block.signerPublicKey,
          '#TXes': b.meta.numTransactions,
          Fees: b.meta.totalFee
        },
        ...JSON.parse(JSON.stringify(this.blocks))
      ]
      this.blocks = copy.slice(0, 100)
    },
    startWs() {
      this.socket = new WebSocket(this.ws)
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
    render() {
      this.$axios
        .$get(`${this.url}/chain/height`)
        .then((height) => {
          const q = Math.floor((Number(height.height) - 1) / 100) * 100 + 1
          return this.$axios.$get(`${this.url}/blocks/${q}/limit/100`)
        })
        .then((blocks) => {
          this.blocks = blocks.map((b) => {
            return {
              Height: b.block.height,
              Timestamp: b.block.timestamp,
              Harvester: b.block.signerPublicKey,
              '#TXes': b.meta.numTransactions,
              Fees: b.meta.totalFee
            }
          })
        })
    },
    clear() {
      this.blocks = []
    }
  }
}
</script>

<style>
.flip-list-move {
  transition: transform 1s;
}
</style>
