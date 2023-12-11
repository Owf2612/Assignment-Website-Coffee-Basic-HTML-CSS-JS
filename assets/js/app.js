let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = () => {
    // remove datas default from HTML

        // add new datas
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    let positionProduct = products.findIndex((value) => value.id == product_id);

    if (positionProduct >= 0) {
        let product = products[positionProduct];

        // Check if the quantity in the cart plus the quantity to be added is greater than 10
        if (positionThisProductInCart >= 0 && cart[positionThisProductInCart].quantity + 1 > 10) {
            alert(`Sorry, ${product.name} is not in stock. You cannot order more than 10 of this product.`);
        } else if (cart.length <= 0) {
            cart = [{
                product_id: product_id,
                quantity: 1
            }];
        } else if (positionThisProductInCart < 0) {
            cart.push({
                product_id: product_id,
                quantity: 1
            });
        } else {
            cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
        }

        addCartToHTML();
        addCartToMemory();
    }
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    
    if (positionItemInCart >= 0) {
        let info = cart[positionItemInCart];
        let positionProduct = products.findIndex((value) => value.id == product_id);
        let productName = positionProduct >= 0 ? products[positionProduct].name : 'Unknown Product';

        switch (type) {
            case 'plus':
                // Check if adding one more exceeds the limit of 10
                if (info.quantity + 1 > 10) {
                    alert(`Sorry, ${productName} is not in stock. You cannot order more than 10 of this product.`);
                } else {
                    cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                }
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    // get data product
    fetch('../assets/products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();

//show notification Order Successful
document.addEventListener('DOMContentLoaded', function() {
    const checkOutButton = document.querySelector('.checkOut');
    checkOutButton.addEventListener('click', function() {
        // Show notification
        alert('Order Successful! Your order has been placed successfully!');
        
        // Clear the cart and update HTML and memory
        clearCart();
    });
});

// Clear the cart
const clearCart = () => {
    cart = []; // Clear the cart array
    addCartToHTML(); // Update the cart in the HTML
    addCartToMemory(); // Update the cart in the local storage
};

