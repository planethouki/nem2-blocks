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
  }
})

export const getters = {
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
  deleteNewBlock({ commit }) {
    commit('newBlock', { newBlock: { meta: {}, block: {} } })
  },
  setStorage({ commit }, { storage }) {
    commit('storage', { storage })
  },
  deleteStorage({ commit }) {
    commit('storage', { storage: {} })
  },
  setInfoHostChange({ commit }, { infoHostChange }) {
    commit('infoHostChange', { infoHostChange })
  },
  deleteInfoHostChange({ commit }) {
    commit('infoHostChange', {
      infoHostChange: {
        host: null,
        redirectPah: null
      }
    })
  }
}
