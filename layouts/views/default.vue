<template>
  <v-app id="todobody">
    <!-- base right navigation drawer -->
    <rightNavigation
    :drawerRight="drawerRight" />
    <!-- header toolbar -->
    <v-toolbar
      fixed
      app
      clipped-right
      dark
      color="primary"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Todo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        large>
        <v-icon @click.stop="drawerRight = !drawerRight" large>cloud</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- base left navigation drawer -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      disable-route-watcher
      app
    >
      <v-list dense>
        <v-list-tile
          v-for="item in urlItems"
          :key="item.title"
          router
          nuxt
          to="/"
          avatar
        >
        <v-list-tile-avatar>
          <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <h3>
            {{ item.title }}
          </h3>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile
        v-for="item in funcItems"
        :key="item.title"
        @click.stop="left = !left"
        avatar
      >
        <v-list-tile-avatar>
          <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <h3>{{ item.title }}</h3>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>

        <v-list-tile @click.stop="left = !left" disabled>
          <v-list-tile-action>
            <v-icon>perm_data_setting</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title style="font-size: 14px">参与项目</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- left navigation drawer -->
    <v-navigation-drawer
      v-model="left"
      temporary
      fixed
    >
    <v-list>
      <v-list-tile
        v-for="item in accountItems"
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
    </v-navigation-drawer>

    <!-- content -->
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <Message />

    <!-- mobile slide button -->
    <v-btn
      class="hidden-lg-and-up"
      fixed
      dark
      fab
      bottom
      right
      color="pink"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <!-- footer -->
    <v-footer
      class="hidden-md-and-down"
      light
      app>
      <span>By - <a href="https://github.com/enkeyi" target="_blank">Enkeyi</a></span>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import rightNavigation from '~/components/skeleton/right-navigation-drawer'
import Message from '~/components/common/message'
  export default {
    components:{
      rightNavigation, Message
    },
    data: () => ({
      drawer: false,
      drawerRight: false,
      left: false,
      urlItems: [
        { icon: 'pets', iconClass: 'blue white--text', title: '奇遇列表', subtitle: '2018-9-22 3:20 pm' },
      ],
      funcItems: [
        { icon: 'assignment', iconClass: 'amber white--text', title: '账号列表', subtitle: '2018-9-22 5:00 pm' }
      ],
      accountItems: [
        { icon: require('~/assets/mp-icon/cangjian.png'), title: '藏剑', subtitle: '2018-9-22 3:20 pm', url: '/gaibang' },
        { icon: require('~/assets/mp-icon/gaibang.png'), title: '丐帮', subtitle: '2018-9-22 3:20 pm', url: '/cangjian' },
      ],
    }),
    methods: {
      mountedMessage(){
        let message = {}
        if( this.$store.state.user && JSON.stringify(this.$store.state.user) != '{}' ){
          message = {
            type: 'success',
            message: '欢迎回来'
          }
        }else{
          message = {
            type: 'warning',
            message: '请重新登录'
          }
        }
        this.$store.commit('snackbar/Message', message)
      }
    },
    props: {
      source: String
    },
    watch: {
      $route: function(){
        this.left = false
        this.drawer = false
        this.drawerRight = false
      },
    },
    head:{
      title: 'JX3 Todo'
    },
    mounted() {
      // show message
      this.mountedMessage()
    },
  }
</script>
<style lang="stylus">
#odobody
  .v-navigation-drawer > .v-list .v-list__tile
    margin 10px
  .v-avatar img
    height auto
    width auto
.async-div
  padding 10px
.right-slide-tab
  .v-tabs__item--active
    font-size 16px
footer
  padding 10px
  color #545454 !important
</style>
