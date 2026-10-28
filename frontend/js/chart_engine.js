//<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
//change dashboard.html script tag to type="module"
token = localStorage.getItem("Token")
if(token == null)
    window.location.assign("auth.html");

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
        })
}

generate_chart(await get_summary())