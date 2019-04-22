<template>
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
  </v-list>
</template>

<script>
export default {

}
</script>

<style>

</style>
