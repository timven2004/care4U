const userRegForm = document.querySelector("#reg-form");
const userLoginForm = document.querySelector("#login-form");
const switchRegLoginBtn = document.querySelector("#reg-login-switch a");
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
