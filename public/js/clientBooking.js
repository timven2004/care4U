const fetchingData = async () => {
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
const choosenTimeSlot = document.querySelector("#choosenTimeSlot")
const choosenTimeSlotId = document.querySelector("#choosenTimeSlotId")



async function load() {

    const data = await fetchingData();
    const availableDatesArray = data.map(obj => {
        return obj.time_start.slice(0, 10)
    })
    console.log(data);
    const myCalendar = new TavoCalendar('#my-calendar', {
        date: "2037-01-01",
        past_select: "true",
        highlight: availableDatesArray,
        highlight_sunday: false
    })

    // const render = () => {
    //     const calenderdayArray = document.querySelectorAll(".tavo-calendar__day")
    //     for (let i = 0; i < calenderdayArray.length - 1; i++) {
    //         calenderdayArray[i].addEventListener("click", () => {
    //             console.log(`day ${i} clicked!`)
    //         })
    //     }

    // }

    // render();

    // const lastMonthButton = document.querySelector(".tavo-calendar__nav_prev")
    // const nextMonthButton = document.querySelector(".tavo-calendar__nav_next")
    // lastMonthButton.addEventListener("click", render);
    // nextMonthButton.addEventListener("click", render);

    const calendar = document.querySelector("#my-calendar");
    const timeSlots = document.querySelector("#timeSlots");

    calendar.addEventListener("calendar-select", (ev) => {
        console.log(myCalendar.getSelected());

        choosenTimeSlot.value = ``;
        choosenTimeSlotId.value = null;
    

        const availableDatesArray = data.filter(obj => {
            return obj.time_start.slice(0, 10) == myCalendar.getSelected()
        })
       
        console.log(availableDatesArray)

        let timeSlotsStr = availableDatesArray.map((obj) => {
            let startTime = new Date(obj.time_start)
            let endTime = new Date(obj.time_end)
            let id = obj.id
            const singleDigit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            let startTimeStr = `${startTime.getHours()}:${singleDigit.includes(startTime.getMinutes()) ? "0" + startTime.getMinutes() : startTime.getMinutes()}`;
            let endTimeStr = `${endTime.getHours()}:${singleDigit.includes(endTime.getMinutes()) ? "0" + endTime.getMinutes() : endTime.getMinutes()}`
            let wholeTimeStr = `${startTimeStr} - ${endTimeStr}`
            return `
            <button class="availableTimeBtn btn btn-success" onclick=selectTime("${startTimeStr}","${endTimeStr}",${id})>
            <h2>${wholeTimeStr}</h2>
            <div class="doctor">${obj.doctor_name}</div>
            </button>
            `})

        timeSlotsStr = timeSlotsStr.join("")

        timeSlots.innerHTML =
            `<h1>${myCalendar.getSelected()}</h1>
 
        
        ${timeSlotsStr}
        `



    })

}

const selectTime = async (startTime, endTime, timeSlotId) => {
    choosenTimeSlot.value = `${startTime} - ${endTime}`;
    choosenTimeSlotId.value = timeSlotId;
}

load();

