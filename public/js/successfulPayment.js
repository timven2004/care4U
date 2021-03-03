


fetch("/successfulPayment", {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  body: JSON.stringify() // body data type must match "Content-Type" header
  }).then((result)=>console.log(result.json()))