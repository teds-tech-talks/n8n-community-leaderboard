---
layout: content
title: n8n Monthly Challenges
---

<div id="current-challenge">
  <div class="countdown-container">
    <p id="countdown" class="countdown">Loading...</p>
  </div>
  <div class="challenge-stats">
    <!-- Challenge stats will be loaded here via JS -->
  </div>
</div>

<h2 class="section-title">Top Creators</h2>
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

<script>
// Load data once and use it for all functions
let challengeData = null;

// Load all data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadData().catch(error => {
        console.error('Error in main data loading:', error);
        document.querySelector('.section-title').textContent = 'Challenge';
        document.getElementById('current-challenge').innerHTML = '<p>Error loading challenge data</p>';
    });
});

async function loadData() {
    const response = await fetch('/challenges/challenge.json');
    const jsonData = await response.json();
    
    // Handle both array and object formats
    challengeData = Array.isArray(jsonData) ? jsonData[0] : jsonData;
    
    if (!challengeData) {
        console.error('challengeData is null or undefined');
        throw new Error('Invalid challenge data format - data is null');
    }
    if (!challengeData.header_stats) {
        console.error('header_stats is missing:', challengeData);
        throw new Error('Invalid challenge data format - missing header_stats');
    }
    if (!challengeData.header_stats.curmonth) {
        console.error('curmonth is missing:', challengeData.header_stats);
        throw new Error('Invalid challenge data format - missing curmonth');
    }

    // Load challenge data first since it sets up the page structure
    await loadChallengeData();
    
    // Then load the tables in parallel
    await Promise.all([
        loadCreatorsData(),
        loadWorkflowsData()
    ]);
}

async function loadCreatorsData() {
    try {
        let tableData = challengeData.creators.map(item => {
            return [
                "",
                `<img src="${item.avatar}" alt="${item.username}" class="user-avatar" width="40">`,
                `<a href="${item.profile_url}" class="creator-link" data-umami-event="creator_profile" data-umami-event-creator="${item.username}">${item.username}</a>`,
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

<h2 class="section-title">Featured Workflows</h2>
<table id="workflows-table" class="display compact">
    <thead>
        <tr>
            <th class="number-column"></th>
            <th></th>
            <th>Creator</th>
            <th>$</th>
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

<script>
async function loadWorkflowsData() {
    try {
        let tableData = challengeData.workflows.map(item => {
            return [
                "",
                `<img src="${item.creator_avatar}" alt="${item.creator_username}" class="user-avatar" width="40">`,
                `<a href="${item.creator_url}" class="creator-link" target="_blank" data-umami-event="creator_profile" data-umami-event-creator="${item.creator_username}">${item.creator_username}</a>`,
                item.price && item.price !== "" ? Math.round(parseFloat(item.price)) : "",
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
            order: [[7, 'desc']], // Sort by inserts by default
            columns: [
                { title: "", searchable: false, orderable: false },
                { title: "", orderable: false, searchable: false },
                { title: "Creator" },
                { title: "$" },
                { title: "Workflow" },
                { title: "Created" },
                { title: "Views" },
                { title: "Inserts" }
            ],
            columnDefs: [
                { targets: 0, className: 'dt-body-center number', responsivePriority: 1 },
                { targets: 1, className: 'dt-body-center', width: "64px", responsivePriority: 1 },
                { targets: 2, className: 'dt-body-left creator-column', responsivePriority: 10001 },
                { targets: 3, className: 'dt-body-center', width: "40px", responsivePriority: 6 },  // price column
                { targets: 4, className: 'dt-body-left', responsivePriority: 2 },  // workflow name column
                { targets: 5, className: 'dt-body-center', width: "130px", responsivePriority: 5 },  // date column
                { targets: 6, className: 'dt-body-center', responsivePriority: 5 },
                { targets: 7, className: 'dt-body-center', responsivePriority: 4 }
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

<h2 class="section-title">Past Challenges</h2>
{% assign challenge_dirs = site.pages | where_exp: "item", "item.path contains 'challenges/'" | where_exp: "item", "item.path contains '/index.md'" | sort: "path" | reverse %}
{% for page in challenge_dirs %}
    {% assign path_parts = page.path | split: '/' %}
    {% if path_parts.size == 3 %}
        {% assign year_month = path_parts[1] | split: '-' %}
        {% assign month_num = year_month[1] %}
        {% assign month_name = site.data.months[month_num] %}
        {% assign year = year_month[0] %}
* [{{ site.data.months[month_num] }} {{ year }}]({{ site.baseurl }}/challenges/{{ path_parts[1] }})
    {% endif %}
{% endfor %}

<p><i>Learn more about <a href="{{ site.baseurl }}/about/#monthly-challenges">how monthly challenges work</a>.</i></p>

<script>
async function loadChallengeData() {
    try {
        // Format the current month challenge
        const curDate = new Date(challengeData.header_stats.curmonth);
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const monthName = monthNames[curDate.getMonth()];
        const year = curDate.getFullYear();

        // Update page title
        document.title = `${monthName} ${year} Challenge - n8n Monthly Challenges`;
        const titleElement = document.querySelector('.section-title');
        titleElement.textContent = `${monthName} ${year} Challenge`;
        titleElement.style.textAlign = 'center !important';
        titleElement.classList.add('challenge-title-main');

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

        // Set up countdown
        const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0);
        const countDownDate = new Date(lastDay.setHours(23, 59, 59)).getTime();

        const x = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById("countdown").innerHTML = 
                `${days}d ${hours}h ${minutes}m ${seconds}s remaining`;
            
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("countdown").innerHTML = "Challenge has ended, results coming soon!";
            }
        }, 1000);

    } catch (error) {
        console.error('Error loading challenge data:', error);
        document.querySelector('.section-title').textContent = 'Challenge';
        document.getElementById('current-challenge').innerHTML = '<p>Error loading challenge data</p>';
    }
}
</script>
