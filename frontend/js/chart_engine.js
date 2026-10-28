//<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
//change dashboard.html script tag to type="module"
token = localStorage.getItem("Token")
if(token == null)
    window.location.assign("auth.html");

// async function get_chart_details(){
//      try{
//         const response = await fetch("/api/analytics/summary",{
//         method : "GET",
//         headers : {
//             "Authorization" : `Bearer ${token}`
//         }
//     });
//         if(!response.ok)
//             console.error(`An error occured : status code - ${response.status}`);
//         else{
//             const response_json = await response.json();
//             return response_json;
//         }
//     }
//     catch(err){
//         console.error(err.message);
//     }
// }

const canvas = document.getElementById("chart-target");

function generate_chart(data){
    new Chart(canvas,{
        type : 'bar',
        data : {
            labels : Object.keys(data.categoricalBreakdown),
            datasets : [{
                label : "Amount",
                data : Object.values(data.categoricalBreakdown)
        }]}
        });
}

module.exports = generate_chart;