<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">nem2 blocks</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="blocksLink">Blocks</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <div>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=planethouki&repo=nem2-blocks&type=star&count=true"
              frameborder="0"
              scrolling="0"
              width="100"
              height="20"
              title="GitHub"
            ></iframe>
          </div>
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
    await app.$api.$get('/chain/info').then(({ height }) => {
      store.commit('blockHeight', height)
    })
  },
  computed: {
    ...mapGetters(['url', 'blockHeight']),
    blocksLink() {
      return `/blocks/${Math.ceil(this.blockHeight / 100)}`
    }
  },
  mounted() {
    this.startWs()
  },
  destroyed() {
    this.finishWs()
  },
  methods: {
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
