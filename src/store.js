import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import {saveToLocal} from './helper'

const cart = JSON.parse(localStorage.getItem("cart"));

export default new Vuex.Store({
  state: {
  	products:[],
    productToLoad: 10,
    loading: null,
    cart: cart || [],
    quantity: 1,
    checkoutSuccess: false,
    checkoutMessage: '',
    showModal: false,

  },
  mutations: {
    setProducts(state,products){
      let productLength = state.products.length;
      state.products.push(...products.splice(productLength, state.productToLoad))

    },
    setLoading(state,boolean){
      state.loading = boolean;
    },
    addToCart(state, product) {
      var found = false;

      for (var i = 0; i < state.cart.length; i++) {

        if (state.cart[i].id === product.id) {
          var newProduct = state.cart[i];
          newProduct.quantity += state.quantity;
          Vue.set(state.cart, i , newProduct);
          found = true;
          break;
        }
      }

      if(!found) {
        product.quantity = state.quantity;
        state.cart.push(product);
      }

      state.quantity = 1;
      saveToLocal(state);
    },
    incrementQuantity(state){
      state.quantity++
    },
    decrementQuantity(state){
      if(state.quantity > 1){
        state.quantity--;
      }
    },
    removeProduct(state, product) {
      for (var i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id === product.id) {
          Vue.delete(state.cart, i);
          break;
        }
      }
      saveToLocal(state);
    },
    setCheckoutMessage(state, message){
      state.checkoutMessage = message;
      state.checkoutSuccess = true;
      setTimeout(()=>{
        state.checkoutSuccess = false;
      }, 5000)

    },
    setModalDisplay(state, boolean){
      state.showModal = boolean;
    }
  
  },
  actions: {
  	getProducts({commit}){
     commit('setLoading',true)
     //timout helps to show loader
     setTimeout(function(){
        axios.get('products.json')
            .then(({data})=>{
             commit('setProducts',data.products)
             commit('setLoading',false)
            })
     }, 3000)
    
  	},
    async checkout({commit, state}){
      axios.post('http://www.mocky.io/v2/5be477442f00004900d9f521',state.cart)
            .then(({data})=>{
             commit('setModalDisplay', false);
             commit('setCheckoutMessage', data.message);
             state.cart = [];
             saveToLocal(state);
            })
    },
    increaseProductQuantity({commit, state}, index){
      let product = state.cart[index];
      product.quantity++;
      Vue.set(state.cart, index , product);
      saveToLocal(state);
    },
    reduceProductQuantity({commit, state}, index){
      let product = state.cart[index];
      product.quantity--;
      if(product.quantity <= 0){
        commit('removeProduct', product)
        return;
      }
      Vue.set(state.cart, index , product);
      saveToLocal(state);
    },
  },
  getters:{
    commafy: (state) => (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }, 
    itemExist: (state) => (product) => {
      return !!state.cart.find(item => item.id === product.id)
    },
    cartSize(state) {
      var cartSize = 0;

      for (var i = 0; i < state.cart.length; i++) {
        cartSize += state.cart[i].quantity;
      }

      return cartSize;
    },
    cartTotalAmount(state) {
      let total = 0;
      if(state.cart.length > 1){

        state.cart.forEach(item=>{
          total += parseInt(item.price) * parseInt(item.quantity);
        });

        return total;

      }
      if(state.cart.length == 1){
        return parseInt(state.cart[0].price) * parseInt(state.cart[0].quantity)
      }

      return 0;
    },
  },
});
