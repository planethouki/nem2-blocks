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

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-form-input
            id="input-host"
            v-model="inputHost"
            size="sm"
            class="mr-sm-2"
            placeholder="Host"
          ></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" @click="changeHost"
            >Host</b-button
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <nuxt />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  data() {
    return {
      socket: null,
      inputHost: ''
    }
  },
  computed: {
    ...mapGetters(['url', 'ws']),
    validatedHost() {
      const a1 = this.inputHost
      const a2 = a1.trim()
      const a4 = a2.replace('http://', '')
      const a7 = a4.replace('https://', '')
      const a10 = a7.endsWith('/') ? a7.substr(0, a7.length - 1) : a7
      return a10
    }
  },
  mounted() {
    this.inputHost = this.$store.state.host
    this.startWs()
    this.getChain()
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'host') {
        this.$nextTick(() => {
          this.finishWs()
          this.startWs()
        })
      }
    })
  },
  destroyed() {
    this.finishWs()
  },
  methods: {
    changeHost() {
      this.$store.dispatch('setInfoHostChange', {
        infoHostChange: {
          host: this.validatedHost,
          redirectPath: this.$router.currentRoute.fullPath
        }
      })
      this.$router.push('/host')
    },
    getChain() {
      this.$axios.$get(`${this.url}/node/storage`).then((res) => {
        this.$store.dispatch('setStorage', { storage: res })
      })
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
    blockHandler(obj) {
      this.$store.dispatch('setNewBlock', { newBlock: obj })
      this.getChain()
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
</style>
