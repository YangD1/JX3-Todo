<template>
  <v-layout>
    <v-flex lg6 offset-lg3 xs12 >
      <v-card class="card--flex-toolbar">
        <v-toolbar card prominent>
          <v-toolbar-title class="body-2 grey--text">Title</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>apps</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>

        <v-divider></v-divider>
        <v-list>
          <v-list-tile
            v-ripple
            v-for="(item,index) in $store.state.qiyu.qiyuList"
            :key="index"
            router
            :to="'#' + index"
          >
            <v-list-tile-content>item {{ index }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-card-text>
          do
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            flat
            nuxt
            to="/inspire"
          >Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  layout: 'views/default',
}
</script>
