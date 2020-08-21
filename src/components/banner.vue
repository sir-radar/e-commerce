<template>
  <div class="banner">
    <i class="fas fa-check-circle symbol"></i>
    <div class="banner-message">
      <p class="banner-type">Success</p>
      <p class="banner-message">{{checkoutMessage}}</p>
    </div>
  </div>
</template>

<script>
 import { mapState } from 'vuex';
export default {
 computed:{
  ...mapState(['checkoutMessage']),
 }
};
</script>
<style lang="scss" scoped>
 //colors
$color_masala_approx: #3e3e3e;
$white: #fff;
$color_malachite_approx: #2bde3f;

i {
  align-self: center;
}
.symbol {
  margin-right: 2rem;
}
.banner-type {
  color: $color_masala_approx;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 8px;
  color: $white;
}
.banner-message {
  text-align: left;
  p {
    margin: 0;
  }
}
.banner {
  display: flex;
  justify-content: center;
  position: fixed;
  background: $color_malachite_approx;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000000;
  color: $white;
  padding: 5px;
}

</style>