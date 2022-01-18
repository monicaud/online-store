const getData = (locationthis ="") => {
    const formData = {};
    document.querySelectorAll('.inputfield').forEach(input => {
        formData[input.name] = input.value;
    });
    resetForm();
    if(locationthis == ""){
        location.reload();
    }
    console.log("got data");
    return formData;
}
const resetForm = () => {
    document.querySelectorAll('.inputfield').forEach(input => input.value = '');
}

const addProduct = async()=>{
    //Post function
    console.log("In add product js")
    await fetch('/api/admin/addProduct', {
        method: 'POST', 
        body: JSON.stringify(getData()),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    alert("Product added");
    location.reload();
}