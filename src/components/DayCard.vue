<template>
  <v-card class="d-flex text-center gray-bg orange-border" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content class="gray-bg">
        <v-list-item-title class="headline mb-1">
          <p  class="gray-dark-font">
          {{ date }}
          </p>
        </v-list-item-title>
        <img color="primary" size="46" :src="icon"/>
        <v-list-item-subtitle>
          {{ temperature }} {{ temperatureMode }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>


<script>
import { mapState } from 'vuex'
export default {
  name: "DayCard",

  props: {
    day: {
      type: Object,
    },
  },

  computed: {
    ...mapState({
      celsius: state => state.favorites.temperatureMode.celsius,
    }),

    dayForecast() {
      return this.day;
    },

    date() {
      var weekdays = new Array(
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      );

      let date = new Date(this.day.Date);
      const strDay = weekdays[date.getDay()];
      return strDay;
    },

    temperature() {
      return this.day.Temperature.Maximum.Value;
    },

    temperatureMode() {
      return this.day.Temperature.Maximum.Unit;
    },

    icon() {
      let num = this.day.Day.Icon >= 10 ? this.day.Day.Icon : this.day.Day.Icon.toString().padStart(2, '0')
      return `https://developer.accuweather.com/sites/default/files/${num}-s.png`
    }
  },
};
</script>

<style lang="scss" scoped>
.gray-bg {
  background:#f6f5f3;
}
.gray-dark-font {
  color:#393f4d !important;
}
</style>
