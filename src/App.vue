<template>
  <div id="app">
    <Loading v-if="$store.state.loading"></Loading>
    <Today></Today>
    <router-view/>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import Today from '@/components/Today'

export default {
  components:{Loading,Today}
}
</script>