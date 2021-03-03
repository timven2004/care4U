const userRegForm = document.querySelector("#reg-form");
const userLoginForm = document.querySelector("#login-form");
const doctorLoginForm = document.querySelector("#doctor-login-form");
const doctorRegForm = document.querySelector("#doctor-reg-form");
const switchRegLoginBtn = document.querySelector("#reg-login-switch a");
const switchDocRegLoginBtn = document.querySelector("#reg-login-switch1 a");
let fillingLoginForm = true;
let isLoggedIn = false;


function switchLoginRegForm() {
    userLoginForm.style.display = "block";
    userRegForm.style.display = "none";
    switchRegLoginBtn.innerHTML = "請按此註冊";

    switchRegLoginBtn.addEventListener("click", () => {
        if (!fillingLoginForm) {
            userLoginForm.style.display = "block";
            userRegForm.style.display = "none";
            switchRegLoginBtn.innerHTML = "請按此註冊";
        } else {
            userLoginForm.style.display = "none";
            userRegForm.style.display = "block";
            switchRegLoginBtn.innerHTML = "請按此登入";
        }
        fillingLoginForm = !fillingLoginForm;
    });
}
switchLoginRegForm();


function switchDocLoginRegForm() {
    doctorLoginForm.style.display = "block";
    doctorRegForm.style.display = "none";
    switchDocRegLoginBtn.innerHTML = "請按此建立帳戶";

    switchDocRegLoginBtn.addEventListener("click", () => {
        if (!fillingLoginForm) {
            doctorLoginForm.style.display = "block";
            doctorRegForm.style.display = "none";
            switchDocRegLoginBtn.innerHTML = "請按此建立帳戶";
        } else {
            doctorLoginForm.style.display = "none";
            doctorRegForm.style.display = "block";
            switchDocRegLoginBtn.innerHTML = "請按此登入";
        }
        fillingLoginForm = !fillingLoginForm;
    });
}
switchDocLoginRegForm();


// Submit UX handling
function finishedRegister() {
    const regOrLoginForm = document.querySelector("#reg-or-login-form");
    const formResponse = document.querySelector("#login-response.form-submit-response");

    formResponse.style.display = "flex";
    regOrLoginForm.style.display = "none";
    switchRegLoginBtn.style.display = "none";

    formResponse.addEventListener("click", () => {
        formResponse.style.display = "none";
        switchRegLoginBtn.style.display = "block";
        regOrLoginForm.style.display = "block";
        switchLoginRegForm()
    })
}
