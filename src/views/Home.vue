<template>
  <div class="home">
    <LeftMenu @getSearchResults="getSearchResults" @getFocus="getFocus"></LeftMenu>
    <Map ref="map" :point="pointData" :zoom="zoom" :center="center" :focusPoint="focusPoint" @changeFocusPoint="getFocus"></Map>
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/Map.vue'
import LeftMenu from '@/components/LeftMenu.vue'

export default {
  name: 'Home',
  components: {Map,LeftMenu},
  data() {
    return {
      pointData:[],
      focusPoint: {
        properties: {
          name:"",
          mask_adult:"",
          mask_child:"",
          address:""
        }
      },
      zoom: 8,
      center: [23.993035, 120.960113],
    }
  },
  methods: {
    getSearchResults(e) {
      this.pointData=e
    },
    getFocus(e) {
      this.focusPoint=e
      this.$refs.map.setCenter(e)
    }
  }
}
</script>
