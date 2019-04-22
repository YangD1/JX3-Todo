<template>
  <v-navigation-drawer
    v-model="left"
    fixed
  >
  <LeftAccountsList v-show='!toggleAcc' />
  <LeftAddAccount v-show='toggleAcc' />
  <div class="text-xs-center left-nav">
    <v-alert
      :value="true"
      color="#f1f1f1"
    >
      <v-btn color="#4caf50" dark @click="toggleAcc = !toggleAcc">{{ toggleAcc ? '查看账号' : '添加账号' }}</v-btn>
      <v-btn @click="$emit('backLeftBaseNav')">返回</v-btn>
    </v-alert>
  </div>
  </v-navigation-drawer>
</template>

<script>
import LeftAccountsList from '~/components/skeleton/left-navigation-accounts-list'
import LeftAddAccount from '~/components/skeleton/left-navigation-add-account'
export default {
  data(){
    return {
      toggleAcc: false
    }
  },
  props: {
    left: {
      type: Boolean
    }
  },
  components: {
    LeftAccountsList,
    LeftAddAccount
  }
}
</script>

<style lang="stylus" scoped>
.left-nav
  position absolute
  bottom 0
  left 0
  width 100%
</style>
