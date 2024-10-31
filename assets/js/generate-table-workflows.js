document.addEventListener('DOMContentLoaded', function() {
    fetch('/caymantest.github.io/stats_aggregate_workflows.json')
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
                    //item.wf_detais.id,
                    `<a href="${item.template_url}" target="_blank">${item.wf_detais.name}</a>`,
                    item.unique_visitors || 0,
                    item.unique_inserters || 0,
                    item.wf_detais.createdAt.split('T')[0]
                ];
            });

            let table = $('#stats-table').DataTable({
                data: tableData,
                columns: [
                    { title: "", searchable: false, orderable: false },
                    { title: "", orderable: false, searchable: false },
                    { title: "Creator" },
                    //{ title: "Workflow ID" },
                    { title: "Workflow Name" },
                    { title: "Unique Views" },
                    { title: "Unique Inserters" },
                    { title: "Creation Date" }
                ],
                order: [[4, 'desc']], // Sort by Unique Views by default
                pageLength: 50,
                bFilter: true,
                responsive: true,
                columnDefs: [
                    {
                        targets: 0,
                        className: 'dt-body-center number'			
                    },
                    {
                        targets: 1,
                        className: 'dt-body-center',
                        width: "64px"
                    },
                    {
                        targets: 2,
                        className: 'dt-body-left creator-column'
                    },
                    {
                        targets: 3,
                        className: 'dt-body-left'
                    },
                    {
                        targets: [4, 5, 6],
                        className: 'dt-body-center'			
                    }
                ],
                deferRender: true
            });

            table.on('draw.dt', function () {
                var pageInfo = table.page.info();
                table.column(0, { page: 'current' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1 + pageInfo.start;
                });
            });

            table.draw();
        })
        .catch(error => console.error('Error:', error));
});
