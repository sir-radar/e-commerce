<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
            <button class="modal-default-button" @click.prevent="$emit('close')">
              <i class="fas fa-times plus"></i>
            </button>

          <div class="modal-body">
            <slot name="body">
              <div class="imgDisplay">
                <img :src="product.image">
                <div class="imgOverlay">
                  <p>N{{ commafy(product.price) }}</p>
                </div>
              </div>

             <div class="price-container">
               <div class="imgText">
                <div class="details">
                  <p class="one1">{{ product.title }}</p>
                  <p class="one2">Available in size {{ product.variations}}</p>
                </div>
                <div>
                  <p class="one3">{{ product.items }} Left</p>
                </div>
              </div>

               <div class="priceQuantity">
                <button class="btn1" @click.prevent="decrementQuantity">
                  <i class="fas fa-minus"></i>
                </button>
                <p>quantity <span>{{quantity}}</span></p>
                <button class="btn2" @click.prevent="incrementQuantity">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <button v-if="!itemExist(product)" class="cartbtn" @click="addToCart(product)">add to cart</button>
              <button v-else class="cartbtn red" @click.prevent="removeProduct(product)">remove from cart</button>
              <p class="continue-txt" v-if="!!cartSize" @click="checkout">Checkout now</p>
             </div>

              
              
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
  </template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

export default {
 props: ['product'],
 data() {
  return {
   
  }
 },
 methods: {
  ...mapMutations(['addToCart','removeProduct', 'incrementQuantity', 'decrementQuantity']),
  ...mapActions(['checkout'])
 },
 computed:{
  ...mapState(['quantity']),
  ...mapGetters(['itemExist', 'cartSize', 'commafy']),
 }
};
</script>
<style lang="scss" scoped>
 //colors
$white: #fff;
$black_33: rgba(0, 0, 0, .33);
$color_cod_gray_approx: #0c0805;
$black_50: rgba(0, 0, 0, .8);
$color_cape_cod_approx: #404040;
$red: red;
$color_boulder_approx: #787878;
$color_celeste_approx: #cbcbcb;
$black: #000000;
$color_ocean_green_approx: #42b983;
$color_log_cabin_approx: #222222;

//fonts
$font_0: Helvetica;
$font_1: Arial;
$font_2: sans-serif;

button {
  cursor: pointer;
  outline: none;
}
.modal-mask {
  position: fixed;
  z-index: 500000000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $black_50;
  display: table;
  transition: opacity .3s ease;
}
.details {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: 1rem;
  margin-bottom: 4rem;
  .one1 {
    color: $color_cape_cod_approx;
    letter-spacing: 2px;
    font-weight: 600;
    margin: 0;
    padding: 0;
  }
  .one2 {
    font-size: 0.8rem;
    letter-spacing: 1px;
    color: $color_boulder_approx;
    margin: 0;
    padding: 0;
  }
}
.red {
  background: $red !important;
  border: 1px solid $red !important;
}
.one3 {
  color: $color_boulder_approx;
  font-size: 0.9rem;
}
.plus {
  color: $white;
}
.priceQuantity {
  display: flex;
  justify-content: space-between;
  border: 1px solid $color_celeste_approx;
  height: 30px;
  button {
    background: $white;
    margin-right: -1px;
  }
  .btn1 {
    border-right: 1px solid $color_celeste_approx;
    border-left: none;
    border-bottom: none;
    border-top: none;
  }
  .btn2 {
    border-right: 1px solid $color_celeste_approx;
    border-left: 1px solid $color_celeste_approx;
    border-bottom: none;
    border-top: none;
  }
  p {
    color: $black;
    text-transform: uppercase;
    margin-top: 7.5px;
  }
  span {
    font-weight: 600;
    margin-left: -4px;
  }
}
.price-container {
  margin-left: 4rem;
  margin-right: 4rem;
}
.continue-txt {
  margin-top: 2rem;
  cursor: pointer;
}
.cartbtn {
  width: 100%;
  margin-top: 0.5rem;
  height: 2rem;
  color: $white;
  background: $black;
  text-transform: uppercase;
  border: 1px solid $black;
}
.imgDisplay {
  margin-top: 2rem;
  width: 100%;
  position: relative;
  img {
    position: relative;
    width: 80%;
    object-fit: cover;
    height: 20rem;
  }
}
.imgOverlay {
  position: absolute;
  right: 4.1rem;
  bottom: 4px;
  color: $white;
  background: $color_cod_gray_approx;
  opacity: 0.8;
  width: 25%;
}
.imgText {
  display: flex;
  justify-content: space-between;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 650px;
  height: 600px;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: $white;
  border-radius: 2px;
  box-shadow: 0 2px 8px $black_33;
  transition: all .3s ease;
  font-family: $font_0, $font_1, $font_2;
}
.modal-body {
  margin: 20px 0;
}
.modal-default-button {
  float: right;
  border-radius: 50%;
  border: none;
  height: 1.5rem;
  width: 1.5rem;
  background: $color_log_cabin_approx;
}
@media(max-width: 799px) {
  .modal-container {
    width: 285px;
    height: 600px;
    margin: 0 auto;
    background-color: $white;
    border-radius: 2px;
    box-shadow: 0 2px 8px $black_33;
    transition: all .3s ease;
    font-family: $font_0, $font_1, $font_2;
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    margin: 1rem;
  }
  .imgDisplay {
    width: 18.1rem;
    img {
      width: 18.1rem;
    }
  }
  .imgOverlay {
    position: absolute;
    right: 0;
    color: $white;
    background: $color_cod_gray_approx;
    opacity: 0.7;
    width: 32%;
  }
  .price-container {
    margin: 0;
  }
}
.modal-header h3 {
  margin-top: 0;
  color: $color_ocean_green_approx;
}
</style>