<template>
  <div class="container-fluid">
    <div class="mb-2">
      <b-button :disabled="newBtnDisabled" size="sm" @click="newBtnClick"
        >New (Left Key)</b-button
      >
      <b-button :disabled="oldBtnDisabled" size="sm" @click="oldBtnClick"
        >Old (Right Key)</b-button
      >
    </div>
    <b-table
      show-empty
      hover
      small
      primary-key="hash"
      :fields="fields"
      :items="blockItems"
      :tbody-transition-props="transProps"
    >
      <template v-slot:cell(block.height)="data">
        <a :href="`${url}/blocks/${data.value}`" target="_blank">{{
          data.value
        }}</a>
      </template>
      <template v-slot:cell(block.signerPublicKey)="data">
        <a :href="`${url}/accounts/${data.value}`" target="_blank">{{
          data.value
        }}</a>
      </template>
      <template v-slot:cell(meta.transactionsCount)="data">
        <a
          :href="
            `${url}/transactions/confirmed?height=${data.item.block.height}`
          "
          target="_blank"
        >
          {{ data.value }}
        </a>
      </template>
      <template v-slot:cell(meta.totalFee)="data">
        <span>{{ $formatter.intPart(data.value) }}</span
        >.<span class="small">{{ $formatter.fracPart(data.value) }}</span>
      </template>
      <template v-slot:cell(meta.statementsCount)="data">
        <a
          :href="`${url}/block/${data.item.block.height}/receipts`"
          target="_blank"
        >
          {{ data.value }}
        </a>
      </template>
      <template v-slot:empty="scope">
        <div class="text-center">
          <b-spinner type="grow" label="Spinning"></b-spinner>
        </div>
      </template>
    </b-table>
    <b-button :disabled="newBtnDisabled" @click="newBtnClick">New</b-button>
    <b-button :disabled="oldBtnDisabled" @click="oldBtnClick">Old</b-button>
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
        { key: 'meta.transactionsCount', label: '#TXes' },
        { key: 'meta.statementsCount', label: 'Stmts' },
        { key: 'meta.totalFee', label: 'Fees' },
        { key: 'block.feeMultiplier', label: 'Fee mul' }
      ],
      storeSubscription: null,
      blocks: []
    }
  },
  computed: {
    ...mapGetters({
      url: 'url',
      getBlocksCache: 'blocksPage/getBlocks',
      hasBlocksCache: 'blocksPage/has',
      chainHeight: 'blockHeight'
    }),
    newBtnDisabled() {
      return this.chainHeight === 0
        ? true
        : Math.ceil(this.chainHeight / 100) === Number(this.$route.params.page)
    },
    oldBtnDisabled() {
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
    this.storeSubscription = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'addBlock') {
        const block = mutation.payload.block
        this.$store.commit('blocksPage/addBlocks', {
          pageNumber: Math.ceil(Number(block.block.height) / 100),
          blocks: [mutation.payload.block]
        })
      }
    })
  },
  destroyed() {
    document.removeEventListener('keyup', this.arrowKeyHandler)
    if (this.storeSubscription) this.storeSubscription()
  },
  methods: {
    newBtnClick() {
      if (this.newBtnDisabled) return
      const page = Number(this.$route.params.page) + 1
      this.$router.push(`/blocks/${page}`)
    },
    oldBtnClick() {
      if (this.oldBtnDisabled) return
      const page = Number(this.$route.params.page) - 1
      this.$router.push(`/blocks/${page}`)
    },
    arrowKeyHandler(event) {
      if (event.key === 'ArrowLeft') {
        this.newBtnClick()
      } else if (event.key === 'ArrowRight') {
        this.oldBtnClick()
      }
    },
    async render() {
      const pageSize = 100
      const pageNumber = Number(this.$route.params.page)
      if (!this.hasBlocksCache(pageNumber)) {
        const params = new URLSearchParams()
        params.append('pageSize', pageSize.toString())
        params.append('order', 'asc')
        params.append('pageNumber', pageNumber.toString())
        const { data } = await this.$cachedApi.$get(
          `/blocks?${params.toString()}`
        )
        this.$store.commit('blocksPage/setBlocks', {
          blocks: data,
          pageNumber
        })
      }
      const cachedBlocks = this.getBlocksCache(pageNumber)
      this.blocks = cachedBlocks
      const { fromHeight, toHeight } = this.calcMissBlocks(
        pageNumber,
        cachedBlocks,
        this.chainHeight
      )
      const blockPromises = []
      for (let h = fromHeight; h <= toHeight; h++) {
        blockPromises.push(this.$cachedApi.$get(`/blocks/${h}`))
      }
      const blocks = await Promise.all(blockPromises)
      this.$store.commit('blocksPage/addBlocks', {
        blocks,
        pageNumber
      })
    },
    calcMissBlocks(pageNumber, cachedBlocks, chainHeight) {
      const totalPages = Math.ceil(chainHeight / 100)
      const maxCachedHeight = cachedBlocks.reduce((accumulator, block) => {
        return accumulator < Number(block.block.height)
          ? Number(block.block.height)
          : accumulator
      }, 0)
      if (pageNumber === totalPages) {
        if (maxCachedHeight !== chainHeight) {
          return {
            fromHeight: maxCachedHeight,
            toHeight: chainHeight
          }
        }
      } else if (cachedBlocks.length < 100) {
        return {
          fromHeight: maxCachedHeight,
          toHeight: pageNumber * 100
        }
      }
      return { fromHeight: 0, toHeight: -1 }
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
