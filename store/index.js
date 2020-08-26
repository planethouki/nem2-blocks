export const state = () => ({
  newBlock: { meta: {}, block: {} },
  storage: {},
  transactions: [],
  blocks: []
})

export const getters = {
  url() {
    return process.env.HREF_NODE_BASE_URL
  },
  currentHeight(state) {
    if (state.newBlock.block.height !== undefined) {
      return state.newBlock.block.height
    } else if (state.storage.numBlocks !== undefined) {
      return state.storage.numBlocks
    } else {
      return 0
    }
  },
  newBlock(state) {
    return state.newBlock
  },
  storage(state) {
    return state.storage
  },
  blocks(state) {
    return state.blocks
  },
  transactions(state) {
    return state.transactions
  }
}

export const mutations = {
  newBlock(state, { newBlock }) {
    state.currentHeight = newBlock.block.height
    state.newBlock = newBlock
  },
  storage(state, { storage }) {
    state.storage = storage
  },
  blocks(state, { blocks }) {
    state.blocks = blocks
  },
  addBlock(state, { block }) {
    const findIndex = state.blocks.findIndex((b) => {
      return b.block.height === block.block.height
    })
    if (findIndex > -1) {
      state.blocks.splice(findIndex, 1, block)
    } else {
      state.blocks = [block, ...state.blocks]
    }
    state.blocks.sort((a, b) => {
      return b.block.height - a.block.height
    })
  },
  transactions(state, { transactions }) {
    state.transactions = transactions
  },
  prependTransactions(state, { transactions }) {
    state.transactions = [...transactions, ...state.transactions]
  }
}

export const actions = {
  setStorage({ commit }, { storage }) {
    commit('storage', { storage })
  }
}
