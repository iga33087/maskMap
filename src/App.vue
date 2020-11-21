<template>
  <div id="app">
    <Loading v-if="$store.state.loading"></Loading>
    <Today></Today>
    <Stock></Stock>
    <router-view/>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import Today from '@/components/Today'
import Stock from '@/components/Stock'

export default {
  components:{Loading,Today,Stock}
}
</script>