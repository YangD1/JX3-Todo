export const state = () => ({
  user: ''
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
  }
}
