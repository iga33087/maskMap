<template>
  <div class="leftMenu" :class="{'isOpen':isOpen}">
    <div class="leftMenuOpen" @click="isOpen=!isOpen">
      <i class="el-icon-s-unfold leftMenuOpenIcon"></i>
    </div>
    <div class="leftMenuSearch">
      <select class="leftMenuSearchSelect" v-model="search.county" @change="search.town=''">
        <option value="">不限</option>
        <option v-for="(item,index) in Object.keys(cityList)" :value="item" :key="index">{{item}}</option>
      </select>
      <select class="leftMenuSearchSelect" v-model="search.town">
        <option value="">不限</option>
        <option v-for="(item,index) in cityList[search.county]" :value="item" :key="index">{{item}}</option>
      </select>
      <div class="leftMenuSearchButton" @click="toSearch">搜尋</div>
      <div class="leftMenuSearchDataList">
        <div class="leftMenuSearchDataListTitle">總計</div>
        <div class="leftMenuSearchDataListItem">
          <div class="leftMenuSearchDataListItemTitle">藥局</div>
          <div class="leftMenuSearchDataListItemText">{{searchResults.length}}家</div>
        </div>
        <div class="leftMenuSearchDataListItem">
          <div class="leftMenuSearchDataListItemTitle">成人口罩</div>
          <div class="leftMenuSearchDataListItemText">{{adultMask}}個</div>
        </div>
        <div class="leftMenuSearchDataListItem">
          <div class="leftMenuSearchDataListItemTitle">兒童口罩</div>
          <div class="leftMenuSearchDataListItemText">{{childMask}}個</div>
        </div>
      </div>
    </div>
    <div class="leftMenuList">
      <LeftMenuListItem v-for="(item,index) in searchResults" :data="item" :key="index" @getFocus="getFocus"></LeftMenuListItem>
    </div>
  </div>
</template>

<script>
import cityList from '@/assets/json/cityList.js'
import LeftMenuListItem from '@/components/LeftMenuListItem'

export default {
  components:{LeftMenuListItem},
  data() {
    return {
      isOpen:false,
      pointData:[],
      searchResults:[],
      cityList:cityList,
      search: {
        county:"",
        town:""
      }
    }
  },
  computed: {
    adultMask() {
      let num=0
      for(let item of this.searchResults) {
        num+=item.properties.mask_adult
      }
      return num
    },
    childMask() {
      let num=0
      for(let item of this.searchResults) {
        num+=item.properties.mask_child
      }
      return num
    }
  },
  async created() {
    this.$store.dispatch('loading',true)
    this.pointData=await this.$api.getPoint().then(res=>res.data.features)
    for(let item of this.pointData) {
      item.geometry.coordinates.reverse()
    }
    this.toSearch()
    this.$store.dispatch('loading',false)
  },
  methods: {
    async toSearch() {
      this.searchResults=await this.toSearchFunction()
      this.$emit("getSearchResults",this.searchResults)
    },
    toSearchFunction() {
      return new Promise((resolve) => {
        let arr=this.pointData.filter(res=>(res.properties.county==this.search.county||!this.search.county)&&(res.properties.town==this.search.town||!this.search.town))
        resolve(arr);
      });
    },
    getFocus(e) {
      this.$emit("getFocus",e)
    }
  }
}
</script>