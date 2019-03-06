<template>
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
      v-if="logined == false"
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
            @keyup.native.enter="login"
            v-model="account.email"
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="account.password"
            @keyup.native.enter="login"
            required
          ></v-text-field>
          <div class="text-xs-center">
            <v-btn color="#0277BD" dark @click.native.prevent="login">登录</v-btn>
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
    <!-- async element -->
    <div
      class="async-div text-xs-center"
      v-if="logined == true">
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
      <v-btn
      color="error"
      @click="logout">
        <v-icon>power_settings_new</v-icon>
        <span>  登出</span>
      </v-btn>
    </div>
    <!-- dialog with async -->
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
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    account: {
      email: '',
      password: ''
    },
    logined: false,
    dialog: false
  }),
  props: {
    drawerRight: {
      type: Boolean
    },
  },
  methods: {

    register(){
      if( !this.account.email || !this.account.password ){
        this.$store.commit('snackbar/Message', { message: '账号密码不能为空', type: 'error' })
        return
      }

      this.$axios.post( this.$store.state.api.register, this.account ).then(( response )=>{
        this.login()
      }).catch(( error )=>{
        console.error({ message: error.response.data.message })
      })
    },

    login(){
      let message
      if( !this.account.email || !this.account.password ){
        this.$store.commit('snackbar/Message', { message: '账号密码不能为空', type: 'error' })
        return
      }
      this.$axios.post( 'http://127.0.0.1:2233/api/login', this.account ).then(( response ) => {
        this.$store.commit('snackbar/Message', response.data)
        this.logined = true
      }).catch(( error )=>{
        if(error.response.data.message){
          message = error.response.data.message
        }else{
          message = error.response.data
        }
        this.$store.commit('snackbar/Message', { type: 'error',  ...message})
      })
    },

    logout(){
      this.$axios.post( 'http://127.0.0.1:2233/api/logout' ).then((response) => {
        //
      })
      .catch((error) => {
        //
      })
    },
  },
  watch: {
    dialog (val) {
      if (!val) return
      setTimeout(() => (this.dialog = false), 4000)
    },
  },
  updated() {
    console.log(this.logined)
  },
  mounted() {
    if(this.$store.state.user && JSON.stringify(this.$store.state.user) == '{}'){
      this.logined = false
    }else{
      this.logined = true
    }
  },
}
</script>

<style>

</style>
