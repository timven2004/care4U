const userRegForm = document.querySelector("#reg-form");
const userLoginForm = document.querySelector("#login-form");
const doctorRegForm = document.querySelector("#doctor-reg-form");
const doctorLoginForm = document.querySelector("#doctor-login-form");
const switchRegLoginBtn = document.querySelector("#reg-login-switch a");
const switchDocRegLoginBtn = document.querySelector("#reg-login-switch1 a");
let fillingLoginForm = true;
let fillingDoctorLoginForm = true;
let isLoggedIn = false;



// User Registration
function userRegistrationFormSubmit() { 
    userRegForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const form = this;
        const formObject = {};

        formObject["name"] = userRegForm.reg_username.value;
        formObject["email"] = userRegForm.reg_email.value;
        formObject["tel"] = userRegForm.reg_telephone.value;
        formObject["password"] = userRegForm.reg_password.value;

        const res = await fetch ("/api/createUser", {
            method: "POST", 
            headers: {
                "Content-Type":"application/json; charset=utf-8"
            },
            body: JSON.stringify(formObject)
        })

        const result = await res.json();
        console.log(result);
        if ( res.status === 200 ){
            userRegForm.reset();
            window.location = "/"
        } else if ( res.status === 401 ){
            alert(result.message); 
        }
    })

}
userRegistrationFormSubmit() 



// User login
function userLogin(){
    userLoginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); 
        
        const formObject = {};
        formObject["email"] = userLoginForm.login_email.value;
        formObject["password"] = userLoginForm.login_password.value;

        const res = await fetch ("/api/userLogin", {
            method: "POST", 
            headers: {
                "Content-Type":"application/json; charset=utf-8"
            },
            body: JSON.stringify(formObject)
        })
        
        const result = await res.json();
        console.log(result);
        if ( res.status === 200 ){
            userLoginForm.reset();
            window.location = "../html/main-page"
        } else if ( res.status === 401 ){
            alert(result.message); 
        }
    })
}
userLogin()





// async function checkDoctorLogin() {
//     const navBarMyAccount = document.querySelector(".navbar-nav #myDoctorAccount")
//     const navBarLoginBtn = document.querySelector(".navbar-nav #login-reg-doctor")
//     if (!isLoggedIn) {
//         navBarMyAccount.style.display = "none"
//         navBarLoginBtn.style.display = "flex"
//     } else {
//         navBarMyAccount.style.display = "flex"
//         navBarLoginBtn.style.display = "none"
//     }

//     const res = await fetch("/login");
//     const result = await res.json();
//     if (res.status === 200) {
//         if (result.isLoggedIn) {
//             isLoggedIn = true;
//             navBarMyAccount.style.display = "flex"
//             navBarLoginBtn.style.display = "none"
//             return true
//         }
//     } else {
//         window.location = "/"
//     }
//     console.log("isLoggedIn:", isLoggedIn)
//     return false
// }
// checkDoctorLogin()


// async function checkUserLogin() {
//     const navBarMyAccount = document.querySelector(".navbar-nav #myUserAccount")
//     const navBarLoginBtn = document.querySelector(".navbar-nav #login-reg-user")
//     if (!isLoggedIn) {
//         navBarMyAccount.style.display = "none"
//         navBarLoginBtn.style.display = "flex"
//     } else {
//         navBarMyAccount.style.display = "flex"
//         navBarLoginBtn.style.display = "none"
//     }

//     const res = await fetch("/login");
//     const result = await res.json();
//     if (res.status === 200) {
//         if (result.isLoggedIn) {
//             isLoggedIn = true;
//             navBarMyAccount.style.display = "flex"
//             navBarLoginBtn.style.display = "none"
//             return true
//         }
//     } else {
//         window.location = "/"
//     }
//     console.log("isLoggedIn:", isLoggedIn)
//     return false
// }
// checkUserLogin()


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


// Submit user UX handling
function finishedRegister() {
    const regOrLoginForm = document.querySelector("#user-reg-or-login-form");
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


// Submit doctor UX handling
function finishedDocRegister() {
    const regOrLoginDocForm = document.querySelector("#doctor-reg-or-login-form1");
    const formDocResponse = document.querySelector("#login-response1.form-submit-response1");

    formDocResponse.style.display = "flex";
    regOrLoginDocForm.style.display = "none";
    switchDocRegLoginBtn.style.display = "none";

    formDocResponse.addEventListener("click", () => {
        formDocResponse.style.display = "none";
        switchDocRegLoginBtn.style.display = "block";
        regOrLoginDocForm.style.display = "block";
        switchDocLoginRegForm()
    })
}


