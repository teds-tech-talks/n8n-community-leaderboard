document.addEventListener('DOMContentLoaded', function() {
    // Get the creator username from the URL
    const pathParts = window.location.pathname.split('/');
    const creatorUsername = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
    
    if (!creatorUsername) {
        console.error('Could not determine creator username from URL');
        return;
    }
    
    // Fetch the workflows data
    fetch('/stats_aggregate_workflows.json')
        .then(response => response.json())
        .then(data => {
            // Filter workflows for the current creator
            const creatorWorkflows = data.filter(item => item.user.username === creatorUsername);
            
            if (creatorWorkflows.length === 0) {
                // Show message if no workflows found
                document.getElementById('no-workflows-message').style.display = 'block';
                document.getElementById('creator-workflows-table').style.display = 'none';
                return;
            }
            
            // Prepare data for DataTable
            let tableData = creatorWorkflows.map((item, index) => {
                return [
                    index + 1, // Row number
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
            
            // Initialize DataTable
            $('#creator-workflows-table').DataTable({
                data: tableData,
                dom: '<"table-controls-wrapper"<"table-control-section"l><"table-control-section"B><"table-control-section"f>>rtip',
                columns: [
                    { title: "", searchable: false, orderable: false },
                    { title: "Workflow Name" },
                    { title: "Total Views" },
                    { title: "Total Inserters" },
                    { title: "Monthly Views", visible: false },
                    { title: "Monthly Inserters", visible: false },
                    { title: "Weekly Views", visible: false },
                    { title: "Weekly Inserters", visible: false },
                    { title: "Creation Date" }
                ],
                order: [[2, 'desc']], // Sort by total views by default
                pageLength: 10,
                bFilter: true,
                responsive: true,
                columnDefs: [
                    { targets: 0, className: 'dt-body-center number-column', width: "30px" },
                    { targets: 1, className: 'dt-body-left' },
                    { targets: [2,3,4,5,6,7,8], className: 'dt-body-center' }
                ],
                buttons: [
                    {
                        extend: 'colvisGroup',
                        text: 'Total Stats',
                        show: [0,1,2,3,8],
                        hide: [4,5,6,7],
                        className: 'active',
                        attr: {
                            'data-umami-event': 'table_button',
                            'data-umami-event-table': 'total'
                        }
                    },
                    {
                        extend: 'colvisGroup',
                        text: 'Monthly Stats',
                        show: [0,1,4,5,8],
                        hide: [2,3,6,7],
                        attr: {
                            'data-umami-event': 'table_button',
                            'data-umami-event-table': 'monthly'
                        }
                    },
                    {
                        extend: 'colvisGroup',
                        text: 'Weekly Stats',
                        show: [0,1,6,7,8],
                        hide: [2,3,4,5],
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
                }
            });
        })
        .catch(error => console.error('Error fetching workflows data:', error));
});
