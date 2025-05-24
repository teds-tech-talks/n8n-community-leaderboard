document.addEventListener('DOMContentLoaded', function() {
    const jsonUrl = '/stats_aggregate_creators.json';
    let dataTable; // Store the DataTable instance for later use

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
                let creatorLink = `<a href="/creators/${item.user.username}" class="creator-link"  data-umami-event="creator_profile" data-umami-event-creator="${item.user.username}">${item.user.username}</a>`;
                if (item?.user?.links[0]) {
                    creatorLink += `<a href="${item.user.links[0]}" class="external-link" target="_blank" data-umami-event="creator_external" data-umami-event-creator="${item.user.username}" data-umami-event-url="${item.user.links[0]}">🌐</a>`;
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

            dataTable = $('#stats-table').DataTable({
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
                    { targets: 0, className: 'dt-body-center number', responsivePriority: 1 },
                    { targets: 1, className: 'dt-body-center', width: "64px", responsivePriority: 1 },
                    { targets: 2, className: 'dt-body-left creator-column', responsivePriority: 2 },
                    { targets: 3, className: 'dt-body-left', responsivePriority: 2 },
                    { targets: [4,5], className: 'dt-body-center' },
                    { targets: [6,7,8,9], className: 'dt-body-center' },
                    { targets: 10, className: 'dt-body-center' },
                    { targets: 11, className: 'dt-body-center' }
                ],
                deferRender: true,
                dom: '<"table-controls-wrapper"<"table-control-section"l><"table-control-section"B><"table-control-section spacer">>rtip',
                lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]], // Length menu options
                buttons: [
                    {
                        extend: 'colvisGroup',
                        text: 'Total Stats',
                        show: [0,1,2,3,4,5,10,11],
                        hide: [6,7,8,9],
                        className: 'active',
                        attr: {
                            'data-umami-event': 'table_button',
                            'data-umami-event-table': 'total'
                        }
                    },
                    {
                        extend: 'colvisGroup',
                        text: 'Monthly Stats',
                        show: [0,1,2,3,6,7,10,11],
                        hide: [4,5,8,9],
                        attr: {
                            'data-umami-event': 'table_button',
                            'data-umami-event-table': 'monthly'
                        }
                    },
                    {
                        extend: 'colvisGroup',
                        text: 'Weekly Stats',
                        show: [0,1,2,3,8,9,10,11],
                        hide: [4,5,6,7],
                        attr: {
                            'data-umami-event': 'table_button',
                            'data-umami-event-table': 'weekly'
                        }
                    }
                ],
                initComplete: function() {
                    // Add click handler to manage active state for DataTables buttons
                    $('.dt-button').on('click', function() {
                        $('.dt-button').removeClass('active');
                        $(this).addClass('active');
                    });
                },
                drawCallback: function(settings) {
                    this.api().column(0, {search:'applied', order:'applied'}).nodes().each(function(cell, i) {
                        cell.innerHTML = i + 1;
                    });
                }
            });

            dataTable.on('draw.dt', function () {
                var pageInfo = dataTable.page.info();
                dataTable.column(0, { page: 'current' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1 + pageInfo.start;
                });
            });

            dataTable.draw();
/*
            dataTable.draw();
*/
        })
        .catch(error => console.error('Error:', error));
});
