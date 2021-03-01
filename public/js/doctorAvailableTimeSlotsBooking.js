


function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = `0${a.getDate()}`.substr(-2);
    var hour = `0${a.getHours()}`.substr(-2);
    var min = `0${a.getMinutes()}`.substr(-2);
    var sec = `0${a.getSeconds()}`.substr(-2);
    var time = `${year}-${month}-${date}T${hour}:${min}` ;
    return time;
  }
  const timeNow = (timeConverter(Date.now()));
  


const submissionForm = document.querySelector("#submissionForm");
let formStr = ""
for (let i =0;i<7;i++){
    formStr=formStr + `
    <div>
    <label for="choosenTimeSlot">時段</label>
    <input type="datetime-local" id="choosenTimeSlotId" name="timeStart[${i}]" step="3600" min=${timeNow}>
    <input type="datetime-local" id="choosenTimeSlotId" name="timeEnd[${i}]" step="3600" min=${timeNow}>
    </div>
    `
    
}

formStr = formStr + `        <button class="btn btn-danger" type="submit">確認提交</button>
`
submissionForm.innerHTML = formStr