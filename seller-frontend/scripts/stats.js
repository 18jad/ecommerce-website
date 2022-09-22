
// Top 5 viewed products chart
const topViewedchartDom = document.getElementById('topViewedProducts'),
    topViewedProducts = echarts.init(topViewedchartDom);

let topViewOption;

topViewOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
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
        data: ['PS4', 'Lpatop hp', 'Tv LG 2022', 'PS4', 'PS4', 'PS4', 'PS4']
    },
    series: [
        {
            name: 'Top 5 viewed products',
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
            data: [301, 302, 320, 320, 330, 334, 390]
        }
    ]
};

topViewOption && topViewedProducts.setOption(topViewOption);

// daily revenue chart
var monthlyDom = document.getElementById('monthlyRevenue');
var monthlyRevenue = echarts.init(monthlyDom);
let monthlyRevenueOption;

monthlyRevenueOption = {
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
            data: [10, 52, 200, 334, 390, 330, 220]
        }
    ]
};

monthlyRevenueOption && monthlyRevenue.setOption(monthlyRevenueOption);
