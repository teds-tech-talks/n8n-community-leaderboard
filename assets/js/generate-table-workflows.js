document.addEventListener('DOMContentLoaded', function() {
    const jsonUrl = '/stats_aggregate_workflows.json';

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
                let creatorLink = `<a href="/creators/${item.user.username.toLowerCase()}" class="creator-link"  data-umami-event="creator_profile" data-umami-event-creator="${item.user.username}">${item.user.username}</a>`;
                if (item?.user?.links[0]) {
                    creatorLink += `<a href="${item.user.links[0]}" class="external-link" target="_blank" data-umami-event="creator_external" data-umami-event-creator="${item.user.username}" data-umami-event-url="${item.user.links[0]}">🌐</a>`;
                }
                return [
                    null, // For checkbox column
                    "",
                    `<img src="${item.user.avatar}" alt="${item.user.username}" class="user-avatar" width="128">`,
                    creatorLink,
                    item.price && item.price !== "" ? Math.round(parseFloat(item.price)) : "",
                    //item.wf_detais.id,
                    `<a href="${item.template_url}" target="_blank" data-umami-event="workflow" data-umami-event-workflow="${item.wf_detais.id}">${item.wf_detais.name}</a>`,
                    item.unique_visitors || 0,
                    item.unique_inserters || 0,
                    item.unique_monthly_visitors || 0,
                    item.unique_monthly_inserters || 0,
                    item.unique_weekly_visitors || 0,
                    item.unique_weekly_inserters || 0,
                    item.wf_detais.createdAt.split('T')[0]
                ];
            });

            let table = $('#stats-table').DataTable({
                data: tableData,
                dom: '<"table-controls-wrapper"<"table-control-section"l><"table-control-section"B><"table-control-section"f>>rtip',
                columns: [
                    {
                        data: null,
						render: DataTable.render.select(),
						searchable: false,
						orderable: true,
                        responsivePriority: 10001
                    },
                    { title: "", searchable: false, orderable: false },
                    { title: "", orderable: false, searchable: false },
                    { title: "Creator" },
                    { title: "$" },
                    { title: "Workflow Name" },
                    { title: "Total<br/>Views" },
                    { title: "Total<br/>Inserters" },
                    { title: "Monthly<br/>Views", visible: false },
                    { title: "Monthly<br/>Inserters", visible: false },
                    { title: "Weekly<br/>Views", visible: false },
                    { title: "Weekly<br/>Inserters", visible: false },
                    { title: "Creation Date" }
                ],
                order: [[5, 'desc']],
                pageLength: 50,
				bFilter: true,
                responsive: {
                    details: {
                        renderer: function ( api, rowIdx, columns ) {
                            var data = $.map( columns, function ( col, i ) {
                                // Skip the checkbox column (index 0)
                                if (col.columnIndex === 0) {
                                    return '';
                                }
                                return col.hidden ?
                                    '<tr data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">'+
                                        '<td>'+col.title+':'+'</td> '+
                                        '<td>'+col.data+'</td>'+
                                    '</tr>' :
                                    '';
                            } ).join('');
 
                            return data ?
                                $('<table/>').append( data ) :
                                false;
                        }
                    }
                },
                columnDefs: [
                    { targets: 0, className: 'dt-body-center', responsivePriority: 10001 },  // Checkbox - hide first
                    { targets: 1, className: 'dt-body-center number', responsivePriority: 1 },  // Number
                    { targets: 2, className: 'dt-body-center', width: "64px", responsivePriority: 1 },  // Avatar
                    { targets: 3, className: 'dt-body-left creator-column', responsivePriority: 3 },  // Creator
                    { targets: 4, className: 'dt-body-center', width: "40px", responsivePriority: 4 },  // Price
                    { targets: 5, className: 'dt-body-left', responsivePriority: 2 },  // Workflow Name
                    { targets: [6,7,8,9,10,11,12], className: 'dt-body-center' }  // Other columns - default priority
                ],
                select: {
                    style: 'multi',
                    selector: 'td:first-child',
                    headerCheckbox: ''
                },
                deferRender: true,
                lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]], // Length menu options
                initComplete: function() {
                    // Add click handler to manage active state for DataTables buttons
                    $('.dt-button:not(.chart-btn)').on('click', function() {
                        $('.dt-button:not(.chart-btn)').removeClass('active');
                        $(this).addClass('active');
                    });
                },
                buttons: [
                    {
                        extend: 'colvisGroup',
                        text: 'Total Stats',
                        show: [0,1,2,3,4,5,6,7,12],
                        hide: [8,9,10,11],
                        className: 'active',
                        attr: {
                            'data-umami-event': 'table_button',
                            'data-umami-event-table': 'total'
                        }
                    },
                    {
                        extend: 'colvisGroup',
                        text: 'Monthly Stats',
                        show: [0,1,2,3,4,5,8,9,12],
                        hide: [6,7,10,11],
                        attr: {
                            'data-umami-event': 'table_button',
                            'data-umami-event-table': 'monthly'
                        }
                    },
                    {
                        extend: 'colvisGroup',
                        text: 'Weekly Stats',
                        show: [0,1,2,3,4,5,10,11,12],
                        hide: [6,7,8,9],
                        attr: {
                            'data-umami-event': 'table_button',
                            'data-umami-event-table': 'weekly'
                        }
                    },
                    {
                        text: '📊',
                        titleAttr: 'Select 1-9 workflows to compare growth',
                        className: 'chart-btn disabled',
                        enabled: false,
                        action: async function () {
                            document.getElementById('chartModal').style.display = 'block';
                            document.getElementById('dayCountToggle').checked = false;
                            await window.updateChart(false);
                        },
                        attr: {
                            'data-umami-event': 'table_chart',
                            'data-umami-event-table': 'open'
                        }
                    }
                ]
            });

            table.on('draw.dt', function () {
                var pageInfo = table.page.info();
                table.column(1, { page: 'current' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1 + pageInfo.start;
                });
            });

            // Handle selection changes
            table.on('select deselect', function () {
                const selectedRows = table.rows({ selected: true }).count();
                const chartBtn = document.querySelector('.chart-btn');
                if (selectedRows > 0 && selectedRows <= 9) {
                    chartBtn.classList.remove('disabled');
                    table.button('.chart-btn').enable();
                } else {
                    chartBtn.classList.add('disabled');
                    table.button('.chart-btn').disable();
                }
            });

            table.draw();
        })
        .catch(error => console.error('Error:', error));
});
