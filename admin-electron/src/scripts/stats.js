
/**
 * Grid 1:
 *  - Display top 5 sellers
 */

(() => {
    const _URL = "http://localhost/ecommerce-website/ecommerce-server/admin_statistics.php"
    axios({
        method: "GET",
        url: _URL,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        let sellers = response.data[0];
        const sellersData = [];
        const sellersMoney = [];
        sellers.forEach(seller => {
            sellersData.push(seller.name);
            sellersMoney.push(seller.money);
        });

        const chart1Data = {
            labels: sellersData,
            datasets: [{
                label: "Top sellers",
                backgroundColor: "#00ADB5",
                borderColor: "#c4c5c7",
                borderWidth: 2,
                hoverBackgroundColor: "#00acb59c",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: sellersMoney,
            }]
        };

        const chart1Options = {
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
            options: chart1Options,
            data: chart1Data
        });

        // Top 5 Clients
        let clients = response.data[1];
        const clientsData = [];
        const clientsMoney = [];
        clients.forEach(client => {
            clientsData.push(client.name);
            clientsMoney.push(client.money);
        });

        const chart2Data = {
            labels: clientsData,
            datasets: [{
                label: "Top clients",
                backgroundColor: "#00ADB5",
                borderColor: "#c4c5c7",
                borderWidth: 2,
                hoverBackgroundColor: "#00acb59c",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: clientsMoney,
            }]
        };

        const chart2Options = {
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

        new Chart('chart2', {
            type: 'bar',
            options: chart2Options,
            data: chart2Data
        });
    }).catch((error) => { });
})();

// const grid1Options = {
//     maintainAspectRatio: false,
//     responsive: true,
//     scales: {
//         y: {
//             stacked: true,
//             grid: {
//                 display: true,
//                 color: "#232831"
//             },
//             ticks: {
//                 // Include a dollar sign in the ticks
//                 callback: function (value, index, ticks) {
//                     return '$' + value;
//                 }
//             }
//         },
//         x: {
//             grid: {
//                 display: false
//             }
//         }
//     }
// };

// new Chart('chart', {
//     type: 'bar',
//     options: grid1Options,
//     data: grid1Data
// });

// // Top 5 clients

// const grid2Data = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//     datasets: [{
//         label: "Monthly revenue",
//         backgroundColor: "#00ADB5",
//         borderColor: "#c4c5c7",
//         borderWidth: 2,
//         hoverBackgroundColor: "#00acb59c",
//         hoverBorderColor: "rgba(255,99,132,1)",
//         data: [65, 59, 20, 81, 56, 55, 40],
//     }]
// };

// var ctx = document.getElementById("chart2");
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     options: {
//         elements: {
//             bar: {
//                 borderSkipped: 'end'
//             }
//         },

//     },
//     data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: '#7FC6E7',
//             borderColor: '#FFFFFF',
//             borderWidth: {
//                 top: 5
//             },
//             stack: 'stack'
//         }]
//     },
// });