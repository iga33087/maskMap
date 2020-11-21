<template>
  <div class="today">
    <div v-if="week==0">今日為全民購買日</div>
    <div v-else>今日為{{week%2==0 ? '雙數號' : '單數號'}}購買日</div>
  </div>
</template>

<script>
import moment from "moment"

export default {
  computed: {
    week() {
      const date = moment();
      const dow = date.day();
      return dow      
    }
  }
}
</script>