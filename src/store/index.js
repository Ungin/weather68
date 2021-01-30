import Vue from 'vue';
import Vuex from 'vuex';
import favorites from './modules/favorites'

Vue.use(Vuex);

const store = () => {
    return new Vuex.Store({
        modules: {
          favorites
        },
        
    })
}

export default store