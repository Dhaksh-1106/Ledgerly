chart_generator = require("./chart_engine");

token = localStorage.getItem("Token");
if(token == null)
    window.location.assign("auth.html");

async function load_dashboard(){
    const spent = document.getElementById("total-spent");
    const budget = document.getElementById("monthly-budget");
    const balance = document.getElementById("remaining-allowance");
    const template = document.getElementById("expense-row-template");
    const table = document.querySelector(".expense-table tbody");  

    try{
        const response = await fetch("/api/analytics/summary",{
        method : "GET",
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });
        if(!response.ok)
            console.error(`An error occured : status code - ${response.status}`);
        else{
            const response_json = await response.json();
            spent.innerText = response_json["totalSpent"];
            budget.innerText = response_json["monthlyBudget"];
            balance.innerText = response_json["remainingAllowance"];
        }
    }
    catch(err){
        console.error(err.message);
    }


    try{
        const response = await fetch("/api/expenses",{
        method : "GET",
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });
        if(!response.ok)
            console.error(`An error occured : status code - ${response.status}`);
        else{
            table.querySelector("tbody").innerHTML = "";
            const response_json = await response.json();
            for(const data of response_json){
                entry = template.content.cloneNode(true);
                entry.querySelector('td[data-field = "title"]').textContent = data["title"];
                entry.querySelector('span[data-field = "category"]').textContent = data["category"];
                entry.querySelector('td[data-field = "date"]').textContent = data["date"];
                entry.querySelector('td[data-field = "amount"]').textContent = data["amount"];
                entry.querySelector('.delete-action').dataset.id = data["_id"];
                table.append(entry);
                
            }
        }
    }
    catch(err){
        console.error(err.message);
    }

    chart_generator.generate_chart(response_json);
}

// async function get_summary(){
// try{
//     //modify the api route later
//     const response = await fetch("/api/analytics/summary",{
//         method : "GET",
//         headers : {
//             "Authorization" : `Bearer ${token}`
//         }
//     })
//     //modify accordingly
//     if(!response.ok)
//         console.error(`An error occured : status code - ${response.status}`);

//     const response_json = await response.json();
//     console.log(`Total Spent = ${response_json.totalSpent}\nRemaining Allowance = ${response_json.remainingAllowance}`);

// }
// catch(err){
//     console.error(err.message);
// }
// }

const form = document.querySelector("#add-expense-form");
form.addEventListener("submit",async function(e){
    e.preventDefault();
    const formdata = new FormData(form);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);
    try{
    //replace with actual api path later
    const response = await fetch("/api/expenses",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify(data)
    });
    //modify accordingly
    if(!response.ok)
        console.error(`An error occured : status code - ${response.status}`);
    else
        // update to dynamic reload later
        form.reset();
        load_dashboard();
}
    catch(err){
        console.error(err.message);
    }
})

document.addEventListener("click",async (e) => {
    const delete_button = e.target.closest(".delete-action");
    if(delete_button){
        try{
            const response = await fetch(`/api/expenses/${delete_button.dataset.id}`,{
                method : "DELETE",
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            if(!response.ok)
                console.error(`An error occured : status code - ${response.status}`);
            else
                load_document();
        }

        catch(err){
            console.error(err.message);
        }
    }

} )

load_dashboard();


