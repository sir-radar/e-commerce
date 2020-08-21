<template>
  <div class="">
    <banner v-if="checkoutSuccess"></banner>
    <header>
        <h5 class="cartTitle">YOUR CART</h5>
    </header>

    <section>
      <div v-if="!!cartSize" >
        <div id="cartDeets" v-for="(item, index) in cart" :key="item.id">
            <div class="item1">
                <div class="itemImg">
                    <img :src="item.image">
                </div>
                <div class="itemDeets">
                    <p id="one">{{ item.title }}</p>
                    <p id="two">Available in size {{ item.variations }} </p>
                    <p id="three">N{{ commafy(item.price) }}</p>
                </div>
            </div>
            
            <div class="itemQ">
                <div class="quant">
                        <i class="fas fa-minus-square" @click="reduceProductQuantity(index)"></i>
                        <p>{{ item.quantity }}</p>
                        <i class="fas fa-plus-square" @click="increaseProductQuantity(index)"></i>
                </div>
                <p class="remove" style="padding-left: 0.5rem;" @click="removeProduct(item)">Remove</p>
            </div>
        </div>
      </div>
        <div v-if="!cartSize" class="red">Your cart is empty</div>


        <div class="totalAmount">
            <p>Total</p>
            <p>N {{ commafy(cartTotalAmount) }}</p>
        </div>

        <router-link to="/"><p class="continue">Continue shopping</p></router-link>

        <div v-if="!!cartSize" class="checkout" @click.prevent="checkout">CHECKOUT</div>
    </section>
    
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import Banner from '@/components/banner.vue';
 export default{
    components: {
      Banner,
    },
    methods: {
      ...mapActions(['checkout', 'reduceProductQuantity', 'increaseProductQuantity']),
      ...mapMutations(['removeProduct']),
    },
    computed: {
      ...mapState(['cart', 'checkoutSuccess']),
      ...mapGetters(['cartTotalAmount', 'commafy', 'cartSize'])
    },
 };
</script>
<style lang="scss" scoped>
//colors
$color_black_haze_approx: #f6f6f6;
$color_gravel_approx: #4c4c4c;
$color_yellow_sea_approx: #f8a900;
$red: red;
$black: #000;
$white: #fff;
$color_silver_chalice_approx: #aaaaaa;
$color_shady_lady_approx: #a7a7a7;

header {
  background: $color_black_haze_approx;
  height: 4rem;
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  left: 0;
  .cartTitle {
    text-align: center;
    font-size: 1.2rem;
    margin: 1.5rem;
  }
}
section {
  padding-left: 6rem;
  padding-right: 6rem;
  margin-top: 6rem;
  .checkout {
    margin: 4rem 2rem 2rem;
    padding: 1rem;
    background: $black;
    outline: none;
    color: $white;
    height: 1rem;
    cursor: pointer;
  }
}
i {
  cursor: pointer;
  height: 1px;
}
a {
  text-decoration: none;
  color: $black;
}
.red {
  color: $red;
}
.itemImg {
  height: 4rem;
  width: 4rem;
  img {
    height: inherit;
    width: inherit;
  }
}
#cartDeets {
  margin: 2rem 2rem 0 2rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid $color_silver_chalice_approx;
  .item1 {
    height: 6rem;
    display: flex;
    width: 32rem;
  }
  .itemDeets {
    text-align: left;
    #one {
      padding-left: 1rem;
      padding-bottom: 0.5rem;
      margin: 0;
      font-weight: 600;
    }
    #two {
      padding-left: 1rem;
      padding-bottom: 0.5rem;
      margin: 0;
      color: $color_shady_lady_approx;
    }
    #three {
      padding-left: 1rem;
      padding-top: .6rem;
      margin: 0;
      color: $color_yellow_sea_approx;
      font-weight: 600;
    }
  }
  .itemQ {
    width: 7%;
    .remove {
      color: $red;
      cursor: pointer;
    }
  }
  .quant {
    display: flex;
    justify-content: space-around;
    > p {
      margin-top: -1px;
    }
  }
}
.totalAmount {
  margin: 2rem 2rem 0 2rem;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  background: $color_black_haze_approx;
  height: 3rem;
  p {
    font-weight: 600;
    color: $color_gravel_approx;
  }
}
.continue {
  display: flex;
  justify-content: center;
  margin-top: 6rem;
  font-size: 1.2rem;
}
@media(max-width: 799px) {
  header {
    background: $color_black_haze_approx;
    height: 4rem;
    .cartTitle {
      text-align: center;
      font-size: 1.2rem;
    }
  }
  section {
    padding: 0;
  }
  #cartDeets {
    margin: 4rem 2rem 0;
    display: flex;
    justify-content: space-between;
    .item1 {
      height: 6rem;
      display: flex;
      width: 15rem;
    }
    .itemDeets {
      font-size: small;
      #one {
        padding-left: 1rem;
        padding-bottom: 0.2rem;
        margin: 0;
        font-weight: 600;
      }
      #two {
        padding-left: 1rem;
        padding-bottom: 0.3rem;
        margin: 0;
        color: $color_gravel_approx;
      }
      #three {
        padding-left: 1rem;
        padding-top: 0.3rem;
        margin: 0;
        color: $color_yellow_sea_approx;
        font-weight: 600;
      }
    }
    .itemQ {
      width: 22%;
      .remove {
        color: $red;
        cursor: pointer;
      }
    }
    .quant {
      display: flex;
      justify-content: space-around;
      > p {
        margin-top: -1px;
      }
    }
  }
  .totalAmount {
    margin: 2rem 2rem 0 2rem;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    background: $color_black_haze_approx;
    height: 4rem;
    p {
      font-weight: 600;
      color: $color_gravel_approx;
    }
  }
  .continue {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
    font-size: 1.2rem;
  }
}
</style>
