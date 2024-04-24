import { createStore } from 'vuex';


import CoachesModule from './modules/coaches/index.js'

const store = createStore({
    modules: {
        coaches: CoachesModule
    },
    state() {
        return {
            userId: 'c3'
        }
    },
    getters: {
        userId(state) {
            return state.userId;
        }
    }
});

export default store;
