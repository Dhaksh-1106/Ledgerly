//<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

const canvas = document.getElementById("chart-target");
function generate_chart(data){
    new Chart(canvas,{
        type : 'bar',
        data : {
            labels : Object.keys(data),
            datasets : [{
                label : "Amount",
                data : Object.values(data)
        }]}
        })
}