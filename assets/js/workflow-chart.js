// Load chart.xkcd
const chartScript = document.createElement('script');
chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.xkcd@1.1/dist/chart.xkcd.min.js';
document.head.appendChild(chartScript);

document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('chartModal');
    const btn = document.getElementById('showChartBtn');
    const span = document.getElementsByClassName('close')[0];

    // Button click handler
    btn.onclick = function() {
        modal.style.display = 'block';
        renderChart();
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

    function renderChart() {
        const svg = document.getElementById('chart-container');
        svg.innerHTML = ''; // Clear previous chart

        const chart = new chartXkcd.Line(svg, {
            title: 'Workflow Statistics Over Time',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Views',
                    data: [0, 10, 20, 30]
                }, {
                    label: 'Insertions',
                    data: [0, 5, 10, 15]
                }]
            },
            options: {
                legendPosition: chartXkcd.config.positionType.upLeft
            }
        });
    }
});
