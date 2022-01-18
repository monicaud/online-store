function loadOrderStatus(){
    document.getElementById("content").innerHTML = '<object type="text/html" data="orderStatus.html" style="width:100%; height:100%"></object>'
}

function loadEditProfile(){
    document.getElementById("content").innerHTML = '<object type="text/html" data="editProfile.html" style="width:100%; height:100%"></object>'
}

function loadFunds(){
    document.getElementById("content").innerHTML = '<object type="text/html" data="funds.html" style="width:100%; height:100%"></object>'
}

function loadShop() {
    document.getElementById("content").innerHTML = '<object type="text/html" data="shop.html" style="width:100%; height:100%"></object>'
}

function loadCart() {
    document.getElementById("content").innerHTML = '<object type="text/html" data="display_cart.html" style="width:100%; height:100%"></object>'
}

function clearSessionStorage() {
    //need to reset user id on click
    let cart = [];
    let userid = '';
    sessionStorage.setItem("cart", JSON.stringify(cart));
    sessionStorage.setItem("userid", userid);
}

const getCurrentUser = async () => {
    let currentUser = {id: parseInt(sessionStorage.getItem("userid"))}
    console.log(currentUser);
    var data = await fetch('/api/user/getUser', {
        method: 'POST',
        body: JSON.stringify(currentUser),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return data.json();
}

const getUserName = async () => {
    var user = await getCurrentUser();
    if(user != null) {
        console.log(user.name);
        document.getElementById("username").innerHTML = user.name;
    } else {
        console.log("no user found...")
    }
}