const form = document.querySelector("#login-form");
form.addEventListener("submit",async function(e){
    e.preventDefault();
    const formdata = new FormData(form);
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
    localStorage.setItem("Token",response_json.token);
    window.location.assign("dashboard.html");
    }
    
}
    catch(err){
        console.error(err.message);
    }
})