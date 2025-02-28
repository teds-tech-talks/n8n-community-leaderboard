---
layout: default
---

<div class="content-container">
  <div class="content-header">
    <h1 class="section-title">Creators Leaderboard</h1>
    <p id="last-updated" class="meta-text"></p>
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

<script src="{{ '/assets/js/generate-table-creators.js' | relative_url }}"></script>
