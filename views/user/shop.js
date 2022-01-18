if(sessionStorage.getItem("cart") == undefined) {
    let cart = [];
    sessionStorage.setItem("cart", JSON.stringify(cart));
    //ON LOG OUT SET CART TO EMPTY ARRAY AGAIN!!!
}

const getUserCarts = async () => {
    var user_carts = await fetch('/api/shop/getUserCarts');
    //console.log(user_carts);
    return user_carts.json();
}

function addItem(item, price) {
    var cartData = JSON.parse(sessionStorage.getItem('cart'));
    // console.log(cartData);

    // console.log(item);
    // console.log(price);

    cartData.push({
        "item" : item,
        "price" : price
    })
    sessionStorage.setItem("cart", JSON.stringify(cartData));

    updateCart();
}


function updateCart() {
    document.getElementById('cart-size').innerHTML = ''
    var cartData = JSON.parse(sessionStorage.getItem('cart'));
    var counter = 0;
    for(var k = 0; k < cartData.length; k++) {
        counter++;
    }
    document.getElementById('cart-size').innerHTML = 'Cart Size: ' + counter;
}

const  loadProducts = async () =>{
    var data = await fetch('/api/shop/getProducts');
    console.log("load products")
    console.log(data);
    return data.json();
}

const showProducts = async ()=>{
    console.log("in show prod");
    updateCart()
    var products = await loadProducts();
    console.log(products);
    
    var productsTable = document.getElementById('products');
    var divrow = "<div class=\"row shopitem\">";
    var divcol = "<div class=\"col-3\"></div><div class=\"col-6 border border-secondary\">";
    var divcard = "<div class = \"card\">";
    let cardStart2 = " <div class = \"card-body\">";
    var enddiv = "</div>";
    var thisItem = '';
    for (var i = 0; i < products.length; i++) {
        var addItemButton = "<input type=\"button\" class=\"btn\" onclick=\"addItem(\'" 
        + products[i].name+"\',"+ parseFloat(products[i].price).toFixed(2) + ")\" value=\"Add Item\">";

        var img = "<img src=\"" + products[i].url +"\" class = \"card-img-top\">";
        thisItem+= "<h2>Name:</h2><p>" + products[i].name + "</p><h2>Price:</h2><p>$" + parseFloat(products[i].price).toFixed(2) + "</p>";

        productsTable.innerHTML += divrow + divcol + divcard + img+ cardStart2 + thisItem + addItemButton+ enddiv +enddiv+ enddiv;
        thisItem = ""; 
    }
}

const saveCartItems = async () => {
    //need to get user id from session storage
    var cartData = await getUserCarts(); //should get userID from storage
    var userID = parseInt(sessionStorage.getItem("userid"));
    console.log(userID);
    console.log(cartData);
    //should get userID from storage in the code below
    if(cartData.length == 0) {
        cartData = JSON.parse(sessionStorage.getItem('cart'));
        console.log(cartData);
        var jsonBody = {userid: userID, cart: cartData};
        await fetch('/api/shop/saveCart', {
            method: 'POST', 
            body: JSON.stringify(jsonBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        alert("saving new cart...");
        location.href='display_cart.html';
    } else {
        cartData = JSON.parse(sessionStorage.getItem('cart'));
        var jsonBody = {userid: userID, cart: cartData};
        await fetch('/api/shop/updateCart', {
            method: 'PUT',
            body: JSON.stringify(jsonBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        alert("updating cart...");
        location.href='display_cart.html';
    }
}