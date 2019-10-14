<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">nem2 blocks</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/blocks/0">Blocks</b-nav-item>
          <b-nav-item to="/statistics">Statistics</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-form-input
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
    ...mapGetters(['url', 'ws', 'currentHeight']),
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
      const host = this.validatedHost
      this.$store.dispatch('setHost', { host })
    },
    blockHandler(obj) {
      this.$store.dispatch('setNewBlock', { newBlock: obj })
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
    }
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
