import menuArray from './data.js';
import shoppingCart from './checkoutCart.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const checkoutEl = document.getElementById("checkout")
const modalEl = document.getElementById("modal-payment")
const paymentForm = document.getElementById("payment-form")
const modalTitle = document.getElementById("modal-title")

document.addEventListener('click', function(event){
    if(event.target.dataset.add){
        handleAddToCartBtn(event.target.dataset.add)
    }
    if(event.target.dataset.remove){
       handleRemoveItemFromCart(event.target.dataset.remove)
    }
    if(event.target.dataset.order){
        modalEl.style.display = "block"
    }
    
})
paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    const paymentformData = new FormData(paymentForm)
    const name = paymentformData.get('name')
    
    modalTitle.textContent = "Uploading your data"
    modalTitle.innerHTML = modalTitle.textContent + `
    <img src="images/loading.svg" class="loading">
    `
    setTimeout(function(){
    modalTitle.textContent = "Making the sale..."
    modalTitle.innerHTML = modalTitle.textContent + `
    <img src="images/loading.svg" class="loading">
    `
    }, 3500)
      
      setTimeout(function(){
        checkoutEl.style.display = "none"
        document.getElementById('modal-payment-container').innerHTML = `
        <p class="order-completed-message" id="order-completed-message">
        Thanks, ${name}! Your order is on its way!
        </p>
        `
        modalEl.style.background = "#ECFDF5"
        modalEl.style.height = "150px"
        modalEl.style.border = "none"
        modalEl.style.borderRadius = "5px"
        modalEl.style.top = "250px"
        modalEl.style.width = "100%"
      }, 5500)
      
      setTimeout(function(){
          modalEl.style.display = "none"
      }, 8500)
})
function handleAddToCartBtn(productId){
    const targetProductObj = menuArray.filter(function(product){
       return product.id == productId
        })[0]
        shoppingCart.push(targetProductObj)
        
        // display flex the checkout modal here
        checkoutEl.style.display = "flex"
        renderCheckoutItems()
        renderCheckoutTotalPrice()
}
function handleRemoveItemFromCart(productId){
     const targetProductObj = shoppingCart.filter(function(product){
       return product.id == productId
        })[0]
        shoppingCart.splice(targetProductObj,1)
       if(shoppingCart.length < 1){
        checkoutEl.style.display = "none"
        console.log(shoppingCart)
        }else{
        renderCheckoutItems()
        renderCheckoutTotalPrice()
       }
}
function getMenu(){
    let menuHtml = ""
    menuArray.forEach((product) => {
    const {
            name,
            characteristics,
            id, 
            price, 
            productImage
            } 
            = product
    menuHtml += `
<div class="menu-item" id="menu-item">
            <img src="${productImage}" class="product-img">
        <div class="item-info" id="item-info">
            <p id="name">${name}</p>
            <p id="characteristics">${characteristics}</p>
            <p id="price">€${price}</p>
        </div>
            <div class="add-to-cart-icon">
                <i class="fa-solid fa-cart-plus" data-add="${id}">
                </i>
            </div>
            <div class="divider" id="divider">
            </div>
</div>
`
})
            return menuHtml
}
function getCheckoutItems(){
    let checkoutItemsHtml = ""
    shoppingCart.forEach((product) => {
        const {
            name,
            characteristics,
            id, 
            price, 
            productImage
            } 
            = product
    checkoutItemsHtml += `
<div class="order" id="order">
        <p class="item-selected" id="item-selected">${name}</p>
        <p class="remove-item-btn" id="remove-item-btn" data-remove="${id}">remove</p>
        <p class="item-price" id="item-price">€${price}</p>
</div>
     `
    })
    return checkoutItemsHtml
}
function getCheckoutTotalPrice(){
    let checkoutTotalPriceHtml = ""
    shoppingCart.forEach((product) =>{
        const {
            name,
            characteristics,
            id, 
            price, 
            productImage
            } 
            = product
    const p = shoppingCart.map(function(product){
            return product.price
        })
        let sum = p.reduce(function(a,b){
            return a+b
        })
       checkoutTotalPriceHtml = `
        <p class="total-price-title" id="total-price-title">Total price:</p>
        <p class="total-price" id="total-price">€${sum}</p>
       `
       })
    return checkoutTotalPriceHtml
}
function renderMenu(){
    document.getElementById("menu").innerHTML = getMenu()
}
function renderCheckoutItems(){
    document.getElementById("checkout-resume").innerHTML = getCheckoutItems()
}
function renderCheckoutTotalPrice(){
    document.getElementById("checkout-price-total").innerHTML = getCheckoutTotalPrice()
}
renderMenu()
renderCheckoutItems()
renderCheckoutTotalPrice()
