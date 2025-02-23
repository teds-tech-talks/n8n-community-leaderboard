---
layout: default
title: "January 2025 Challenge"
challenge_date: 2025-01
---
<link rel="stylesheet" href="{{ '/assets/css/challenge.css' | relative_url }}">

<h1 class="challenge-title"></h1>

<div id="current-challenge">
    <div class="countdown-container">
        <p class="countdown">🏆 Congratulations to all winners and thank you to everyone who participated! 🎉</p>
    </div>
    <div class="challenge-stats">
        <!-- Challenge stats will be loaded here via JS -->
    </div>
</div>

<h2>Top Creators</h2>
<div id="top-creators">
    <table id="creators-table" class="display compact">
        <thead>
            <tr>
                <th class="number-column"></th>
                <th></th>
                <th>Username</th>
                <th>Name</th>
                <th>Templates</th>
                <th>Total Views</th>
                <th>Total Inserts</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <div id="creators-table_info" class="dataTables_info"></div>
</div>

<script>
// Load data once and use it for all functions
let challengeData = null;

// Load all data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadData().catch(error => {
        console.error('Error in main data loading:', error);
        document.querySelector('h1.challenge-title').textContent = 'Challenge';
        document.getElementById('current-challenge').innerHTML = '<p>Error loading challenge data</p>';
    });
});

async function loadData() {
    const response = await fetch('/n8n-community-leaderboard/challenges/{{ page.challenge_date }}/challenge_monthly_{{ page.challenge_date }}.json');
    const jsonData = await response.json();
    
    // Handle both array and object formats
    challengeData = Array.isArray(jsonData) ? jsonData[0] : jsonData;
    
    if (!challengeData) {
        throw new Error('Invalid challenge data format - data is null');
    }
    if (!challengeData.header_stats) {
        throw new Error('Invalid challenge data format - missing header_stats');
    }

    // Load challenge data first since it sets up the page structure
    await loadChallengeData();
    
    // Then load the tables in parallel
    await Promise.all([
        loadCreatorsData(),
        loadWorkflowsData()
    ]);
}

async function loadChallengeData() {
    try {
        // Format the challenge month/year from the data
        const curDate = new Date(challengeData.header_stats.curmonth);
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const monthName = monthNames[curDate.getMonth()];
        const year = curDate.getFullYear();

        // Update page title
        document.querySelector('h1.challenge-title').textContent = `${monthName} ${year} Challenge`;

        // Update challenge stats
        document.querySelector('.challenge-stats').innerHTML = `
            <div class="stat-button">
                <div class="stat-value">${challengeData.header_stats.new_templates}</div>
                <div class="stat-label">New Templates</div>
            </div>
            <div class="stat-button">
                <div class="stat-value">${challengeData.header_stats.active_creators}</div>
                <div class="stat-label">Active Creators</div>
            </div>
            <div class="stat-button">
                <div class="stat-value">${challengeData.header_stats.total_inserts}</div>
                <div class="stat-label">Total Inserts</div>
            </div>
        `;

    } catch (error) {
        console.error('Error loading challenge data:', error);
        document.querySelector('h1.challenge-title').textContent = 'Challenge';
        document.getElementById('current-challenge').innerHTML = '<p>Error loading challenge data</p>';
    }
}

async function loadCreatorsData() {
    try {
        let tableData = challengeData.creators.map(item => {
            return [
                "",
                `<img src="${item.avatar}" alt="${item.username}" class="user-avatar" width="40">`,
                `<a href="${item.profile_url}" class="creator-link" target="_blank" data-umami-event="creator_profile" data-umami-event-creator="${item.username}">${item.username}</a>`,
                item.name,
                item.template_count,
                item.total_views,
                item.total_inserts
            ];
        });

        const table = $('#creators-table').DataTable({
            data: tableData,
            pageLength: 10,
            lengthMenu: [[10, 25, 50], [10, 25, 50]],
            order: [[6, 'desc']], // Sort by total inserts by default
            columns: [
                { title: "", searchable: false, orderable: false },
                { title: "", orderable: false, searchable: false },
                { title: "Creator" },
                { title: "Name" },
                { title: "Templates" },
                { title: "Total Views" },
                { title: "Total Inserts" }
            ],
            columnDefs: [
                { targets: 0, className: 'dt-body-center number', responsivePriority: 1 },
                { targets: 1, className: 'dt-body-center', width: "64px", responsivePriority: 1 },
                { targets: 2, className: 'dt-body-left creator-column', responsivePriority: 2 },
                { targets: 3, className: 'dt-body-left creator-column', responsivePriority: 10001 },
                { targets: [4,5], className: 'dt-body-center', responsivePriority: 4 },
                { targets: [6], className: 'dt-body-center', responsivePriority: 3 }
            ],
            dom: '<"table-controls-wrapper"lB>frtip',
            searching: false,
            responsive: true,
            deferRender: true
        });

        // Add row numbers
        table.on('draw.dt', function () {
            var pageInfo = table.page.info();
            table.column(0, { page: 'current' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1 + pageInfo.start;
            });
        });

        table.draw();

    } catch (error) {
        console.error('Error loading creators data:', error);
    }
}
</script>

<h2>Featured Workflows</h2>
<div id="featured-workflows">
    <table id="workflows-table" class="display compact">
        <thead>
            <tr>
                <th class="number-column"></th>
                <th></th>
                <th>Creator</th>
                <th>Workflow</th>
                <th>Created</th>
                <th>Views</th>
                <th>Inserts</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <div id="workflows-table_info" class="dataTables_info"></div>
</div>

<script>
async function loadWorkflowsData() {
    try {
        let tableData = challengeData.workflows.map(item => {
            return [
                "",
                `<img src="${item.creator_avatar}" alt="${item.creator_username}" class="user-avatar" width="40">`,
                `<a href="${item.creator_url}" class="creator-link" target="_blank" data-umami-event="creator_profile" data-umami-event-creator="${item.creator_username}">${item.creator_username}</a>`,
                `<a href="${item.workflow_url}" class="workflow-link" target="_blank" data-umami-event="workflow_view" data-umami-event-workflow="${item.workflow_name}">${item.workflow_name}</a>`,
                item.created_at,
                item.views,
                item.inserts
            ];
        });

        const table = $('#workflows-table').DataTable({
            data: tableData,
            pageLength: 25,
            lengthMenu: [[10, 25, 50], [10, 25, 50]],
            order: [[6, 'desc']], // Sort by inserts by default
            columns: [
                { title: "", searchable: false, orderable: false },
                { title: "", orderable: false, searchable: false },
                { title: "Creator" },
                { title: "Workflow" },
                { title: "Created" },
                { title: "Views" },
                { title: "Inserts" }
            ],
            columnDefs: [
                { targets: 0, className: 'dt-body-center number', responsivePriority: 1 },
                { targets: 1, className: 'dt-body-center', width: "64px", responsivePriority: 1 },
                { targets: 2, className: 'dt-body-left creator-column', responsivePriority: 10001 },
                { targets: 3, className: 'dt-body-left', responsivePriority: 2 },
                { targets: 4, className: 'dt-body-center', width: "130px", responsivePriority: 5 },
                { targets: 5, className: 'dt-body-center', responsivePriority: 5 },
                { targets: 6, className: 'dt-body-center', responsivePriority: 4 }
            ],
            dom: '<"table-controls-wrapper"lB>frtip',
            searching: false,
            responsive: true,
            deferRender: true
        });

        // Add row numbers
        table.on('draw.dt', function () {
            var pageInfo = table.page.info();
            table.column(0, { page: 'current' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1 + pageInfo.start;
            });
        });

        table.draw();

    } catch (error) {
        console.error('Error loading workflows data:', error);
    }
}
</script>

---
*This challenge ran from January 1-31, 2025*
