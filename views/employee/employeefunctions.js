const getLoginData = (locationthis ="") => {
    const formData = {};
    document.querySelectorAll('.inputfield').forEach(input => {
        formData[input.name] = input.value;
    });
    resetForm();
    return formData;
}

const getData = (locationthis ="") => {
    const formData = {};
    document.querySelectorAll('.inputfield').forEach(input => {
        formData[input.name] = input.value;
    });
    resetForm();
    if(locationthis == ""){
        location.reload();
    }
    
    return formData;
}

const resetForm = () => {
    document.querySelectorAll('.inputfield').forEach(input => input.value = '');
}

const getTickets = async () => {
    var tickets = await fetch('/api/employee/empGetTickets');
    console.log("get tickets function");
    return tickets.json();
}

const displayTickets = async () => {
    console.log("display tickets");
    var tTable = document.getElementById("tickets");
    var tickets = await getTickets();
    console.log(tickets);
    for (var i = 0; i < tickets.length; i++) {
        let delButton = "<input type=\"button\" value=\"Unlock\" onClick=\"unlockUser(\'"+tickets[i].username +"\')\">";
        tTable.innerHTML += '<tr><td>' + tickets[i].name + '</td><td>' + tickets[i].email + '</td><td>' + tickets[i].username 
        + '</td><td>' + tickets[i].description +'</td><td>'+ delButton +'</td>'+ '</tr>';
    }
}

const logout = ()=>{
    sessionStorage.setItem("userid", '');
}

const unlockUser = async(username)=>{
    
    await fetch(`/api/employee/empUnlockUser/${username}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    window.location.href = "unlockuser.html"
}

const getThisUser = async()=>{
    // var user = await fetch('/employee/empGetUser');
    // console.log(user.json());
    let thisuser = {id: sessionStorage.getItem("userid")};
    console.log(thisuser);
    var data = await fetch('/api/employee/empGetUser', {
        method: 'POST',
        body: JSON.stringify(thisuser),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return data.json();
}

const getUserName = async() => {
    var emp = await getThisUser();
    if(emp != null) {
        console.log(emp.name);
        document.getElementById('username').innerHTML = emp.name;
    } else {
        console.log("sorry it's empty");
    }
}

const getUserId = () => {
    document.getElementById('username').value = sessionStorage.getItem("userid");
    document.getElementById('username').disabled = true;
}

const editProfile = async(location)=>{
    //Put function
    let res = await fetch('/api/employee/empEditProfile', {
        method: 'PUT', 
        body: JSON.stringify(getData(location)),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return res.json();
}

const confirmChanges = async()=>{
    let data = await editProfile("dashboard.html");
    if(data != null){
        if(data.modifiedCount !=0){
            alert("Successfully changed password");
            location.href = "dashboard.html";
        }
        else{
            alert("Incorrect creds");
        }
    }
}

const sendRequest = async()=>{
    //Post function
    console.log("In send request js")
    await fetch('/api/employee/empSendRequest', {
        method: 'POST', 
        body: JSON.stringify(getData()),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    alert("Request sent");
    location.reload();
}

const updateOrder = async()=>{
    //Put function
    await fetch('/api/employee/empUpdateOrder', {
        method: 'PUT', 
        body: JSON.stringify(getData()),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    alert("Order updated");
    console.log("here in update order");
    window.location.href = "dashboard.html"
}

const checkEmployee = async ()=> {
    var data = await fetch('/api/employee/empLogin', {
        method: 'POST',
        body: JSON.stringify(getLoginData()),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return data.json();

}
const getEmpLogin = async()=>{
    console.log("in get emp login");
    var emp = await checkEmployee();
    if(emp != null){
        sessionStorage.setItem('userid', emp._id);
        location.href = "dashboard.html"
    } else {
        alert("Somebody a toucha my spaghet!")
    }
    
    console.log(emp);
}

const getOrders = async()=>{
    var orders = await fetch('/api/employee/empGetOrders');
    console.log("get orders");
    return orders.json();
}

const loadOrders = async()=>{
    var orders = await getOrders();
    var orderTable = document.getElementById('ordersTable');
    for (var i = 0; i < orders.length; i++) {
        orderTable.innerHTML += '<tr><td>' + orders[i]._id + '</td><td>' + orders[i].status + '</td>'
        + '<td>' + orders[i].message +'</td></tr>';
    }

}
