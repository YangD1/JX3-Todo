const BASE = process.env._api;
export const state = () => ({
  register: BASE + '/register',
  login: BASE + '/login'
})
