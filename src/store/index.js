export const state = () => ({
  newBlock: { meta: {}, block: {} },
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
  }
}
