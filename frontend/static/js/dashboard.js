import {generate_chart} from "/js/chart_engine.js"

const token = sessionStorage.getItem("Token");
if(token == null)
    window.location.assign("auth.html");

const date = new Date();
const options = {
    weekday : "long",
    month : "long",
    day : "numeric"
}

async function load_dashboard(){

    document.getElementById("expense-date").value = date.toISOString().split("T")[0];
    document.getElementById("today").innerText = date.toLocaleDateString("en-Us",options);
    const spent = document.querySelector("#total-spent span");
    const budget = document.querySelector("#monthly-budget span");
    const balance = document.querySelector("#remaining-allowance span");
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
            let color;

            if(response_json["remainingAllowance"] > 0)
                color = "#5bd6a0";
            else if(response_json["remainingAllowance"] == 0)
                color = "#ffff00de"
            else
                color = "#ea080c";

            document.documentElement.style.setProperty("--status",color);
            spent.innerText = response_json["totalSpent"];
            budget.innerText = response_json["monthlyBudget"];
            balance.innerText = response_json["remainingAllowance"];


            generate_chart(response_json);
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
            table.innerHTML = "";
            const response_json = await response.json();
            for(const data of response_json){
                const entry = template.content.cloneNode(true);
                entry.querySelector('td[data-field = "title"]').textContent = data["title"];
                entry.querySelector('span[data-field = "category"]').textContent = data["category"];
                entry.querySelector('td[data-field = "date"]').textContent = data["date"].split("T")[0];
                entry.querySelector('td[data-field = "amount"] span').textContent = data["amount"];
                entry.querySelector('.delete-action').dataset.id = data["_id"];
                table.append(entry);
            }
        }
    }
    catch(err){
        console.error(err.message);
    }


}

const form = document.querySelector("#add-expense-form");
form.addEventListener("submit",async function(e){
    e.preventDefault();
    const formdata = new FormData(form);
    const data = Object.fromEntries(formdata.entries());
    try{
    const response = await fetch("/api/expenses",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify(data)
    });

    if(!response.ok)
        console.error(`An error occured : status code - ${response.status}`);
    else
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
                load_dashboard();
        }

        catch(err){
            console.error(err.message);
        }
    }

} )

load_dashboard();


