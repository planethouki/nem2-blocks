export const state = () => ({
  blocksAscCache: {}
})

export const getters = {
  has: (state) => (pageNumber) => {
    return !!state.blocksAscCache[pageNumber]
  },
  getBlocks: (state) => (pageNumber) => {
    return state.blocksAscCache[pageNumber] || null
  }
}

export const mutations = {
  setBlocks(state, { pageNumber, blocks }) {
    state.blocksAscCache[pageNumber] = blocks.sort((a, b) => {
      return Number(b.block.height) - Number(a.block.height)
    })
  },
  addBlocks(state, { pageNumber, blocks }) {
    blocks.map((block) => {
      const stateBlocks = state.blocksAscCache[pageNumber]
      const findIndex = stateBlocks.findIndex((b) => {
        return b.block.height === block.block.height
      })
      if (findIndex > -1) {
        stateBlocks.splice(findIndex, 1)
      }
      stateBlocks.push(block)
      stateBlocks.sort((a, b) => {
        return Number(b.block.height) - Number(a.block.height)
      })
      state.blocksAscCache[pageNumber] = stateBlocks
    })
  }
}
