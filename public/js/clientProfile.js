const username = document.querySelector("#clientName");
const email = document.querySelector("#clientEmail");
const phone = document.querySelector("#clientPhone");
const searchParams = new URLSearchParams(window.location.search);
const bookedDisplay = document.querySelector("#bookedDisplay");
const bookedHistory = document.querySelector("#bookedHistory");
const paymentHistory = document.querySelector("#paymentHistory")
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
  return response.json();
}

const fetchingPaymentHistory = async () => {
  const response = await fetch(`/api/paymentHistory`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify() // body data type must match "Content-Type" header
  })
  return response.json();
}

fetchingData(id).then(data => {

  username.innerHTML = data[0].name;
  email.innerHTML = data[0].email;
  phone.innerHTML = data[0].telephone;
  let bookingsStr = "";
  let pastBooking = ""
  for (let booking of data[1]) {
    let time = new Date(booking.time)
    if ((time - Date.now()) > 0) {
      bookingsStr = bookingsStr + ` <div class="p-4 rounded shadow-sm bg-light my-3">
        <p class="font-italic mb-0"><span id="toBeTherapyDate" class="mx-2">${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}</span><span
                id="toBeTherapyTime" class="mx-2">${`0${time.getHours()}`.substr(-2)}:${`0${time.getMinutes()}`.substr(-2)}</span><span id="Doctor"
                class="mx-2">${booking.name}</span></p>
      </div>`
    } else {
      pastBooking = pastBooking + ` <div class="p-4 rounded shadow-sm bg-light my-3">
  <p class="font-italic mb-0"><span id="toBeTherapyDate" class="mx-2">${time.getYear()}/${time.getMonth()}/${time.getDate()}</span><span
          id="toBeTherapyTime" class="mx-2">${`0${time.getHours()}`.substr(-2)}:${`0${time.getMinutes()}`.substr(-2)}</span><span id="Doctor"
          class="mx-2">${booking.name}</span></p>
</div>`}
  }
  bookedDisplay.innerHTML = bookingsStr;
  bookedHistory.innerHTML = pastBooking;
  console.log(data)
});

fetchingPaymentHistory().then(data => {
  console.log(data);
  let paymentStr ="";
  for (let payment of data) {
    let time = new Date(payment.payment_date);
    paymentStr = paymentStr + 
    `   <div class="p-4 rounded shadow-sm bg-light my-3">
    <p class="font-italic mb-0"><span id="toBeTherapyDate" class="mx-2">${time.getFullYear()}/${time.getMonth()}/${time.getDate()}</span><span
            id="toBeTherapyTime" class="mx-2">${time.getHours()}:${time.getMinutes()}</span>
        <span id="Doctor" class="mx-2">${payment.doctor_name}</span>
        <div>
        <span class="mx-2">費用：$${payment.consultation_fee/100}</span>
        <span class="mx-2">服務費：$${payment.service_fee/100}</span>
        <span class="mx-2">總額：$${(payment.consultation_fee + payment.service_fee)/ 100}</span>
        <span class="mx-2">交易狀態：${payment.is_success? "成功":"不成功"}</span>
        <span class="mx-2">記錄號碼：${payment.id}</span>
      </div>

    </p>
</div>
`

  }
paymentHistory.innerHTML=paymentStr;
})