const login_form = document.querySelector("#login-form");
login_form.addEventListener("submit",async function(e){
    e.preventDefault();
    const formdata = new FormData(login_form);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);
    try{
    //replace with actual api path later
    const response = await fetch("/api/auth/login",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    });
    //modify accordingly
    if(!response.ok)
        console.error(`An error occured : status code - ${response.status}`);

    const response_json = await response.json();
    //Check this and modify depending on the protocol followed by that endpoint.
    if(response_json.success){
    console.log(`JWT Token is ${response_json.token}`);
    sessionStorage.setItem("Token",response_json.token);
    window.location.assign("dashboard.html");
    }
    else{
        console.error("JWT Token not saved successfully");
    }
    
}
    catch(err){
        console.error(err.message);
    }
})

const register_form = document.querySelector("#register-form");
register_form.addEventListener("submit",async function(e){
    e.preventDefault();
    const formdata = new FormData(register_form);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);
    try{
    //replace with actual api path later
    const response = await fetch("/api/auth/register",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    });
    //modify accordingly
    if(!response.ok)
        console.error(`An error occured : status code - ${response.status}`);

    const response_json = await response.json();
    //Check this and modify depending on the protocol followed by that endpoint.
    if(response_json.success){
        register_form.reset();
        console.log("Successfully Registered");
    }
    
}
    catch(err){
        console.error(err.message);
    }
})