<template>
  <v-container>
    <Search @getLocationWeather="getLocationWeather" />
    <v-card class="gray orange-border py-3">
      <v-row>
        <v-col lg="3" cols="12" class="px-5">
          <v-card class="text-center gray-bg orange-border">
            <h1 class="pa-3 brown-font">{{ defaultCity.LocalizedName }}</h1>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" lg="3" class="ma-3 mr-5">
          <v-row justify="center" justify-md="end">
            <v-btn @click="addLocation" class="orange-font orange-border"
              >Add to favorites</v-btn
            >
          </v-row>
          <!--  mdiPlusThick -->
        </v-col>
      </v-row>
      <v-row justify="center">
        <p class="title gray-dark-font text-h5 text-center">
          {{ dailyDescription }}
        </p>
      </v-row>
      <v-row justify="center">
        <v-col v-for="(day, index) in dailyForecasts" :key="index" class="px-5" md="6" lg="2" cols="12">
          <DayCard :day="day" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import DayCard from "@/components/DayCard";
import Search from "@/components/Home/Search.vue";

// import staticForecastForTLV from "@/static/staticForecastForTLV.json";
// import staticForecastforMadrid from "@/static/staticForecastforMadrid.json";

export default {
  name: "Home",
  components: {
    Search,
    DayCard,
  },

  data() {
    return {
      apiKey: process.env.VUE_APP_ACCU_WEATHER_API_KEY,
      googleApiKey: process.env.VUE_APP_GEOLOCATION_GOOGLE_API_KEY,
      defaultCity: undefined,
      default: undefined,
      currLocation: undefined,
    };
  },

  created() {
    this.defaultCity = this.getCurrentGeolocation()//this.basicDefault;
  },

  // mounted() {
  //   this.getCurrentGeolocation();
  // },

  computed: {
    ...mapState({
      basicDefault: (state) => state.favorites.default,
      celsius: state => state.favorites.temperatureMode.celsius,
      fahrenheit: state => state.favorites.temperatureMode.fahrenheit
    }),

    dailyForecasts() {
      return this.default.DailyForecasts;
    },

    dailyDescription() {
      return this.default.Headline.Text;
    },
  },

  // watch: {
  //   currLocation() {
  //     return this.checkLocationKey()
  //   }
  // },

  methods: {
    ...mapActions({
      addToFavorites: "favorites/addToFavorites",
    }),

    async getCurrentGeolocation() {
      try {
        const { data } = await axios.post(
          `https://www.googleapis.com/geolocation/v1/geolocate?key=${this.googleApiKey}`
        );
        if(!data) {
          throw new Error()
        }
        this.currLocation = data.location;
        return this.checkLocationKey()
      } catch (e) {
        this.$toast.error(e, { icon: 'error' })
      }
    },

    async getLocationWeather(location) {
      console.log("searching for : ", location.Key, location);
      try {
        const { data } = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${location.Key}?apikey=${this.apiKey}&details=true&metric=${this.celsius ? true : false }`)
        // console.log('data for search: ', data);
        if(!data) {
          throw new Error()
        }
        this.default = data
        // this.defaultCity = location

        // this.default = staticForecastforMadrid;
        this.defaultCity = location;
      } catch (e) {
        this.$toast.error(e, { icon: 'error' })
      }
    },

    async checkLocationKey() {
      try {
        let latlngString = this.currLocation.lat + ',' + this.currLocation.lng
        const { data } = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${this.apiKey}&q=${latlngString}&details=true`)
        console.log(data);
        return this.getLocationWeather(data)
      }
      catch(e) {
        console.log(e);
      }
    },

    addLocation() {
      this.addToFavorites(this.defaultCity);
    },
  },
 
};
</script>

<style lang="scss" scoped>
.gray-bg {
  background: #f6f5f3;
}
.gray-dark-font {
  color: #393f4d !important;
}
.brown-font {
  color: #e05915 !important;
}
.orange-font {
  color: #ff5a09 !important;
}
.gray {
  background: #8e8e90;
}
.orange-border {
  border: 1px solid #FF5A09;
}
</style>
