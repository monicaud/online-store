function displayCart() {
    document.getElementById("cart_details").innerHTML = "";
    var sessionCartData = sessionStorage.getItem("cart");
    //console.log(sessionCartData)
    var cartData = JSON.parse(sessionCartData);
    //console.log(cartData);

    var table = document.createElement("table");
    table.setAttribute("class", "table table-striped table-bordered");

    var thead = document.createElement("thead")
    thead.setAttribute("class", "thead-dark");

    var trH = document.createElement("tr");

    var th0 = document.createElement("th")
    th0.setAttribute("scope", "col");
    th0.innerHTML = "Item Name"

    var th1 = document.createElement("th")
    th1.setAttribute("scope", "col");
    th1.innerHTML = "Price"

    var th2 = document.createElement("th");
    th2.setAttribute("scope", "col");
    th2.innerHTML = "Delete Item"

    trH.appendChild(th0);
    trH.appendChild(th1);
    trH.appendChild(th2);

    thead.appendChild(trH);
    table.appendChild(thead);
    var tbody = document.createElement("tbody")
    for(var i = 0; i < cartData.length; i++) {
        var tr = document.createElement("tr");
        var td0 = document.createElement("td");
        td0.innerHTML = cartData[i].item;
        var td1 = document.createElement("td");
        td1.innerHTML = "$" + parseFloat(cartData[i].price).toFixed(2);
        var td2 = document.createElement("td");
        var delete_button = document.createElement("button");
        delete_button.setAttribute("type", "button");
        delete_button.setAttribute("class", "btn btn-primary"); //maybe change this to fit aesthetic...
        delete_button.setAttribute("onclick", "deleteItem('" + cartData[i].item + "', " + cartData[i].price + ")")
        delete_button.innerHTML = "Delete Item"
        td2.appendChild(delete_button);
        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    document.getElementById("cart_details").appendChild(table);

    var p = document.createElement("p");
    var checkoutTotal = 0;

    for(var j = 0; j < cartData.length; j++) {
        checkoutTotal += cartData[j].price
    }
    checkoutTotal = checkoutTotal.toFixed(2);
    p.innerHTML = "Total Price: $" + checkoutTotal;
    document.getElementById("cart_details").appendChild(p);
    var br = document.createElement("br")

    var checkoutButton = document.createElement("button");
    checkoutButton.setAttribute("type", "button");
    checkoutButton.setAttribute("class", "btn btn-primary"); //maybe change this to fit aesthetic...
    checkoutButton.innerHTML = "Checkout";
    checkoutButton.setAttribute("onclick", "checkout(" + checkoutTotal + ");");
    document.getElementById("cart_details").appendChild(br);
    document.getElementById("cart_details").appendChild(checkoutButton);
    
}

const deleteItem = async (item, price) => {
    //console.log(item);
    //console.log(price);
    var userID = parseInt(sessionStorage.getItem("userid"));
    var jsonBody = {userid: userID, item: item, price: price};
    var sessionCartData = sessionStorage.getItem("cart");
    var cartData = JSON.parse(sessionCartData);
    //console.log(cartData);
    for(var j = 0; j < cartData.length; j++) {
        if(cartData[j].item == item && cartData[j].price == price) {
            cartData.splice(j, 1);
        }
    }
    console.log(cartData);
    sessionStorage.setItem("cart", JSON.stringify(cartData));
    await fetch('/api/shop/deleteCartItem', {
        method: 'PUT',
        body: JSON.stringify(jsonBody),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    alert("Item Deleted Successfully!");
    location.reload();
}

const getCurrentUser2 = async () => {
    let currentUser = {id: parseInt(sessionStorage.getItem("userid"))};
    var data = await fetch('/api/user/getUser', {
        method: 'POST',
        body: JSON.stringify(currentUser),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return data.json();
}

const checkout = async (checkoutTotal) => {
    var user = await getCurrentUser2();
    if(user != null){
        console.log(user.funds);
        user.funds = user.funds - checkoutTotal;
        console.log(user.funds);
        if(user.funds >= 0) {
            var userID = parseInt(sessionStorage.getItem("userid"));
            var jsonBody = {id: userID, funds: user.funds.toFixed(2)}
            await fetch ('/api/user/updateUserFunds', {
                method: 'PUT', 
                body: JSON.stringify(jsonBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await fetch(`/api/shop/deleteCart/${userID}`, {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let cart = [];
            sessionStorage.setItem("cart", JSON.stringify(cart));
            alert("Checkout successful! Your funds have been updated and expect your items to be delivered soon!");
            location.href='shop.html';
        } else {
            alert("You don't have enough funds in your account to make this purchase...");
            location.href='shop.html';
        }
    } else{
        alert("You don't have any funds in your account...");
        location.href='shop.html';
    }

}