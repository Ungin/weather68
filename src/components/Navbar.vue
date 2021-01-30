<template>
  <v-bottom-navigation class="gray-dark-bg orange-font" grow horizontal>
      <v-row class="pa-3">
              <v-col cols="4" md="2">
                <v-btn class="gray-dark-bg orange-border d-flex flex-row" >
                <span>
                    <router-link class="text-decoration-none light-font" to="/"> Home </router-link>
                </span>

                <v-icon class="orange-font">mdi-map-marker</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="5" md="2">
                <v-btn class="gray-dark-bg orange-border d-flex flex-row" >
                    <span>
                        <router-link class="text-decoration-none light-font" to="favorites">
                        Favorites
                        </router-link>
                    </span>
                <v-icon class="orange-font">mdi-heart</v-icon>
                </v-btn>
              </v-col>
 
          <v-spacer></v-spacer>
          <v-col cols="3" class="d-flex justify-end">
            <v-btn v-show="fahrenheit" class="gray-dark-bg orange-border" @click="toggleMode('celsius')">
                <v-icon class="light-font">mdi-temperature-fahrenheit</v-icon>
            </v-btn>
            <v-btn v-show="celsius" class="gray-dark-bg orange-border" @click="toggleMode('fahrenheit')">
                <v-icon class="light-font">mdi-temperature-celsius</v-icon>
            </v-btn>
          </v-col>
      </v-row>
  </v-bottom-navigation>
</template>


<script>
import { mapState, mapActions } from 'vuex' 

  export default {
    
    computed: {
      ...mapState({
        celsius: state => state.favorites.temperatureMode.celsius,
        fahrenheit: state => state.favorites.temperatureMode.fahrenheit
      })
    },

    methods: {
        ...mapActions({
            toggleTemperatureMode: 'favorites/toggleTemperatureMode'
        }),

        toggleMode(mode) {
            this.toggleTemperatureMode(mode)
        }
    }

  }
</script>


<style lang="scss" scoped>
.gray-dark-bg {
  background:#393f4d !important;
}
.button-bg {
  background: #3d3d3f !important;
}
.orange-font {
  color: #FF5A09 !important;
}
.orange-border {
  border: 1px solid #FF5A09;
}
.light-font {
  color: #f6f5f3 !important;
}
</style>
