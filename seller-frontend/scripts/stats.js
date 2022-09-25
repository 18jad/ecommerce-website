(() => {
    const _URL = "http://localhost/ecommerce-website/ecommerce-server/seller_statistics.php";
    axios({
        method: "POST",
        url: _URL,
        data: {
            seller_id: localStorage.getItem('seller_id'),
        },
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        let week = response.data[4];
        // daily revenue chart
        const monthlyDom = document.getElementById('monthlyRevenue');
        const monthlyRevenue = echarts.init(monthlyDom);

        let monthlyRevenueOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    axisLabel: {
                        formatter: function (val) {
                            return '$' + (val);
                        },
                        type: 'value'
                    },
                }
            ],
            legend: {},
            series: [
                {
                    name: 'Daily revenue',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    barWidth: '60%',
                    itemStyle: {
                        color: '#394f6a',
                    },
                    data: [Object.values(week[0])[0], Object.values(week[1])[0], Object.values(week[2])[0], Object.values(week[3])[0], Object.values(week[4])[0], Object.values(week[5])[0], Object.values(week[6])[0]]
                }
            ]
        };

        monthlyRevenueOption && monthlyRevenue.setOption(monthlyRevenueOption);
    }).catch((error) => {
        console.error(error);
    })
})();

(() => {
    const _URL = "http://localhost/ecommerce-website/ecommerce-server/seller_top_five.php";
    axios({
        method: "POST",
        url: _URL,
        data: {
            seller_id: localStorage.getItem('seller_id'),
        },
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        // Top 5 viewed products chart
        const topViewedchartDom = document.getElementById('topViewedProducts'),
            topViewedProducts = echarts.init(topViewedchartDom);
        let prods = response.data;
        let topViewOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '3%',
                right: '4%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: [prods[0].name, prods[1].name, prods[2].name, prods[3].name, prods[4].name]
            },
            series: [
                {
                    name: 'Top 5 purchased products',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: {
                        color: '#394f6a',
                    },
                    // sort from less to big for ordering bars
                    data: [prods[0].times_purchased, prods[1].times_purchased, prods[2].times_purchased, prods[3].times_purchased, prods[4].times_purchased]
                }
            ]
        };

        topViewOption && topViewedProducts.setOption(topViewOption);
    }).catch((error) => {
        console.log(error)
    })
})();
