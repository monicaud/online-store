const getData = () => {
    var name=document.getElementById("pid").value;
    var obj={pid:name}
    return obj;
}

const deleteProduct = async () => {
    console.log("test1");
    console.log(JSON.stringify(getData()));
    
    await fetch('/api/admin/deleteProduct', {
        method: 'DELETE', 
        body: JSON.stringify(getData()),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    alert("product deleted !");
    location.reload();
}