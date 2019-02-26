<template>
  <v-app id="todobody">
    <!-- base right navigation drawer -->
    <v-navigation-drawer
      v-model="drawerRight"
      fixed
      right
      clipped
      disable-route-watcher
      app
    >
    <!-- right slide tab -->
      <v-tabs
        class="right-slide-tab"
        centered
        color="primary"
        slider-color="yellow"
        dark>
        <v-tab
          ripple
        >
        登录
        </v-tab>
        <v-tab
          ripple
        >
        注册
        </v-tab>
        <v-tab-item>
          <v-card style="padding: 10px 20px" flat>
            <v-text-field
              label="Email"
              autofocus
              required
              v-model="account.email"
            ></v-text-field>
            <v-text-field
              label="Password"
              type="password"
              v-model="account.password"
              required
            ></v-text-field>
            <div class="text-xs-center">
              <v-btn color="#0277BD" dark @click="login">登录</v-btn>
            </div>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card style="padding: 10px 20px" flat>
            <v-text-field
              label="Email"
              v-model="account.email"
              required
            ></v-text-field>
            <v-text-field
              label="Password"
              type="password"
              v-model="account.password"
              required
            ></v-text-field>
            <div class="text-xs-center">
              <v-btn color="#30a91a" dark @click="register">注册</v-btn>
            </div>
          </v-card>
        </v-tab-item>
      </v-tabs>
      <div class="async-div text-xs-center">
        <v-btn
          :disabled="dialog"
          :loading="dialog"
          class="white--text"
          color="primary"
          @click="dialog = true"
        >
        <v-icon>sync</v-icon>
        <span> 同步</span>
        </v-btn>
        <v-dialog
          v-model="dialog"
          hide-overlay
          persistent
          width="300"
        >
          <v-card
            color="primary"
            dark
          >
            <v-card-text>
              正在同步...
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </v-navigation-drawer>

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

    <!-- snackbar -->
    <v-snackbar
      :top="true"
      :color="snackbar.color"
      v-model="snackbar.state"
    >
      {{ snackbar.message }}
      <v-btn
        color="#cccccc"
        flat
        @click="snackbar.state = false"
      >
        ×
      </v-btn>
    </v-snackbar>
    <!-- footer -->
    <v-footer
      light
      app>
      <span>By - <a href="https://github.com/enkeyi" target="_blank">Enkeyi</a></span>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      drawerRight: false,
      account: {email: '', password: ''},
      left: false,
      dialog: false,
      snackbar: {state: false, message: 'Default info.'},
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
      message({message, type}){
        this.snackbar.message = message
        this.snackbar.state = true
        switch (type) {
          case 'success':
            this.snackbar.color = 'rgb(48, 169, 26)'
            break;
          case 'error':
            this.snackbar.color = '#F44336'
            break;
          default:
            this.snackbar.color = '#FFFFFF'
            break;
        }
      },
      register(){
        this.$axios.post( this.$store.state.api.register, this.account ).then(( response )=>{
          this.message({
            message: response.data.message,
            type: 'success'
          })
          // do login
        }).catch(( error )=>{
          this.message({
            message: error.response.data.message,
            type: 'error'
          })
        })
      },

      login(){
        this.$axios.post( 'http://127.0.0.1:2233/api/login', this.account ).then(( response ) => {
          this.message({
            message: response.data.message,
            type: response.data.type
          })
        }).catch(( error )=>{
          this.message({
            message: error.response.data.message,
            type: 'error'
          })
        })
      }
    },
    props: {
      source: String
    },
    watch: {
      dialog (val) {
        if (!val) return
        setTimeout(() => (this.dialog = false), 4000)
      },
      '$route': function(){
        this.left = false
        this.drawer = false
        this.drawerRight = false
      },
    },
    head:{
      title: 'JX3 Todo'
    },
    mounted() {
     this.$axios.post('http://127.0.0.1:3344/verify')
      .then(response => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error.response.data)
      })
    },
  }
</script>
<style lang="stylus">
#todobody
  .v-navigation-drawer > .v-list .v-list__tile
    margin 10px
  .v-avatar img
    height auto
    width auto
.right-slide-tab
  .v-tabs__item--active
    font-size 16px
footer
  padding 10px
  color #545454 !important
</style>
