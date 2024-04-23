import { createStore } from 'vuex';


import CoachesModule from './modules/coaches/index.js'

const store = createStore({
    modules: {
        coaches: CoachesModule
    }
});

export default store;
