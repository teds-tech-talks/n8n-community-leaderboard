---
layout: content
title: Creators Leaderboard
show_last_updated: true
---

<div class="table-action-buttons">
    <button id="reset-filters" class="table-btn">Reset Filters</button>
    <button id="select-all" class="table-btn">Select All</button>
    <button id="deselect-all" class="table-btn">Deselect All</button>
</div>

<div id="table-controls"></div>
<table id="stats-table" class="display compact">
    <thead>
        <tr>
            <th class="number-column"></th> <!-- This will be our index column -->
            <th></th> <!-- This is our avatar column -->
            <th>Username</th>
            <th>Name</th>
            <th>Total Unique Views</th>
            <th>Total Unique Inserters</th>
            <th>Monthly Unique Views</th>
            <th>Monthly Unique Inserters</th>
            <th>Weekly Unique Views</th>
            <th>Weekly Unique Inserters</th>
            <th>Templates</th>
            <th>Earliest Workflow</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
<p class="text-muted"><i>Note: n8n-team account is excluded.</i></p>

<div class="table-action-buttons">
    <button id="export-csv" class="table-btn">Export CSV</button>
    <button id="export-json" class="table-btn">Export JSON</button>
</div>

<script src="{{ '/assets/js/generate-table-creators.js' | relative_url }}"></script>
<link rel="stylesheet" href="{{ '/assets/css/table-buttons.css' | relative_url }}">
