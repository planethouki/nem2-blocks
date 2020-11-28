<template>
  <div class="row no-gutters">
    <div
      v-for="data in topCardList"
      :key="data.key"
      class="col col-12 col-sm-6 col-md-4"
    >
      <div class="card m-3">
        <div
          class="card-body d-flex justify-content-between align-items-center"
        >
          <font-awesome-icon :icon="data.icon" style="font-size: 3rem;" />
          <div class="text-right">
            <div class="text-muted">{{ data.title }}</div>
            <div v-if="storage[data.key]" class="h4">
              {{ storage[data.key] }}
            </div>
            <div v-else>
              <b-spinner type="grow" label="Spinning"></b-spinner>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StorageCardList',
  props: {
    storage: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      topCardList: [
        {
          key: 'numBlocks',
          title: 'Height',
          icon: 'cube'
        },
        {
          key: 'numTransactions',
          title: 'Transactions',
          icon: 'scroll'
        },
        {
          key: 'numAccounts',
          title: 'Accounts',
          icon: 'user'
        }
      ]
    }
  }
}
</script>
