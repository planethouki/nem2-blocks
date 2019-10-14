const host = (() => {
  if (window && window.sessionStorage) {
    const sessionStorageHost = window.sessionStorage.getItem('host')
    if (sessionStorageHost !== null) {
      return sessionStorageHost
    }
  }
  return 'fushicho.48gh23s.xyz:3000'
})()

export const state = () => ({
  host,
  newBlock: { meta: {}, block: {} },
  storage: {}
})

export const getters = {
  url(state) {
    return `http://${state.host}`
  },
  ws(state) {
    return `ws://${state.host}/ws`
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
  }
}

export const actions = {
  setHost({ commit }, { host }) {
    commit('host', { host })
    if (window && window.sessionStorage) {
      window.sessionStorage.setItem('host', host)
    }
  },
  setNewBlock({ commit }, { newBlock }) {
    commit('newBlock', { newBlock })
  },
  setStorage({ commit }, { storage }) {
    commit('storage', { storage })
  }
}
