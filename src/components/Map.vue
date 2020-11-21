<template>
  <div class="map">
    <LMap ref="myMap" :zoom="zoom" :center="center" :options="options" style="height: 100vh;">
      <LTileLayer :url="url" :attribution="attribution" />
      <LMarker :lat-lng="CurrentPosition" :icon="icon" v-if="CurrentPosition.length">
      </LMarker>
      <LFeatureGroup ref="features">
        <LPopup><LeftMenuListItem :data="focusPoint" style="width:260px;"></LeftMenuListItem></LPopup>
      </LFeatureGroup>
      <Vue2LeafletMarkerCluster ref="clusterRef">
        <!--<LMarker v-for="(item) in point" :lat-lng="item.geometry.coordinates" :key="item.id" @click="changeFocusPoint(item)" :icon="icon">
        </LMarker>-->
        <LCircleMarker v-for="(item) in point" :lat-lng="item.geometry.coordinates" :color="getPointCount(item)>=1000 ? '#00f' : getPointCount(item)>=500 ? '#ff0' : '#f00'" :key="item.id" @click="changeFocusPoint(item)"></LCircleMarker>
      </Vue2LeafletMarkerCluster>
      <LPolygon v-for="(item,index) in areaData" :lat-lngs="item" :color="polygon.color" :fill="false" :key="index" ></LPolygon>
    </LMap>
  </div>
</template>

<script>
import L from 'leaflet';
import logo from '@/assets/logo.png';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import {LMap,LTileLayer,LMarker,LCircleMarker,LPolygon,LPopup,LFeatureGroup} from 'vue2-leaflet'; 
import LeftMenuListItem from '@/components/LeftMenuListItem'
import area from "@/assets/json/area.json";

export default {
  components:{Vue2LeafletMarkerCluster,LMap,LTileLayer,LMarker,LCircleMarker,LPolygon,LPopup,LFeatureGroup,LeftMenuListItem},
  props:{
    point: {
      default:()=>[]
    },
    zoom: {
      default:8
    },
    center: {
      default:()=>[23.993035, 120.960113]
    },
    focusPoint: {}
  },
  data() {
    return {
      // 模擬資料
      data: [
        /*{ id: 1, name: "夢時代購物中心", local: [22.595153, 120.306923] },
        { id: 2, name: "漢神百貨", local: [22.61942, 120.296386] },
        { id: 3, name: "漢神巨蛋", local: [22.669603, 120.302288] },
        { id: 4, name: "大統百貨", local: [22.630748, 120.318033] }*/
      ],
      CurrentPosition:[],
      area:area.features,
      areaData:[],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: `© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
      options: {
      },
      icon:  L.icon({
        iconUrl: logo,
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      polygon: {
        latlngs: [[47.2263299, -1.6222], [47.21024000000001, -1.6270065], [47.1969447, -1.6136169], [47.18527929999999, -1.6143036], [47.1794457, -1.6098404], [47.1775788, -1.5985107], [47.1676598, -1.5753365], [47.1593731, -1.5521622], [47.1593731, -1.5319061], [47.1722111, -1.5143967], [47.1960115, -1.4841843], [47.2095404, -1.4848709], [47.2291277, -1.4683914], [47.2533687, -1.5116501], [47.2577961, -1.5531921], [47.26828069, -1.5621185], [47.2657179, -1.589241], [47.2589612, -1.6204834], [47.237287, -1.6266632], [47.2263299, -1.6222]],
        color: '#AE0000'
      },
    };
  },
  async created() {
    this.getLocation()
    for(let item1 of this.area) {
      for(let item2 of item1.geometry.coordinates) {
        for(let item3 of item2[0]) {
          item3.reverse()
        }
        this.areaData.push(item2[0])
      }
    }
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((e)=> {
          this.CurrentPosition=[e.coords.latitude,e.coords.longitude]
        });
      }
    },
    changeFocusPoint(x) {
      this.$emit("changeFocusPoint",x)
    },
    setCenter(x) {
      this.$nextTick(()=> {
        this.$refs.myMap.setCenter(x.geometry.coordinates);
      })
      this.$refs.features.mapObject.openPopup(x.geometry.coordinates);
    },
    getPointCount(x) {
      return x.properties.mask_adult+x.properties.mask_child
    }
  }
}
</script>