const getUserName = async () => {
    var user = await getCurrentUser();
    if(user != null) {
        console.log(user.name);
        document.getElementById("username").innerHTML = user.name;
    } else {
        console.log("no user found...")
    }
}
const getCurrentUser = async () => {
    let currentUser = {name: sessionStorage.getItem("name")}
    console.log(currentUser);
    var data = await fetch('/api/admin/getUser', {
        method: 'POST',
        body: JSON.stringify(currentUser),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return data.json();
}
function loadAddProducts() {
    document.getElementById("content").innerHTML = '<object type="text/html" data="addProducts.html" style="width:100%; height:100%"></object>';
}
function loadDeleteProducts() {
    document.getElementById("content").innerHTML = '<object type="text/html" data="deleteproduct.html" style="width:100%; height:100%"></object>';
}
function loadUpdateProducts() {
    document.getElementById("content").innerHTML = '<object type="text/html" data="updateProducts.html" style="width:100%; height:100%"></object>';
}
function loadAddEmployees() {
    document.getElementById("content").innerHTML = '<object type="text/html" data="addemp.html" style="width:100%; height:100%"></object>';
}
function loadDeleteEmployees() {
    document.getElementById("content").innerHTML = '<object type="text/html" data="deleteEmp.html" style="width:100%; height:100%"></object>';
}
function loadReports() {
    document.getElementById("content").innerHTML = '<object type="text/html" data="generateReports.html" style="width:100%; height:100%"></object>';
}
function clearSessionStorage() {
    sessionStorage.clear();
}