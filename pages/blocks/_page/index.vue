<template>
  <div class="container-fluid">
    <b-table
      hover
      small
      primary-key="hash"
      :fields="fields"
      :items="blockItems"
      :tbody-transition-props="transProps"
    >
      <template v-slot:cell(block.height)="data">
        <a :href="`${url}/block/${data.value}`" target="_blank">{{
          data.value
        }}</a>
      </template>
      <template v-slot:cell(block.signerPublicKey)="data">
        <a :href="`${url}/account/${data.value}`" target="_blank">{{
          data.value
        }}</a>
      </template>
      <template v-slot:cell(meta.numTransactions)="data">
        <a
          :href="`${url}/block/${data.item.block.height}/transactions`"
          target="_blank"
        >
          {{ data.value }}
        </a>
      </template>
      <template v-slot:cell(meta.totalFee)="data">
        <span>{{ $formatter.intPart(data.value) }}</span
        >.<span class="small">{{ $formatter.fracPart(data.value) }}</span>
      </template>
      <template v-slot:cell(meta.numStatements)="data">
        <a
          :href="`${url}/block/${data.item.block.height}/receipts`"
          target="_blank"
        >
          {{ data.value }}
        </a>
      </template>
    </b-table>
    <b-button :disabled="prevBtnDisabled" @click="prevBtnClick"
      >Previous</b-button
    >
    <b-button :disabled="nextBtnDisabled" @click="nextBtnClick">Next</b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  validate({ params }) {
    return /^\d+$/.test(params.page)
  },
  data() {
    return {
      transProps: {
        name: 'block-list'
      },
      blocks: [],
      fields: [
        { key: 'block.height', label: 'Height' },
        {
          key: 'block.timestamp',
          label: 'Timestamp',
          class: 'd-none d-sm-table-cell',
          formatter: this.$formatter.catapultTime
        },
        {
          key: 'block.signerPublicKey',
          label: 'Harvester',
          tdClass: 'text-monospace',
          class: 'd-none d-lg-table-cell'
        },
        { key: 'meta.numTransactions', label: '#TXes' },
        { key: 'meta.numStatements', label: 'Stmts' },
        { key: 'meta.totalFee', label: 'Fees' },
        { key: 'block.feeMultiplier', label: 'Fee mul' }
      ]
    }
  },
  computed: {
    ...mapGetters(['url', 'ws', 'currentHeight']),
    prevBtnDisabled() {
      return (
        Math.ceil(this.currentHeight / 100) === Number(this.$route.params.page)
      )
    },
    nextBtnDisabled() {
      return this.$route.params.page === '1'
    },
    blockItems() {
      return this.blocks.map((b) => {
        return {
          ...b,
          hash: b.meta.hash
        }
      })
    }
  },
  mounted() {
    document.addEventListener('keyup', this.arrowKeyHandler)
    this.render()
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'newBlock') {
        this.$nextTick(() => {
          this.blockHandler(mutation.payload.newBlock)
        })
      }
    })
  },
  destroyed() {
    document.removeEventListener('keyup', this.arrowKeyHandler)
  },
  methods: {
    prevBtnClick() {
      if (this.prevBtnDisabled) return
      const page = Number(this.$route.params.page) + 1
      this.$router.push(`/blocks/${page}`)
    },
    nextBtnClick() {
      if (this.nextBtnDisabled) return
      const page = Number(this.$route.params.page) - 1
      this.$router.push(`/blocks/${page}`)
    },
    arrowKeyHandler(event) {
      if (event.key === 'ArrowLeft') {
        this.prevBtnClick()
      } else if (event.key === 'ArrowRight') {
        this.nextBtnClick()
      }
    },
    blockHandler(b) {
      this.$axios.$get(`${this.url}/blocks/${b.block.height}`).then((res) => {
        if (this.$route.params.page === '1') {
          const copy = [res, ...JSON.parse(JSON.stringify(this.blocks))]
          this.blocks = copy.slice(0, 100)
        }
      })
    },
    render() {
      const params = new URLSearchParams()
      params.append('pageSize', 100)
      params.append('order', 'desc')
      params.append('pageNumber', this.$route.params.page)
      this.$axios
        .$get(`${this.url}/blocks?${params.toString()}`)
        .then((res) => {
          this.blocks = res.data
        })
    },
    clear() {
      this.blocks = []
    },
    floor100(h) {
      return Math.floor((Number(h) - 1) / 100) * 100 + 1
    }
  }
}
</script>

<style>
.block-list-move {
  transition: transform 1s;
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
