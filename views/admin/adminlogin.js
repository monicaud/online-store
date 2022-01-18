const getData = () => {
    var name = document.getElementById("name").value;
    var pass = document.getElementById("pass").value;
         
    var obj={name:name,pass:pass}
    return obj;
}

const checkEmployee = async ()=> {
    var data = await fetch('/api/admin/empLogin', {
        method: 'POST',
        body: JSON.stringify(getData()),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return data.json();

}

const getEmpLogin = async() => {
    console.log("in get emp login");
    var emp = await checkEmployee();
    if(emp != null) {
        location.href = "dashboard.html"
    } else {
        console.log("Employee!!!!")
    }
    console.log(emp);
}

