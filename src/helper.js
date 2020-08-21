 export function saveToLocal(state){
	localStorage.removeItem("cart");
  localStorage.setItem("cart", JSON.stringify(state.cart));
}

