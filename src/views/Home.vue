<template>
  <div class="home">
  <banner v-if="checkoutSuccess"></banner>
  <div class="wrapper">
    <header class="navbar">
      <div class="cart" to="/cart">
        <router-link to="/cart">
          <i class="fas fa-shopping-cart"></i> &nbsp; <span>Cart</span><div class="cart-counter">{{cartSize}}</div>
        </router-link>
      </div>
  </header>
  </div>
  <section class="wrapper pc-title">
    <h4>ASHLUXURY</h4>
    <p> 
      Fashion & Lifestyle <i class="fas fa-envelope"></i> admin@ashluxury.com <i class="fas fa-mobile"></i> <br>
      whatsapp: +234 8169761216 <i class="fas fa-globe-americas"></i> worldwide shipping <br>
       <i class="fas fa-map-pin"></i> 22B Admiralty Way <i class="fas fa-clock"></i> HQ opens 10am - 8pm (mon-sat)
    </p>
  </section>

  <div class="mobile-nav">
    <div id="mobile-header">
      <h4>TIGERNUT MILK</h4>
      <div class="mobile-cart" to="/cart">
        <router-link to="/cart">
          <span><i class="fas fa-shopping-bag"></i></span> <div class="mobile-cart-counter">{{cartSize}}</div>
        </router-link>
      </div>
    </div>
    <div class="nav-story">
      <p>Tamcherie Foods Nigeria  <i class="fas fa-flag"></i> 100% Organic <br>
        <i class="fas fa-globe"></i> Available Flavours include: Ginger <i class="fas fa-heart"></i><br>
        Cinnamon <i class="fas fa-heart"></i> Coconut <i class="fas fa-heart"></i> Unsweetened <i class="fas fa-heart"></i><br>
        Made fresh daily. Order on Whatsapp/DM<br>
        <i class="fas fa-phone"></i>(+234) 805 618 2583
      </p>
    </div>
  </div>
  <div class="overlay"></div>
  <div id="content">
    <div v-for="product in products" class="item-box" :key="product.id" >
      <img :src="product.image" @click="displayModal(product)">
      <div class="after" @click="displayModal(product)">
        <div>
          <h4>N{{ commafy(product.price) }}</h4>
          <p>Available in size {{ product.variations }}</p>
        </div>
        <button>Buy now</button>
      </div>
      <div class="price-tag">N{{ commafy(product.price) }}</div>
      <div class="product-detail">
        <div class="product-title">
          <h4>{{ product.title }}</h4>
          <p>Available in size {{ product.variations }}</p>
        </div>
        <button
          v-if="!itemExist(product)"
          class="add-to-cart"
          @click.prevent="addToCart(product)"
          >
          Add to cart
        </button>
        <button
          v-else class="remove-from-cart"
          @click.prevent="removeProduct(product)"
          >
          Remove from cart
        </button>
      </div>
    </div>
  </div>

  <modal v-if="showModal" @close="setModalDisplay(false)" :product="singleProduct">
  </modal>
  <button @click.prevent="getProducts()" class="load-more" v-if="!loading"><p>See more</p></button>
  <spinner v-if="loading" class="loader" :class="{ addmargin: initialLoad }"/>
  <div class="footer">
    <div class="liner"></div>
    <div class="foot-insta"><h4>Follow us on instagram</h4></div>
    <div class="liner"></div>
  </div>
  </div>

</template>

<script>
import {
  mapState,
  mapActions,
  mapMutations,
  mapGetters,
} from 'vuex';
import Spinner from '@/components/spinner.vue';
import Modal from '@/components/modal.vue';
import Banner from '@/components/banner.vue';

export default {
  name: 'home',
  components: {
    Spinner,
    Modal,
    Banner,
  },
  data() {
    return {
      singleProduct: null,
      initialLoad: true,
    };
  },
  watch:{
     products:function(value){
      if(value.length > 0){
        this.initialLoad = false;
      }
     }
  },
  mounted() {
    if(this.products.length < 1){
     this.getProducts();
    }
  },
  methods: {
    ...mapActions(['getProducts']),
    ...mapMutations(['addToCart', 'removeProduct', 'setModalDisplay']),
    displayModal(product) {
      this.singleProduct = product;
      this.setModalDisplay(true);
    },
  },
  computed: {
    ...mapState(['products', 'loading', 'checkoutSuccess', 'showModal']),
    ...mapGetters(['itemExist', 'cartSize', 'commafy']),
  },

};
</script>
<style lang="scss" scoped>
 .addmargin {
    &:before {
      top: 25rem;
      position: fixed;
    }
  }
.load-more {
  position: relative;
  z-index: 50000;
  height: 97px;
  width: 112px;
  border: 4px solid #000;
  background: transparent;
  outline: none;
  cursor: pointer;
  margin-top: -2rem;
  p {
    padding-top: 3.5rem;
    font-weight: 700;
  }
}
header {
  margin-bottom: 0px;
}
.pc-title {
  margin-bottom: 3rem !important;
  letter-spacing: 2.2px;
  h4 {
    margin-top: 0px;
  }
}
img {
  width: 100%;
  object-fit: cover;
  height: inherit;
}
a {
  text-decoration: none;
  color: #000;
}
.item-box {
  .after {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
    color: #FFF;
    background: rgba(0, 0, 0, .6);
    display: none;
  }
  .price-tag {
    display: block;
    padding: 20px;
    width: 28%;
    background: rgba(0, 0, 0, .8);
    position: absolute;
    right: 0;
    bottom: 0;
    display: none;
    text-align: center;
    color: #fff;
  }
}
@media screen and (min-width: 800px) {
  .home{
    position: relative;
  }
  .wrapper {
    width: 762px;
    margin: 0 auto;
    position: relative;
  }
  #content {
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 35px 33px;
    display: grid;
    position: relative;
    width: 762px;
    margin: 0 auto;
    top: 16%;
    margin-bottom: 1rem;
    .item-box {
      position: relative;
      height: 218px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
      &:nth-child(7n+4) {
        grid-column: 1/6;
        width: 265px;
        height: 266px;
      }
      &:nth-child(7n+5) {
        grid-column: 6/13;
        width: 464px;
        height: 266px;
        left: -33px;
        position: relative;
      }
      &:nth-child(7n+6) {
        grid-column: 1/8;
        width: 464px;
        height: 266px;
      }
      &:nth-child(7n+7) {
        grid-column: 8/13;
        width: 265px;
        position: relative;
        left: 33px;
        height: 266px;
      }
      &:nth-child(7n+1) {
        grid-column: 1/5;
      }
      &:nth-child(7n+2) {
        grid-column: 5/9;
      }
      &:nth-child(7n+3) {
        grid-column: 9/13;
      }
    }
  }
  .mobile-nav {
    display: none;
  }
  .cart-counter {
    position: absolute;
    height: 16px;
    width: 16px;
    background: #F5A623;
    right: 1.7rem;
    border-radius: 50%;
    bottom: 1.5rem;
    font-size: .6rem;
    font-weight: 600;
    text-align: center;
    color: #000;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .item-box {
    &:hover {
      .after {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        padding: 50px 17px 43px;
        background: rgba(0, 0, 0, .6);
        text-align: left;
      }
    }
  }
  .after {
    button {
      padding: 6px 9px;
      border-radius: 3px;
      border: none;
      background: #fff;
      color: #464646;
      outline: none;
      cursor: pointer;
    }
    h4 {
      margin: 0px;
      padding: 0px;
    }
    p{
      font-size: .8rem;
      opacity: .5;
      margin-top: 3px;
    }
  }
  p {
    margin: 0px;
    padding: 0px;
  }
  .overlay {
    background: #F5F6FA;
    position: absolute;
    margin: 5rem 0 7rem;
    height: 70rem;
    left: 0;
    right: 0;
  }
  .navbar {
    height: 2rem;
    margin-bottom: 2rem;
    .cart {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;
      span {
        font-weight: 600;
        color: #333333;
      }
    }
  }
  .fa-shopping-cart {
    font-size: 14px;
    color: #333333;
  }
  .product-detail {
    display: none;
  }
  section {
    margin-top: 2rem;
    text-align: left;
    h4 {
      font-size: 2rem;
      color: #333333;
      margin-bottom: 0;
    }
    p {
      color: #858585;
      margin-top: .8rem;
      font-weight: 600;
      line-height: 19px;
      font-size: .9rem;
    }
  }
  .footer {
    display: flex;
    width: 762px;
    justify-content: space-between;
    margin: 8rem auto;
    .liner {
      border: 1px solid #CDCDCD;
      width: 23%;
      align-self: center;
    }
    .foot-insta {
      background: #000;
      padding: 3px;
      width: 30%;
      color: #fff;
      h4 {
        font-weight: 500;
        letter-spacing: 2px;
      }
    }
  }
}
@media (max-width: 799px) {
  #content {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 4rem;
    width: auto;
    margin: 0 1rem;
    display: grid;
    position: relative;
    .item-box {
      position: relative;
      height: 317px;
      display: flex;
      justify-content: center;
      align-items: center;
      .price-tag {
        display: block;
      }
    }
  }
  .overlay {
    background: #EDE3D8;
    position: absolute;
    top: 34%;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70rem;
  }
  .wrapper {
    display: none;
  }
  .mobile-nav {
    height: auto;
    width: 100%;
  }
  #mobile-header {
    position: absolute;
    display: flex;
    justify-content: center;
    height: 4rem;
    width: 100%;
    background: #F6F6F6;
    top: 0;
    left: 0;
    z-index: 30000;
    h4 {
      font-weight: 900;
      margin-left: 5rem;
    }
  }
  .mobile-cart {
    position: relative;
    margin-left: 3rem;
    align-self: center;
  }
  .mobile-cart-counter {
    position: absolute;
    height: 20px;
    width: 20px;
    line-height: 20px;
    background: #F5A623;
    border-radius: 50%;
    bottom: .5rem;
    left: 9px;
    color: #000;
    font-size: 11px;
    font-weight: 600;
  }
  .nav-story {
    margin-top: 5rem;
    margin-bottom: 2rem;
    text-align: left;
    letter-spacing: 1.3px;
    margin-left: 1rem;
    letter-spacing: 2.3px;
    font-size: smaller;
  }
  .product-detail {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 100%;
    z-index: 6000;
    float: left;
    width: 100%;
    .product-title {
      margin-top: 10px;
      text-align: left;
      font-size: small;
      h4 {
        margin: 0px;
      }
    }
  }
  p {
    margin: 0px;
  }
  .add-to-cart {
    padding: 6px;
    background: #F5A623;
    width: 7.6rem;
    border: none;
    outline: none;
    text-align: center;
    font-weight: 600;
    margin-top: 13px;
    cursor: pointer;
  }
  .remove-from-cart {
    padding: 6px;
    background: #F5A623;
    width: 7.6rem;
    border: none;
    outline: none;
    text-align: center;
    font-weight: 600;
    margin-top: 13px;
    cursor: pointer;
    width: 8.6rem;
  }
  .load-more {
    margin-top: 4rem;
  }
  .loader {
    &:before {
      bottom: auto;
      left: 43%;
    }
  }
  .footer {
    display: flex;
    width: auto;
    justify-content: space-between;
    margin: 9rem auto;
    .liner {
      border: 1px solid #CDCDCD;
      width: 23%;
      align-self: center;
    }
    .foot-insta {
      background: #000;
      padding: 3px;
      width: 30%;
      color: #fff;
      h4 {
        font-weight: 500;
        letter-spacing: 2px;
      }
    }
  }
}

</style>
