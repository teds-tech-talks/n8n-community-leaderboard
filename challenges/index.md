---
layout: default
title: n8n Monthly Challenges
---
<link rel="stylesheet" href="{{ '/assets/css/challenge.css' | relative_url }}">

<h1 class="challenge-title"></h1>

<div id="current-challenge">
    <!-- Current challenge stats will be loaded here via JS -->
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
</div>

<script>
async function loadCreatorsData() {
    try {
        const response = await fetch('/n8n-community-leaderboard/challenges/challenge.json');
        const data = await response.json();
        
        const table = $('#creators-table').DataTable({
            data: data.creators,
            pageLength: 10,
            order: [[6, 'desc']], // Sort by total inserts by default
            columns: [
                { 
                    data: null,
                    className: 'dt-body-center',
                    orderable: false
                },
                {
                    data: 'avatar',
                    orderable: false,
                    render: function(data) {
                        return `<img src="${data}" class="user-avatar" width="40" height="40">`;
                    }
                },
                {
                    data: 'username',
                    render: function(data, type, row) {
                        return `<a href="${row.profile_url}" class="creator-link" target="_blank">${data}</a>`;
                    }
                },
                { data: 'name' },
                { 
                    data: 'template_count',
                    className: 'dt-body-center'
                },
                { 
                    data: 'total_views',
                    className: 'dt-body-center'
                },
                { 
                    data: 'total_inserts',
                    className: 'dt-body-center'
                }
            ],
            columnDefs: [{
                searchable: false,
                orderable: false,
                targets: 0
            }],
            dom: 'rt<"bottom"p>', // Only show table and pagination
            searching: false // Disable search
        });

        // Add row numbers
        table.on('order.dt search.dt', function () {
            table.column(0, {search:'applied', order:'applied'}).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();

    } catch (error) {
        console.error('Error loading creators data:', error);
    }
}

// Load the creators data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCreatorsData();
});
</script>

<h2>Featured Workflows</h2>
<div id="featured-workflows">
    <!-- Featured workflows will be loaded here -->
</div>

<h2>Past Challenges</h2>
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

<script>
async function loadChallengeData() {
    try {
        const response = await fetch('/n8n-community-leaderboard/challenges/challenge.json');
        const data = await response.json();
        
        // Format the current month challenge
        const curDate = new Date(data.header_stats.curmonth);
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const monthName = monthNames[curDate.getMonth()];
        const year = curDate.getFullYear();

        // Update page title - only update the h1.challenge-title, not the header title
        document.querySelector('h1.challenge-title').textContent = `${monthName} ${year} Challenge`;

        // Create current challenge section
        const currentChallenge = document.getElementById('current-challenge');
        currentChallenge.innerHTML = `
            <div class="countdown-container">
                <p id="countdown" class="countdown"></p>
            </div>
            <div class="challenge-stats">
                <div class="stat-button">
                    <div class="stat-value">${data.header_stats.new_templates}</div>
                    <div class="stat-label">New Templates</div>
                </div>
                <div class="stat-button">
                    <div class="stat-value">${data.header_stats.active_creators}</div>
                    <div class="stat-label">Active Creators</div>
                </div>
                <div class="stat-button">
                    <div class="stat-value">${data.header_stats.total_inserts}</div>
                    <div class="stat-label">Total Inserts</div>
                </div>
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
                document.getElementById("countdown").innerHTML = "Challenge has ended";
            }
        }, 1000);

    } catch (error) {
        console.error('Error loading challenge data:', error);
    }
}

// Load the challenge data when the page loads
document.addEventListener('DOMContentLoaded', loadChallengeData);
</script>
