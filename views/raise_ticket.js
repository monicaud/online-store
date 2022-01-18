const getData = () => {
    const formData = {};
    document.querySelectorAll('input').forEach(input => {
        formData[input.id] = input.value;
    });
    return formData;
}

const sendTicket = async () => {
    console.log(JSON.stringify(getData()));
    await fetch('/api/shop/saveTicket', {
        method: 'POST', 
        body: JSON.stringify(getData()),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    alert("Ticket was sent successfully!");
    window.location.href = "/index1.html"
}

const resetForm = () => {
    document.querySelectorAll('input').forEach(input => input.value = '');
}