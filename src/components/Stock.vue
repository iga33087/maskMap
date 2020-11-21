<template>
  <div class="stock">
    <div class="stockTitle">標示</div>
    <div class="stockContent">
      <div class="stockBox">
        <div class="stockBoxImg"><img class="stockBoxImgImg" :src="logo"></div>
        <div class="stockBoxText">目前位置</div>
      </div>
      <div class="stockBox">
        <div class="stockBoxImg" style="background-color:#00f;"></div>
        <div class="stockBoxText">庫存 >= 1000</div>
      </div>
      <div class="stockBox">
        <div class="stockBoxImg" style="background-color:#ff0;"></div>
        <div class="stockBoxText">庫存 >= 500</div>
      </div>
      <div class="stockBox">
        <div class="stockBoxImg" style="background-color:#f00;"></div>
        <div class="stockBoxText">庫存 ＜ 500</div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.png';
export default {
  data() {
    return {
      logo:logo
    }
  }
}
</script>