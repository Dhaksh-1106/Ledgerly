//change dashboard.html script tag to type="module"
const token = sessionStorage.getItem("Token");
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

export function generate_chart(data){
    const canvas = document.getElementById("analytics-chart");
    const existing_chart = Chart.getChart(canvas);
    if(existing_chart)
        existing_chart.destroy();

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

