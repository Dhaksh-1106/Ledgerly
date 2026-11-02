const query_string = window.location.search;
if(query_string == "?mode=register"){

    const login_form = document.querySelector("#login-form-container");
    login_form.setAttribute("style","display:none");

    const register_form = document.querySelector("#register-form");
    register_form.addEventListener("submit",async function(e){
    e.preventDefault();
    const formdata = new FormData(register_form);
    const data = Object.fromEntries(formdata.entries());

    const error_field = document.getElementById("register-feedback");

    try{
        const response = await fetch("/api/auth/register",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        });

        const response_json = await response.json();
        
        if (response_json.success){
            error_field.style.color = "#22c55e";
            register_form.reset();
            window.location.replace("/auth.html?mode=login");
        }

        error_field.style.display = "block";

        if (response.status == 400)
            error_field.innerText = "Login failed due to an error";

        else
            error_field.innerText = response_json.message;
    
    }
    catch(err){
        error_field.style.display = "block";
        error_field.innerText = "Login failed due to a network error";
    }
})

}

else{
    const register_form = document.querySelector("#register-form-container");
    register_form.setAttribute("style","display:none");

    const login_form = document.querySelector("#login-form");

    login_form.addEventListener("submit",async function(e){
        e.preventDefault();
        const formdata = new FormData(login_form);
        const data = Object.fromEntries(formdata.entries());
        const error_field = document.getElementById("login-feedback");
        try{
        const response = await fetch("/api/auth/login",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        });

        const response_json = await response.json();

        if (response_json.success){
            error_field.style.color = "#22c55e";
            sessionStorage.setItem("Token",response_json.token);
            window.location.replace("dashboard.html");
        }

        error_field.style.display = "block";

        if (response.status == 500)
            error_field.innerText = "Login failed due to an error";

        else
            error_field.innerText = response_json.message;
        
    }
        catch(err){
            error_field.style.display = "block";
            error_field.innerText = "Login failed due to a network error";
        }
    })
}