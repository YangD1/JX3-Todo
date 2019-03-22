export const state = () => ({
  user: '',
  accounts: [
    { icon: require('~/assets/mp-icon/cangjian.png'), title: '藏剑', subtitle: '2018-9-22 3:20 pm', url: '/gaibang' },
    { icon: require('~/assets/mp-icon/gaibang.png'), title: '丐帮', subtitle: '2018-9-22 3:20 pm', url: '/cangjian' },
  ]
})
export const actions = {
  async nuxtServerInit({ commit, duspatch }, { req, app}){
    try {
      const { data } = await app.$axios.post('http://127.0.0.1:3344/verify')
      await commit('setUser', data.user)
    } catch (error) {
      await commit('setUser', '')
    }
  }
}
export const mutations = {
  setUser(state, data) {
    if (data) {
      state.user = data
    }
    console.log(state.user)
  },
  setAccount(state, data) {
    if(data){

    }
  }
}
