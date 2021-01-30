<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"        
        hide-no-data
        outlined
        hide-selected
        item-text="LocalizedName"
        item-value="Key"
        label="Search"
        placeholder="Start typing to Search"
        prepend-icon="mdi-cloud-search"
        return-object
      ></v-autocomplete>
       
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      descriptionLimit: 60,
      items: [],
      isLoading: false,
      model: null,
      search: null,
      apiKey: process.env.VUE_APP_ACCU_WEATHER_API_KEY,
    };
  },


  watch: {
    search() {
      if(this.search) {
        return this.searchLocation(this.search)
      }
    },

    model() {
      if(this.model) {
        return this.$emit('getLocationWeather', this.model)
      }
    }
  },

  methods: {
    async searchLocation(searchStr) {
      try {
        const { data } = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${searchStr}`)
        if(!data) {
          throw new Error()
        }
        this.items = data
      }
      catch(e) {
        this.$toast.error(e, { icon: 'error' })
      }
    },
  }
}

</script>