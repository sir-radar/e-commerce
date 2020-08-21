<template>
  <div class="spinner"></div>
</template>

<script>
export default {
};
</script>
<style lang="scss" scoped>
  //colors
$black: #000;

.spinner {
  margin-top: 3.5rem;
  &:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    bottom: 6rem;
    left: 48%;
    height: 55px;
    width: 55px;
    border-radius: 50%;
    border: 5px solid transparent;
    border-top-color: $black;
    border-bottom-color: $black;
    animation: spinner 1.2s ease infinite;
    z-index: 3000;
  }
}
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
