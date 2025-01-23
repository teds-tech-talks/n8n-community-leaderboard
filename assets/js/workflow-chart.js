// Wait for both DOM and chart.xkcd to be ready
function initChart() {
    if (typeof chartXkcd === 'undefined') {
        setTimeout(initChart, 100);
        return;
    }

    // Get modal elements
    const modal = document.getElementById('chartModal');
    const span = document.getElementsByClassName('close')[0];
    const svg = document.querySelector('.line-chart');
    const toggle = document.getElementById('dayCountToggle');

    let historicData = null;

    // Fetch historic data
    async function fetchHistoricData() {
        if (historicData === null) {
            const response = await fetch('/n8n-community-leaderboard/stats_aggregate_chart.json');
            historicData = await response.json();
        }
        return historicData;
    }

    // Make updateChart function globally available
    window.updateChart = async function(useAlignedGrowth) {
        const historic = await fetchHistoricData();
        const table = $('#stats-table').DataTable();
        const selectedRows = table.rows({ selected: true }).data();
        
        // Get selected workflow data
        const selectedData = [];
        selectedRows.each(function(row) {
            const workflowName = row[4].match(/>([^<]+)</)[1]; // Extract name from anchor tag
            const matchingData = historic.find(h => h.wf_name === workflowName);
            if (matchingData) {
                selectedData.push({
                    label: matchingData.label,
                    data: matchingData.data
                });
            }
        });

        const chartData = useAlignedGrowth ? alignedDayCount(selectedData) : selectedData;
        svg.innerHTML = ''; // Clear previous chart
        
        new chartXkcd.XY(svg, {
            title: 'Workflow Growth Comparison',
            xLabel: useAlignedGrowth ? 'Days Since Start' : 'Date',
            yLabel: useAlignedGrowth ? 'Views Gained' : 'Total Views',
            data: {
                datasets: chartData
            },
            options: {
                xTickCount: 6,
                yTickCount: 6,
                legendPosition: chartXkcd.config.positionType.upRight,
                showLine: true,
                dotSize: 0.8,
                timeFormat: useAlignedGrowth ? undefined : 'YYYY-MM',
                strokeColor: '#333',
                backgroundColor: '#fff',
                showLegend: true,
                unxkcdify: false,
                fontFamily: 'xkcd'
            }
        });
    };


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
    toggle.addEventListener('change', async function() {
        await window.updateChart(this.checked);
    });
}

document.addEventListener('DOMContentLoaded', initChart);
