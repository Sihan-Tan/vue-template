import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

import createLogger from 'vuex/dist/logger';

import createPersistedState from 'vuex-persistedstate';

const vuexPersist = createPersistedState({
  storage: window.sessionStorage,
  reducer(val) {
    return {
      prescribe: val.prescribe
    };
  }
});

Vue.use(Vuex);

// 开发环境时开启debug
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
  },
  getters,
  strict: debug,
  plugins: debug ? [vuexPersist, createLogger()] : [vuexPersist]
});
