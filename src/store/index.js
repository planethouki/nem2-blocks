export const state = () => ({
  newBlock: { meta: {}, block: {} },
  storage: {},
  transactions: [],
  latestBlocks: [],
  blockHeight: null
})

export const getters = {
  url() {
    return process.env.HREF_NODE_BASE_URL
  },
  blockHeight(state) {
    return state.blockHeight
  },
  newBlock(state) {
    return state.newBlock
  },
  storage(state) {
    return state.storage
  },
  blocks(state) {
    return state.latestBlocks
  },
  latestBlocks(state) {
    return state.latestBlocks
  },
  transactions(state) {
    return state.transactions
  }
}

export const mutations = {
  blockHeight(state, height) {
    state.blockHeight = height
  },
  newBlock(state, { newBlock }) {
    state.blockHeight = newBlock.block.height
    state.newBlock = newBlock
  },
  storage(state, { storage }) {
    state.storage = storage
  },
  addBlock(state, { block }) {
    const findIndex = state.latestBlocks.findIndex((b) => {
      return b.block.height === block.block.height
    })
    if (findIndex > -1) {
      state.latestBlocks.splice(findIndex, 1)
    }
    state.latestBlocks.push(block)
    state.latestBlocks.sort((a, b) => {
      return Number(b.block.height) - Number(a.block.height)
    })
  },
  addTransactions(state, { transactions }) {
    transactions.map((transaction) => {
      const findIndex = state.transactions.findIndex((t) => {
        return t.meta.hash === transaction.meta.hash
      })
      if (findIndex > -1) {
        state.transactions.splice(findIndex, 1)
      }
      state.transactions.push(transaction)
    })
    state.transactions.sort((a, b) => {
      return Number(b.meta.height) - Number(a.meta.height)
    })
  }
}
