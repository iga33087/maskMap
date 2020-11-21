<template>
  <div class="leftMenuListItem" @click="getFocus">
    <div class="leftMenuListItemTitle">{{data.properties.name}}</div>
    <div class="leftMenuListItemBox">
      <div class="leftMenuListItemBoxTitle">成人口罩</div>
      <div class="leftMenuListItemBoxNum">{{data.properties.mask_adult}}</div>
    </div>
    <div class="leftMenuListItemBox">
      <div class="leftMenuListItemBoxTitle">兒童口罩</div>
      <div class="leftMenuListItemBoxNum">{{data.properties.mask_child}}</div>
    </div>
    <div class="leftMenuListItemAddr">{{data.properties.address}}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      default: {
        properties: {
          name:"",
          mask_adult:"",
          mask_child:"",
          address:""
        }
      }
    }
  },
  methods: {
    getFocus() {
      this.$emit("getFocus",this.data)
    }
  }
}
</script>