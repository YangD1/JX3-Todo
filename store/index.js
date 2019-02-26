import axios from 'axios'
export const state = () => ({})
export const action = {
  async nuxtServerInit({ commit, duspatch }, { req }){
    console.log( req.headers.cookies )
//
    if ( req.headers.cookies ){
    }
  }
}
export const mutations = {}
