document.addEventListener('DOMContentLoaded', function() {
    const jsonUrl = '/n8n-community-leaderboard/stats_aggregate_creators.json';

    // Function to fetch and display the last modified date
    function fetchLastModified() {
        fetch(jsonUrl, { method: 'HEAD' })
            .then(response => {
                const lastModified = new Date(response.headers.get('Last-Modified'));
                const formattedDate = lastModified.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                document.getElementById('last-updated').innerHTML = `<i>Last updated: ${formattedDate}</i>`;
            })
            .catch(error => console.error('Error fetching last modified date:', error));
    }

    // Fetch and display the last modified date
    fetchLastModified();

    // Fetch and process the JSON data
    fetch(jsonUrl)	
        .then(response => response.json())
        .then(data => {
            let tableData = data.map(item => {
                let creatorLink = `<a href="https://n8n.io/creators/${item.user.username}" class="creator-link" target="_blank">${item.user.username}</a>`;
                if (item?.user?.links[0]) {
                    creatorLink += `<a href="${item.user.links[0]}" class="external-link" target="_blank">🌐</a>`;
                }
                return [
                    "",
                    `<img src="${item.user.avatar}" alt="${item.user.username}" class="user-avatar" width="128">`,
                    creatorLink,
                    item.user.name,
                    item.sum_unique_visitors,
					item.sum_unique_inserters,
                    item.sum_unique_monthly_visitors,
                    item.sum_unique_monthly_inserters,
                    item.sum_unique_weekly_visitors,
                    item.sum_unique_weekly_inserters,
                    item.unique_count_template_url,
                    item.min_earliest_wf.split('T')[0]
                ];
            });

            let table = $('#stats-table').DataTable({
                data: tableData,
                columns: [
                    { title: "", searchable: false, orderable: false },
                    { title: "", orderable: false, searchable: false },
                    { title: "Creator" },
                    { title: "Name" },
                    { title: "Total<br/>Views" },
                    { title: "Total<br/>Inserters" },
                    { title: "Monthly<br/>Views", visible: false },
                    { title: "Monthly<br/>Inserters", visible: false },
                    { title: "Weekly<br/>Views", visible: false },
                    { title: "Weekly<br/>Inserters", visible: false },
                    { title: "Template<br/>count" },
                    { title: "Earliest<br/>Workflow" }
                ],
                order: [[4, 'desc']],
                pageLength: 25,
				bFilter: false,
                responsive: true,
                columnDefs: [
                    { targets: 0, className: 'dt-body-center number' },
                    { targets: 1, className: 'dt-body-center', width: "64px" },
                    { targets: 2, className: 'dt-body-left creator-column' },
                    { targets: [4,5,6,7,8,9,10], className: 'dt-body-center' },
                    { targets: 11, className: 'dt-body-center' }
                ],
                deferRender: true,
                dom: '<"table-controls-wrapper"lB>frtip',
                lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]], // Length menu options
                buttons: [
                    {
                        extend: 'colvisGroup',
                        text: 'Total Stats',
                        show: [0,1,2,3,4,5,10,11],
                        hide: [6,7,8,9]
                    },
                    {
                        extend: 'colvisGroup',
                        text: 'Monthly Stats',
                        show: [0,1,2,3,6,7,10,11],
                        hide: [4,5,8,9]
                    },
                    {
                        extend: 'colvisGroup',
                        text: 'Weekly Stats',
                        show: [0,1,2,3,8,9,10,11],
                        hide: [4,5,6,7]
                    },
                ]
				
				/*,
                drawCallback: function(settings) {
                    this.api().column(0, {search:'applied', order:'applied'}).nodes().each(function(cell, i) {
                        cell.innerHTML = i + 1;
                    });
                }*/
            });

            table.on('draw.dt', function () {
                var pageInfo = table.page.info();
                table.column(0, { page: 'current' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1 + pageInfo.start;
                });
            });

            table.draw();
/*
            table.draw();
*/
        })
        .catch(error => console.error('Error:', error));
});
