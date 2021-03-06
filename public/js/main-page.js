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
async function DoctorRegistrationFormSubmit() {
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
async function userLogin() {
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
async function doctorLogin() {
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




// check user login status
async function checkUserLogin() {
    const navBarMyUserAccount = document.querySelector("#myUserAccount #userAccountItems")
    const navBarUserLoginBtn = document.querySelector("#login-reg-doctor .display")
    const navBarMyAccBtn = document.querySelector("#myUserAccount .innerMyUserAccount")

    const res = await fetch("/api/userLogin");

    const result = await res.json();
    console.log("hello"+result.isLoggedInUSERAPI)
    if (res.status === 200) {
        if (result.isLoggedInUSERAPI) {
            console.log("fuck you!")
            console.log("fuck you "+ navBarUserLoginBtn)
            isLoggedInUSERAPI = true;
            navBarMyUserAccount.style.display = "block"
            navBarMyAccBtn.style.display = "block"
            navBarUserLoginBtn.style.display = "none"
        } else {
            isLoggedInUSERAPI = false;
            navBarMyUserAccount.style.display = "none"
            navBarMyAccBtn.style.display = "none"
            navBarUserLoginBtn.style.display = "block"
        }
    }
    console.log("isLoggedInUSERAPI:", isLoggedInUSERAPI)
}
checkUserLogin();


// check doctor login status
async function checkDoctorLogin() {
    const navBarMyDocAccount = document.querySelector("#myDoctorAccount #doctorAccountItems")
    const navBarDocLoginBtn = document.querySelector("#login-reg-doctor .display")
    const navBarMyDocAccBtn = document.querySelector("#myDoctorAccount .innerMyDocAccount")

    const res = await fetch("/api/doctorLogin");

    const result = await res.json();
    console.log(result)
    if (res.status === 200) {
        console.log("hihihihihi:" + result)
        if (result.isLoggedInDOCAPI) {
            isLoggedInDOCAPI = true;
            navBarDocLoginBtn.style.display = "none"
            navBarMyDocAccount.style.display = "block"
            navBarMyDocAccBtn.style.display = "block"
        } else {
            isLoggedInDOCAPI = false;
            navBarDocLoginBtn.style.display = "block"
            navBarMyDocAccount.style.display = "none"
            navBarMyDocAccBtn.style.display = "none"
        }
    }
    console.log("isLoggedInDOCAPI:", isLoggedInDOCAPI)
}
checkDoctorLogin();



// switch form for user
function switchLoginRegForm() {
    userLoginForm.style.display = "block";
    userRegForm.style.display = "none";
    switchRegLoginBtn.innerHTML = "???????????????";

    switchRegLoginBtn.addEventListener("click", () => {
        if (!fillingLoginForm) {
            userLoginForm.style.display = "block";
            userRegForm.style.display = "none";
            switchRegLoginBtn.innerHTML = "???????????????";
        } else {
            userLoginForm.style.display = "none";
            userRegForm.style.display = "block";
            switchRegLoginBtn.innerHTML = "???????????????";
        }
        fillingLoginForm = !fillingLoginForm;
    });
}
switchLoginRegForm();



// switch form for doctor
function switchDocLoginRegForm() {
    doctorLoginForm.style.display = "block";
    doctorRegForm.style.display = "none";
    switchDocRegLoginBtn.innerHTML = "?????????????????????";

    switchDocRegLoginBtn.addEventListener("click", () => {
        if (!fillingDoctorLoginForm) {
            doctorLoginForm.style.display = "block";
            doctorRegForm.style.display = "none";
            switchDocRegLoginBtn.innerHTML = "?????????????????????";
        } else {
            doctorLoginForm.style.display = "none";
            doctorRegForm.style.display = "block";
            switchDocRegLoginBtn.innerHTML = "???????????????";
        }
        fillingDoctorLoginForm = !fillingDoctorLoginForm;
    });
}
switchDocLoginRegForm();