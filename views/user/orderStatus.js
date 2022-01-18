//Mia Pranckus
//functions to get the current order status

//defined in user.router which calls employee.controller empUpdateOrder
const getCurrentOrderStatus = async () =>{
    let data = await fetch("/api/user/orderStatus.html");
    return data.json();
}

const showOrderStatus = async () => {
    var status = await getCurrentOrderStatus();
    console.log(status);
    if(status != null){
        console.log(status.status);
        //perform switches
        switch(status.status){
            case "Shipped":
                document.getElementById("progressbar").style.width = "20%";
                document.getElementById("progressbar").ariaValueNow = "20";
                document.getElementById("card1").style.backgroundColor = "green";
                document.getElementById("card1").style.color = "white";
                break;
            case "Out for Delivery":
                document.getElementById("progressbar").style.width = "45%";
                document.getElementById("progressbar").ariaValueNow = "45";
                document.getElementById("card2").style.backgroundColor = "green";
                document.getElementById("card2").style.color = "white";
                break;
            case "Delivered":
                document.getElementById("progressbar").style.width = "70%";
                document.getElementById("progressbar").ariaValueNow = "70";
                document.getElementById("card3").style.backgroundColor = "green";
                document.getElementById("card3").style.color = "white";
                break;
            case "Cancelled":
                document.getElementById("progressbar").style.width = "100%";
                document.getElementById("progressbar").className = "progress-bar bg-danger";
                document.getElementById("progressbar").ariaValueNow = "100";
                document.getElementById("card4").style.backgroundColor = "red";
                document.getElementById("card4").style.color = "white";
                break;
        } //end switch
    }else{
        console.log("Status is empty!");
    }
    
}