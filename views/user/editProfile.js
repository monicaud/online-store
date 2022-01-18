//Mia Pranckus - Learner 4

//get the newly inputted data from the form
const getProfile = async () => {
    var jsonBody = {id: parseInt(sessionStorage.getItem("userid"))};
    var data = await fetch("/api/user/editProfile.html", {
        method: 'POST', 
        body: JSON.stringify(jsonBody),
        headers: {
            'Content-Type': 'application/json'
        }
    }); //defined in user.router.js to call loadUserInfo in user.controller
    return data.json();
}

const updateUserInfo = async () => {
    //console.log(JSON.stringify(getData()));
    //updateProfile called in the user.router which says to call updateUserInfo in user.controller to update the database
    var jsonBody = {
        id: parseInt(sessionStorage.getItem("userid")),
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    await fetch('/api/user/editProfile', {
        method: 'PUT', 
        body: JSON.stringify(jsonBody),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    //console.log(document.getElementById("name").value);
    alert("Profile Updated Successfully!");
};

const loadData = async () => {
    //data returned from the controller in json format
    //load the json data into the form values
    var profileInfo = await getProfile();
    console.log(profileInfo);
    console.log(profileInfo.name);
    console.log(profileInfo.email);
    console.log(profileInfo.password);
        
    document.getElementById("name").value = profileInfo.name;
    document.getElementById("email").value = profileInfo.email;
    document.getElementById("password").value = profileInfo.password;
    //document.getElementById("address").value = profileInfo[i].address;
    //document.getElementById("city").value = profileInfo[i].city;
    //document.getElementById("state").value = profileInfo[i].state;
    //document.getElementById("zipcode").value = profileInfo[i].zipcode;
}

