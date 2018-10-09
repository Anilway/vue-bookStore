import Vue from 'vue';
import Vuex from 'vuex';
import logger from 'vuex/dist/logger';

Vue.use(Vuex);

// 状态
let state={carList:[]};
import mutations from './mutations';
import getters from './getters';
export default new Vuex.Store({
    state,
    mutations,
    getters,
    plugins:[logger()],
    static:true
});