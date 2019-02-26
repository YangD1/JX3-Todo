import axios from 'axios'
export const state = () => ({})
export const actions = {
  async nuxtServerInit({ commit, duspatch }, { req }){
    if ( req.headers.cookies ){
      // verify
      axios.post()
    }
  }
}
export const mutations = {}
