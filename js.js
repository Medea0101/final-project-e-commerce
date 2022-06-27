
const carts = document.querySelectorAll('.add-cart');
const products = [{
    name: 'blue jeans',
    price: 59,
    tag: 'BJ',
    inCart: 0
},
{
    name: 'white jeans',
    price: 46,
    tag: 'WJ',
    inCart: 0
},
{
    name: 'black jeans',
    price: 49,
    tag: 'BLJ',
    inCart: 0
},
]


for (let i = 0; i < carts.length; i ++){
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart').textContent = 'In My Cart '+ productNumbers;
    }
}

function cartNumbers(products){
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.cart').textContent =  'In My Cart '+ (productNumbers + 1);
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart').textContent = 'In My Cart ' + 1;

    }    
    setItems(products)
}

function setItems(products){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){

        if(cartItems[products.tag] == undefined){
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1;
    } else {
        products.inCart = 1;
        cartItems = {
            [products.tag]: products
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(products){
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + products.price)
    }else {
        localStorage.setItem('totalCost', products.price)
    }
    
}

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector('.products');
    let cartCost = localStorage.getItem('totalCost');
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML +=            
           `<div class="product">
                <button class="btn btn-danger" onclick="removeItem()">Remove</button>
                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>               
                <div class="price">${item.price}</div>
                <div class="quantity">
                    ${item.inCart}
                </div>
                <div class="total">${item.inCart * item.price}</div>
            </div>`
        });
        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Cart Total
                </h4>
                <h4 class="basketTotal">
                    ${cartCost}
                </h4>
            </div>
        `
    }
}

const removeCartItemButtons = document.getElementsByClassName('btn btn-danger')
function removeItem(){
    for(let i = 0; i < removeCartItemButtons.length; i++){
        let button = removeCartItemButtons[i]
        button.addEventListener('click', function(event){
            let buttonClicked = event.target
            buttonClicked.parentElement.remove()            
        })
    }
}

// function updateCartTotal(){
//     let cartItemContainer = document.getElementsByClassName('products')[0]
//     let total = 0
//     for (let i = 0; i < cartItemContainer.length; i++){
//         let cartItemContainer = cartItemContainer[i]
//         let itemTotal = document.getElementsByClassName('total')
//         let itemTotalPrice = itemTotal.innerText
//         total = total - itemTotalPrice
//     }
//     document.getElementsByClassName('basketTotal')[0].innerText = total
// }



displayCart()
onLoadCartNumbers()