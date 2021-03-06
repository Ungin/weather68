<template>
  <v-card class="d-flex text-center gray-bg my-5 orange-border" max-width="344" outlined>
    <v-row>
      <v-col cols="12">
        <v-list-item three-line>
          <v-list-item-content @click="redirectToForecast">
            <div class="overline mb-4">
              <p class="brown-font text-subtitle-1">
                {{ city.LocalizedName }}
              </p>
            </div>
            <v-list-item-title class="headline mb-1">
              <p class="gray-dark-font ">
                {{ temperature }}
              </p>
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ description }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col class="mb-5 ml-5" cols="10">
          <v-row justify="space-around">
            <img color="primary" size="46" :src="icon" />
         
        <v-card-actions>
            <v-btn @click="removeFavorite" elevation="0" class="orange-font">
              <v-icon> mdi-trash-can-outline </v-icon>
            </v-btn>
        </v-card-actions>
          </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>


<script>
import axios from 'axios'
import { mapState, mapActions } from "vuex";

export default {
  name: "CityCard",
  data() {
    return {
      apiKey: process.env.VUE_APP_ACCU_WEATHER_API_KEY,
      temperature: undefined,
      icon: undefined,
      description: undefined
    };
  },

  props: {
    city: {
      type: Object,
    },
  },

  computed: {
    ...mapState({
      celsius: state => state.favorites.temperatureMode.celsius,
      fahrenheit: state => state.favorites.temperatureMode.fahrenheit,
    }),

  },

  methods: {
    ...mapActions({
      changeForecastLocation: "favorites/changeForecastLocation",
    }),
    async getCurrentWeather() {
      console.log(this.city.Key);
      try {
        const { data } = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${this.city.Key}?apikey=${this.apiKey}&details=true`)
        
        if(!data) {
          throw new Error()
        }

        this.temperature = this.celsius ? data[0].Temperature.Metric.Value: data[0].Temperature.Imperial.Value;
        this.description = data[0].WeatherText;
        let num = data[0].WeatherIcon.Icon >= 10 ? data[0].WeatherIcon : data[0].WeatherIcon.toString().padStart(2, "0");
        this.icon = `https://developer.accuweather.com/sites/default/files/${num}-s.png`;
    
      } catch (e) {
          this.$toasted.error(e, { icon: 'error' })
      }
    },

    redirectToForecast() {
      this.changeForecastLocation(this.city);
      this.$router.push("/");
    },

    removeFavorite() {
      this.$emit("removeFavorite", this.city);
      if(this.cities.length < 1) {
        this.$router.push("/");
      }
    },
  },

  created() {
    this.getCurrentWeather();
  },
};
</script>

<style lang="scss" scoped>
.gray-bg {
  background: #f6f5f3;
}
.brown-font {
  color: #e05915 !important;
}
.orange-font {
  color: #FF5A09 !important;
}
</style>
