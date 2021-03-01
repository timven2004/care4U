const userAnalysisForm = document.querySelector("#analysis-form")


userAnalysisForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Serialize the Form afterwards
    const form = this;
    const formObject = {};

    formObject['insomiaForm'] = form.insomiaForm.value;
    formObject['depressedForm'] = form.depressedForm.value;
    formObject['panicForm'] = form.panicForm.value;
    formObject['otherSymptomsForm'] = form.otherSymptomsForm.value;

    const res = await fetch('/api/createUserQuestionnaire', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formObject)
    });
    const result = await res.json();
    console.log(result);
    widnow.location.href = "/html/booking.html"

})