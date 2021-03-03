const username = document.querySelector("#doctorName");
const email = document.querySelector("#doctorEmail");
const phone = document.querySelector("#doctorPhone");
const description = document.querySelector("#doctorDescription")
const bookedDisply= document.querySelector("#bookedDisplay");
const bookedHistory= document.querySelector("#bookedHistory");


const id = searchParams.get("doctorId")
const fetchingData = async (userId) => {
    const response = await fetch(`/api/doctorProfile/`, {
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
    description.innerHTML = data[0].description

    let bookingsStr = "";
    let pastBooking = ""
    for (let booking of data[1]) {
      let time = new Date(booking.time)
      if(( time - Date.now())>0){    
        bookingsStr=bookingsStr + ` <div class="p-4 rounded shadow-sm bg-light my-3">
          <p class="font-italic mb-0"><span id="toBeTherapyDate" class="mx-2">${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()}</span><span
                  id="toBeTherapyTime" class="mx-2">${`0${time.getHours()}`.substr(-2)}:${`0${time.getMinutes()}`.substr(-2)}</span><span id="Doctor"
                  class="mx-2">${booking.name}</span></p>
           <p class="font-italic my-2"><div class="mx-2">預約前問卷：</div><div class="mx-2">失眠：一周${booking.insomnia}天</div> <div class="mx-2">抑鬱：一周${booking.depressed}天</div> <div class="mx-2">焦慮：一周${booking.panic}天</div> <div class="mx-2">其他症狀：一周${booking.other_symptoms}天</div></p>
        </div>`
    } else {pastBooking = pastBooking + ` <div class="p-4 rounded shadow-sm bg-light my-3">
    <p class="font-italic mb-0"><span id="toBeTherapyDate" class="mx-2">${time.getYear()}/${time.getMonth()}/${time.getDate}</span><span
            id="toBeTherapyTime" class="mx-2">${`0${time.getHours()}`.substr(-2)}:${`0${time.getMinutes()}`.substr(-2)}</span><span id="Doctor"
            class="mx-2">${booking.name}</span></p>
  </div>`}
    }
    bookedDisplay.innerHTML=bookingsStr;
    bookedHistory.innerHTML=pastBooking;
    console.log(data)
  
});