---
layout: content
title: Workflow Leaderboard
show_last_updated: true
---

<table id="stats-table" class="display compact">
    <thead>
        <tr>
            <th class="select-checkbox"></th>
            <th class="number-column"></th>
            <th></th>
            <th>Creator</th>
            <th>Workflow Name</th>
            <th>Total Views</th>
            <th>Total Inserters</th>
            <th>Monthly Views</th>
            <th>Monthly Inserters</th>
            <th>Weekly Views</th>
            <th>Weekly Inserters</th>
            <th>Creation Date</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>

<!-- Chart Modal -->
<div id="chartModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <div class="chart-controls">
      <div class="toggle-container">
        <label for="dayCountToggle">Align by days since creation:</label>
        <label class="toggle-switch">
          <input type="checkbox" id="dayCountToggle" onchange="updateChart(this.checked)">
          <span class="toggle-slider"></span>
        </label>
      </div>
    </div>
    <div class="chart-container">
      <svg class="line-chart"></svg>
    </div>
  </div>
</div>

<script src="{{ '/assets/js/generate-table-workflows.js' | relative_url }}"></script>
<script src="{{ '/assets/js/workflow-chart.js' | relative_url }}"></script>
