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
    return /^\d+$/.test(params.height)
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
      const height100 = this.floor100(this.$route.params.height)
      return Number(this.$route.params.height) === 0 ? false : height100 === 1
    },
    nextBtnDisabled() {
      const currentHeight100 = this.floor100(this.currentHeight)
      const height100 = this.floor100(this.$route.params.height)
      return Number(this.$route.params.height) === 0
        ? true
        : currentHeight100 === height100
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
      const currentHeight100 = this.floor100(this.currentHeight)
      const height100 = this.floor100(this.$route.params.height)
      if (Number(this.$route.params.height) === 0) {
        this.$router.push(`/blocks/${currentHeight100 - 100}`)
      } else if (height100 !== 1) {
        this.$router.push(`/blocks/${height100 - 100}`)
      }
    },
    nextBtnClick() {
      if (this.nextBtnDisabled) return
      const currentHeight100 = this.floor100(this.currentHeight)
      const height100 = this.floor100(this.$route.params.height)
      if (height100 === 0) {
        this.$router.push(`/blocks/${currentHeight100}`)
      } else if (currentHeight100 !== height100) {
        this.$router.push(`/blocks/${height100 + 100}`)
      }
    },
    arrowKeyHandler(event) {
      if (event.key === 'ArrowLeft') {
        this.prevBtnClick()
      } else if (event.key === 'ArrowRight') {
        this.nextBtnClick()
      }
    },
    blockHandler(b) {
      this.$axios.$get(`${this.url}/block/${b.block.height}`).then((res) => {
        const currentHeight100 = this.floor100(this.currentHeight)
        const height100 = this.floor100(this.$route.params.height)
        if (
          this.$route.params.height === '0' ||
          currentHeight100 === height100
        ) {
          const copy = [res, ...JSON.parse(JSON.stringify(this.blocks))]
          this.blocks = copy.slice(0, 100)
        }
      })
    },
    render() {
      this.$axios
        .$get(`${this.url}/chain/height`)
        .then((res) => {
          const q = this.floor100(
            this.$route.params.height === '0'
              ? res.height
              : this.$route.params.height
          )
          return this.$axios.$get(`${this.url}/blocks/${q}/limit/100`)
        })
        .then((blocks) => {
          this.blocks = blocks
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
