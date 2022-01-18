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

const updateProduct = async()=>{
    //Put function, called in employee.router which calls employee.controller empUpdateOrder
    await fetch('/api/admin/updateProduct', {
        method: 'PUT', 
        body: JSON.stringify(getData()),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    alert("Product updated successfully");
    console.log("here in update product");
}