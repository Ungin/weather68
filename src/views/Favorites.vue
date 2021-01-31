<template>
  <v-container>
      <v-card class=" gray orange-border">

    <v-row class="mt-10">
      <v-col v-for="(city, index) in cities" :key="index" class="px-5 " md="6" lg="3" cols="12">
        <CityCard :city="city" @removeFavorite="removeFavorite"/>
      </v-col>
    </v-row>
      </v-card>
  </v-container>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex' 
import CityCard from '@/components/CityCard'

  export default {
    name: 'Favorites',
    components: {
     CityCard
    },

    data() {
      return {
        cities: undefined,
      }
    },

    computed: {
       ...mapGetters({
         favoriteCities: 'favorites/favorites',
    }),
  
    },

    created() {
      this.cities = this.favoriteCities
    },

   
    methods: {
      ...mapActions({
      removeFromFavorites: 'favorites/removeFromFavorites' ,
    }),

   
    removeFavorite(payload) {
      this.removeFromFavorites(payload)
    }
    }
 
  }
</script>


<style lang="scss" scoped>
.gray {
  background:  #8e8e90;
}
.orange-border {
  border: 1px solid #FF5A09;
}
</style>
