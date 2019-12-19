import Vue from 'vue'
import { formatDistance, addMilliseconds } from 'date-fns'

Vue.prototype.$formatter = {
  fracPart(absoluteXem) {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 6 })
      .format((absoluteXem % 1000000) / 1000000)
      .substr(2)
  },
  intPart(absoluteXem) {
    return Math.floor(absoluteXem / 1000000).toString()
  },
  catapultTime(str) {
    return new Date(Number(str) + 1573430400000).toISOString()
  },
  catapultTimeDiff(str) {
    return Date.now() - Number(str) - 1573430400000
  },
  timePass(ms) {
    return formatDistance(addMilliseconds(new Date(), ms), new Date(), {
      includeSeconds: true
    })
  },
  txType(intType) {
    const types = {
      16708: 'Metadata Account',
      16720: 'Restriction Account',
      16976: 'Restriction Mosaic',
      17232: 'Restriction Operation',
      16974: 'Address Alias',
      16961: 'Aggregate Bonded',
      16705: 'Aggregate Complete',
      16716: 'Account Link',
      16712: 'Hash Lock',
      16725: 'Modify Multisig',
      16977: 'Mosaic Restriction',
      17230: 'Mosaic Alias',
      16717: 'Mosaic Definition',
      16964: 'Metadata Mosaic',
      16973: 'Mosaic Supply Change',
      17220: 'Metadata Namespace',
      16718: 'Register Namespace',
      16722: 'Secret Lock',
      16978: 'Secret Proof',
      16724: 'Transfer'
    }
    return types[intType]
  }
}
