<template>
  <v-navigation-drawer
    v-model="left"
    fixed
  >
  <v-list>
    <v-list-tile
      v-for="item in $store.state.accounts"
      :key="item.title"
      router
      nuxt
      :to="item.url"
      avatar
    >
      <v-list-tile-avatar>
        <img :src="item.icon">
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-btn icon ripple>
          <v-icon color="grey lighten-1">info</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
    <div class="text-xs-center left-nav">
    <v-alert
      :value="true"
      color="#f1f1f1"
    >
      <v-btn color="#4caf50" dark @click="$emit('backLeftBaseNav')">添加账号</v-btn>
      <v-btn @click="$emit('backLeftBaseNav')">返回</v-btn>
    </v-alert>
    </div>
  </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    left: {
      type: Boolean
    }
  }
}
</script>

<style lang="stylus" scoped>
.left-nav
  position absolute
  bottom 30px
  left 0
  width 100%
</style>
