export const state = () => ({
  host: 'fushicho.48gh23s.xyz:3000',
  currentHeight: 0,
  newBlock: { meta: {}, block: {} }
})

export const getters = {
  url(state) {
    return `http://${state.host}`
  },
  ws(state) {
    return `ws://${state.host}/ws`
  },
  currentHeight(state) {
    return state.currentHeight
  },
  newBlock(state) {
    return state.newBlock
  }
}

export const mutations = {
  host(state, { host }) {
    state.host = host
  },
  currentHeight(state, { currentHeight }) {
    state.currentHeight = currentHeight
  },
  newBlock(state, { newBlock }) {
    state.currentHeight = newBlock.block.height
    state.newBlock = newBlock
  }
}

export const actions = {
  setHost({ commit }, { host }) {
    commit('host', { host })
  },
  setCurrentHeight({ commit }, { currentHeight }) {
    commit('currentHeight', { currentHeight })
  },
  setNewBlock({ commit }, { newBlock }) {
    commit('newBlock', { newBlock })
  }
}
