const fetchingData = async (userId) => {
    const response = await fetch(`/api/availableTimeSlots/`, {
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

console.log(fetchingData);

const myCalendar = new TavoCalendar('#my-calendar', {
    date: "2037-01-01",
    past_select:"true",
})

