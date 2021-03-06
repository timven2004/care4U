const userRegForm = document.querySelector("#reg-form");
const userLoginForm = document.querySelector("#login-form");
const doctorRegForm = document.querySelector("#doctor-reg-form");
const doctorLoginForm = document.querySelector("#doctor-login-form");
const switchRegLoginBtn = document.querySelector("#reg-login-switch a");
const switchDocRegLoginBtn = document.querySelector("#reg-login-switch1 a");
let fillingLoginForm = true;
let fillingDoctorLoginForm = true;
let isLoggedInUSERAPI = false;
let isLoggedInDOCAPI = false;

// const doctorModal = document.querySelector('#doctorRegButton')
// const userModal = document.querySelector('#userRegButton')
// const firstModal = document.querySelector('#login-reg-doctor')



// User Registration
async function userRegistrationFormSubmit() {
    userRegForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const form = this;
        const formObject = {};

        formObject["name"] = userRegForm.reg_username.value;
        formObject["email"] = userRegForm.reg_email.value;
        formObject["tel"] = userRegForm.reg_telephone.value;
        formObject["password"] = userRegForm.reg_password.value;

        const res = await fetch("/api/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(formObject)
        })

        const result = await res.json();
        console.log(result);
        if (res.status === 200) {
            userRegForm.reset();
            window.location = "../html/main-page.html"
            alert("User registration success")
        } else if (res.status === 401) {
            alert(result.message);
        }
    })

}
userRegistrationFormSubmit()


// Doctor Registration
function DoctorRegistrationFormSubmit() {
    doctorRegForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const form = this;
        const formObject = {};

        formObject["name"] = doctorRegForm.reg_username.value;
        formObject["email"] = doctorRegForm.reg_email.value;
        formObject["tel"] = doctorRegForm.reg_telephone.value;
        formObject["password"] = doctorRegForm.reg_password.value;
        formObject["description"] = doctorRegForm.personalDiscription.value;

        const res = await fetch("/api/createDoctor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(formObject)
        })

        const result = await res.json();
        console.log(result);
        if (res.status === 200) {
            doctorRegForm.reset();
            window.location = "../html/main-page.html"
            alert("Doctor registration success")

        } else if (res.status === 401) {
            alert(result.message);
        }
    })

}
DoctorRegistrationFormSubmit()



// User login
function userLogin() {
    userLoginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formObject = {};
        formObject["email"] = userLoginForm.login_email.value;
        formObject["password"] = userLoginForm.login_password.value;

        const res = await fetch("/api/userLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(formObject)
        })

        const result = await res.json();
        console.log(result);
        if (res.status === 200) {
            userLoginForm.reset();
            window.location = "../html/main-page.html"
        } else if (res.status === 401) {
            alert(result.message);
        }
    })
}
userLogin()


// Doctor login
function doctorLogin() {
    doctorLoginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formObject = {};
        formObject["email"] = doctorLoginForm.login_email.value;
        formObject["password"] = doctorLoginForm.login_password.value;

        const res = await fetch("/api/doctorLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(formObject)
        })

        const result = await res.json();
        console.log(result);
        if (res.status === 200) {
            doctorLoginForm.reset();
            window.location = "../html/main-page.html"
        } else if (res.status === 401) {
            alert(result.message);
        }
    })
}
doctorLogin()





async function checkUserLogin() {
    const navBarMyUserAccount = document.querySelector("#myUserAccount #userAccountItems")
    const navBarUserLoginBtn = document.querySelector("#login-reg-doctor a")
    const navBarMyAccBtn = document.querySelector("#myUserAccount .innerMyUserAccount")

    const res = await fetch("/api/userLogin");

    const result = await res.json();
    console.log(result)
    if (res.status === 200) {
        if (result.isLoggedInUSERAPI) {
            isLoggedInUSERAPI = true;
            navBarMyUserAccount.style.display = "block"
            navBarUserLoginBtn.style.display = "none"
            navBarMyAccBtn.style.display = "block"
        }else{
            isLoggedInUSERAPI = false;
            navBarMyUserAccount.style.display = "none"
            navBarMyAccBtn.style.display = "none"
            navBarUserLoginBtn.style.display = "block"
        }
    }
    console.log("isLoggedInUSERAPI:", isLoggedInUSERAPI)
}
checkUserLogin();



async function checkDoctorLogin() {
    const navBarMyDocAccount = document.querySelector("#myDoctorAccount #doctorAccountItems")
    const navBarDocLoginBtn = document.querySelector("#login-reg-doctor a")
    const navBarMyDocAccBtn = document.querySelector("#myDoctorAccount .innerMyDocAccount")

    const res = await fetch("/api/doctorLogin");

    const result = await res.json();
    console.log(result)
    if (res.status === 200) {
        console.log(result)
        if (result.isLoggedInDOCAPI) {
            isLoggedInDOCAPI = true;
            navBarMyDocAccount.style.display = "block"
            navBarDocLoginBtn.style.display = "none"
            navBarMyDocAccBtn.style.display = "block"
        }else{
            isLoggedInDOCAPI = false;
            navBarMyDocAccount.style.display = "none"
            navBarMyDocAccBtn.style.display = "none"
            navBarDocLoginBtn.style.display = "block"
        }
    }
    console.log("isLoggedInDOCAPI:", isLoggedInDOCAPI)
}
checkDoctorLogin();



// switch form for user
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



// switch form for doctor
function switchDocLoginRegForm() {
    doctorLoginForm.style.display = "block";
    doctorRegForm.style.display = "none";
    switchDocRegLoginBtn.innerHTML = "請按此建立帳戶";

    switchDocRegLoginBtn.addEventListener("click", () => {
        if (!fillingDoctorLoginForm) {
            doctorLoginForm.style.display = "block";
            doctorRegForm.style.display = "none";
            switchDocRegLoginBtn.innerHTML = "請按此建立帳戶";
        } else {
            doctorLoginForm.style.display = "none";
            doctorRegForm.style.display = "block";
            switchDocRegLoginBtn.innerHTML = "請按此登入";
        }
        fillingDoctorLoginForm = !fillingDoctorLoginForm;
    });
}
switchDocLoginRegForm();



