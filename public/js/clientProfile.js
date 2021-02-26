const username = document.querySelector("#clientName");
const email = document.querySelector("#clientEmail");
const phone = document.querySelector("#clientPhone");
const searchParams = new URLSearchParams(window.location.search);
const bookedDisply= document.querySelector("#bookedDisplay");
const bookedHistory= document.querySelector("#bookedHistory");


const id = searchParams.get("id")
const fetchingData = async (userId) => {
    const response = await fetch(`/api/userProfile/${userId}`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify() // body data type must match "Content-Type" header
    })
    return response.json()
}

fetchingData(id).then(data=>{
    
    username.innerHTML = data[0].name;
    email.innerHTML = data[0].email;
    phone.innerHTML = data[0].telephone;

});
