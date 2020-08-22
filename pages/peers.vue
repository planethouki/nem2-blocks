<template>
  <div class="container-fluid">
    <b-table
      responsive
      hover
      small
      primary-key="publicKey"
      :items="peers"
      :fields="fields"
    >
      <template v-slot:cell(publicKey)="data">
        <a
          :href="`${url}/accounts/${data.value}`"
          target="_blank"
          class="text-monospace"
        >
          {{ data.value }}
        </a>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  data() {
    return {
      peers: [],
      fields: [
        { key: 'friendlyName', label: 'Name' },
        { key: 'host' },
        { key: 'port' },
        { key: 'version', label: 'Ver' },
        { key: 'roles' },
        { key: 'networkIdentifier', label: 'NW' },
        { key: 'publicKey', label: 'Public Key' }
      ]
    }
  },
  computed: {
    ...mapGetters(['url'])
  },
  mounted() {
    this.get()
    this.$store.subscribe((mutation, state) => {
      if (
        mutation.type === 'newBlock' &&
        state.newBlock.block.height !== undefined
      ) {
        this.$nextTick(() => {
          this.get()
        })
      }
    })
  },
  destroyed() {},
  methods: {
    get() {
      Promise.all([
        this.$axios.$get(`${this.url}/node/info`),
        this.$axios.$get(`${this.url}/node/peers`)
      ]).then(([info, peers]) => {
        this.peers = [
          {
            ...info,
            _rowVariant: 'primary'
          },
          ...peers
        ]
      })
    }
  }
}
</script>

<style scoped>
a {
  color: #35495e;
  text-decoration: underline;
}
a:hover {
  text-decoration: none;
}
.card {
  margin-top: 1rem;
}
</style>
