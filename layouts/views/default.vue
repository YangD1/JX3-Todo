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
        <v-icon @click.stop="controlRightDrawer" large>cloud</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- base left navigation drawer -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      disable-route-watcher
      app
    >
      <v-list subheader>
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

    <leftNavigation
    :left="left"
    @backLeftBaseNav="backLeftBaseNav" />

    <!-- content -->
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <Message />

    <!-- mobile slide button -->
    <v-btn
      fixed
      dark
      fab
      bottom
      right
      color="error"
      @click="backToTop"
    >
      <v-icon>arrow_upward</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import rightNavigation from '~/components/skeleton/right-navigation-drawer'
import leftNavigation from '~/components/skeleton/left-navigation-drawer'
import Message from '~/components/common/message'
  export default {
    components:{
      rightNavigation,
      leftNavigation,
      Message
    },
    data() {
      return {
        drawer: false,
        drawerRight: false,
        left: false,
        urlItems: [
          { icon: 'pets', iconClass: 'blue white--text', title: '奇遇列表', subtitle: '2018-9-22 3:20 pm' },
        ],
        funcItems: [
          { icon: 'assignment', iconClass: 'amber white--text', title: '账号列表', subtitle: '2018-9-22 5:00 pm' }
        ]
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
      "$store.state.drawerRight": function(){
        this.drawerRight = this.$store.state.drawerRight
      }
    },
    methods: {
      // control left navigation drawer
      backLeftBaseNav(){
        this.left = false
      },
      // control right navigation
      controlRightDrawer(){
        this.$store.commit('drawerRight', !this.drawerRight)
      },
      backToTop(){
        var timer = null
        if(process.client){
          cancelAnimationFrame(timer);
          timer = requestAnimationFrame(function fn(){
              var oTop = document.body.scrollTop || document.documentElement.scrollTop;
              if(oTop > 0){
                  document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
                  timer = requestAnimationFrame(fn);
              }else{
                  cancelAnimationFrame(timer);
              }
          });
        }
      }
    },
    head:{
      title: 'JX3 Todo'
    },
    mounted(){
      this.drawerRight = this.$store.state.drawerRight
    }
  }
</script>
<style lang="stylus">
#odobody
.async-div
  padding 10px
.right-slide-tab
  .v-tabs__item--active
    font-size 16px
footer
  padding 10px
  color #545454 !important
</style>
