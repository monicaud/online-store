//addUserFunds declared in user.router which calls addUserFunds in user.controller
const addFunds = async () => {
    var jsonBody = {id: parseInt(sessionStorage.getItem("userid")), amount: document.getElementById("amount").value}
    await fetch("/api/user/addUserFunds", {
        method: 'PUT',
        body: JSON.stringify(jsonBody),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    alert("Funds added successfully");
    location.reload();
};

const getUserInfo = async () => {
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

const showFunds = async () => {
    var user = await getUserInfo();
    if(user != null){
        console.log(user.funds);
        document.getElementById('currentFunds').innerHTML = "Current Funds: $" + user.funds;
    } else {
        document.getElementById('currentFunds').innerHTML = "You don't have any funds..."
    }
}
