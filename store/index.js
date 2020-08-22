const host = (() => {
  if (window && window.sessionStorage) {
    const sessionStorageHost = window.sessionStorage.getItem('host')
    if (sessionStorageHost !== null) {
      return sessionStorageHost
    }
  }
  return process.env.NODE_URL
})()

export const state = () => ({
  host,
  newBlock: { meta: {}, block: {} },
  storage: {},
  infoHostChange: {
    host: null,
    redirectPah: null
  },
  transactions: [],
  blocks: []
})

export const getters = {
  host(state) {
    return state.host
  },
  url(state) {
    return `${location.protocol}//${state.host}`
  },
  ws(state) {
    return `${location.protocol.replace('http', 'ws')}//${state.host}/ws`
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
  host(state, { host }) {
    state.host = host
  },
  newBlock(state, { newBlock }) {
    state.currentHeight = newBlock.block.height
    state.newBlock = newBlock
  },
  storage(state, { storage }) {
    state.storage = storage
  },
  infoHostChange(state, { infoHostChange }) {
    state.infoHostChange = infoHostChange
  },
  blocks(state, { blocks }) {
    state.blocks = blocks
  },
  prependBlock(state, { block }) {
    state.blocks = [block, ...state.blocks]
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
