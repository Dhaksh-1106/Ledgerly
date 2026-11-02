const token = sessionStorage.getItem("Token");
if(token == null)
    window.location.assign("auth.html");

export function generate_chart(data){
    const canvas = document.getElementById("analytics-chart");
    const existing_chart = Chart.getChart(canvas);
    if(existing_chart)
        existing_chart.destroy();

    new Chart(canvas, {
        type: "bar",
        data: {
            labels: Object.keys(data.categoricalBreakdown),
            datasets: [{
                label: "Amount",
                data : Object.values(data.categoricalBreakdown)
            }]}
    });
}
