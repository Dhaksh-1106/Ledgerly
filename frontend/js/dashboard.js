token = localStorage.getItem("Token")
if(token == null)
    window.location.assign("auth.html");

async function get_summary(){
try{
    //modify the api route later
    const response = await fetch("/api/analytics/summary",{
        method : "GET",
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    })
    //modify accordingly
    if(!response.ok)
        console.error(`An error occured : status code - ${response.status}`);

    const response_json = await response.json();
    console.log(`Total Spent = ${response_json.totalSpent}\nRemaining Allowance = ${response_json.remainingAllowance}`);

}
catch(err){
    console.error(err.message);
}
}
