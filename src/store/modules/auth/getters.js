export default {
    userId(state) {
        return state.userId;
    },
    token(state) {
        return state.token;
    },
    isAuthenticated(state) {
        return !!state.token; // !! - convert value to boolean
    },
    didAutoLogout(state) {
        return state.didAutoLogout;
    }

}