
/**
 * Grid 1:
 *  - Display monthly revenue
 */
const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [{
        label: "Monthly revenue",
        backgroundColor: "#00ADB5",
        borderColor: "#c4c5c7",
        borderWidth: 2,
        hoverBackgroundColor: "#00acb59c",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [65, 59, 20, 81, 56, 55, 40],
    }]
};

const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        y: {
            stacked: true,
            grid: {
                display: true,
                color: "#232831"
            },
            ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, ticks) {
                    return '$' + value;
                }
            }
        },
        x: {
            grid: {
                display: false
            }
        }
    }
};

new Chart('chart', {
    type: 'bar',
    options: options,
    data: data
});
