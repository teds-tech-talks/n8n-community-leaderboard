---
layout: default
title: February 2025 Challenge
---
<link rel="stylesheet" href="{{ '/assets/css/challenge.css' | relative_url }}">

{% assign challenge = site.data.challenge %}
{% assign month_num = challenge.header_stats.curmonth | date: "%m" %}
{% assign month_name = site.data.months[month_num] %}
{% assign year = challenge.header_stats.curmonth | date: "%Y" %}

<h1 class="challenge-title">{{ month_name }} Challenge {{ year }}</h1>

<div class="countdown-container">
    <p id="countdown" class="countdown"></p>
</div>

<div class="challenge-stats">
    <div class="stat-button">
        <div class="stat-value">{{ challenge.header_stats.new_templates }}</div>
        <div class="stat-label">New Templates</div>
    </div>
    <div class="stat-button">
        <div class="stat-value">{{ challenge.header_stats.active_creators }}</div>
        <div class="stat-label">Active Creators</div>
    </div>
    <div class="stat-button">
        <div class="stat-value">{{ challenge.header_stats.total_inserts }}</div>
        <div class="stat-label">Total Inserts</div>
    </div>
</div>

<script>
// Set the date we're counting down to using the curmonth from challenge.json
const curMonth = new Date('{{ challenge.header_stats.curmonth }}');
const lastDay = new Date(curMonth.getFullYear(), curMonth.getMonth() + 1, 0);
const countDownDate = new Date(lastDay.setHours(23, 59, 59)).getTime();

// Update the countdown every second
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
</script>
