// Wait for both DOM and chart.xkcd to be ready
function initChart() {
    if (typeof chartXkcd === 'undefined') {
        setTimeout(initChart, 100);
        return;
    }

    // Get modal elements
    const modal = document.getElementById('chartModal');
    const btn = document.getElementById('showChartBtn');
    const span = document.getElementsByClassName('close')[0];
    const svg = document.querySelector('.line-chart');
    const toggle = document.getElementById('dayCountToggle');

    // Sample data - we'll replace this with real data later
    const dateData = [{
        label: 'Popular Workflow',
        data: [
            { x: '2023-01-01', y: 10 },
            { x: '2023-02-01', y: 50 },
            { x: '2023-03-01', y: 100 },
            { x: '2023-04-01', y: 200 },
            { x: '2023-05-01', y: 350 },
        ],
    }, {
        label: 'New Workflow',
        data: [
            { x: '2023-03-01', y: 0 },
            { x: '2023-04-01', y: 100 },
            { x: '2023-05-01', y: 500 },
        ],
    }];

    function alignedDayCount(datasets) {
        return datasets.map(dataset => {
            const startDate = new Date(dataset.data[0].x);
            const startY = dataset.data[0].y;
            return {
                label: dataset.label,
                data: dataset.data.map(point => ({
                    x: Math.round((new Date(point.x) - startDate) / (1000 * 60 * 60 * 24)),
                    y: point.y - startY
                }))
            };
        });
    }

    function updateChart(useAlignedGrowth) {
        const chartData = useAlignedGrowth ? alignedDayCount(dateData) : dateData;
        svg.innerHTML = ''; // Clear previous chart
        
        new chartXkcd.XY(svg, {
            title: 'Workflow Growth Comparison',
            xLabel: useAlignedGrowth ? 'Days Since Start' : 'Date',
            yLabel: useAlignedGrowth ? 'Views Gained' : 'Total Views',
            data: {
                datasets: chartData
            },
            options: {
                xTickCount: 5,
                yTickCount: 5,
                legendPosition: chartXkcd.config.positionType.upLeft,
                showLine: true,
                dotSize: 0.5,
                timeFormat: useAlignedGrowth ? undefined : 'MM-YYYY',
            }
        });
    }

    // Button click handler
    btn.onclick = function() {
        modal.style.display = 'block';
        updateChart(toggle.checked);
    }

    // Close button handler
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // Click outside modal to close
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Toggle handler
    toggle.addEventListener('change', function() {
        updateChart(this.checked);
    });
}

document.addEventListener('DOMContentLoaded', initChart);
