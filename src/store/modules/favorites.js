
const state = () => ({
    
    default: undefined,
    temperatureMode: {
        celsius: true,
        fahrenheit: false
    },
    favorites: []
})

const actions = {

    addToFavorites({ commit }, location) {
        commit('ADD_TO_FAVORITES', location)
    },

    toggleTemperatureMode({ commit }, mode) {
        commit('TOGGLE_TEMPERATURE_MODE', mode)
    },

    changeForecastLocation({ commit }, location) {
        commit('CHANGE_FORECAST_LOCATION', location)
    },

    removeFromFavorites({ commit }, location) {
        commit('REMOVE_FROM_FAVORITES', location)
    },

}

const mutations = {
    ADD_TO_FAVORITES(state, location) {
        state.favorites.push(location)
    },

    TOGGLE_TEMPERATURE_MODE(state, mode) {
        if(mode === 'celsius') {
            state.temperatureMode.celsius = mode
            state.temperatureMode.fahrenheit = false
        }
        else {
            state.temperatureMode.fahrenheit = mode
            state.temperatureMode.celsius = false
        }
         
    },

    CHANGE_FORECAST_LOCATION(state, location) {
        state.default = location
    },

    REMOVE_FROM_FAVORITES(state, location) {
        let index = state.favorites.findIndex(item => item.Key == location.Key)
        state.favorites.splice(index, 1)
    },

}

const getters = {
    favorites: (state) => {
        return state.favorites;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}