---
layout: default
title: n8n Monthly Challenges
---
<link rel="stylesheet" href="{{ '/assets/css/challenge.css' | relative_url }}">

# n8n Monthly Challenges

Welcome to our monthly community challenges! Here you'll find current and past challenges that bring the n8n community together to create innovative workflows.

## Past Challenges

{% assign challenge_pages = site.pages | where_exp: "item", "item.path contains 'challenges'" | sort: 'path' | reverse %}
{%- for page in challenge_pages -%}
  {%- if page.path contains '/index.md' and page.path != 'challenges/index.md' -%}
    {%- assign folder_name = page.path | split: '/' | slice: 1 -%}
    {%- assign year = folder_name[0] | split: '-' | first -%}
    {%- assign month = folder_name[0] | split: '-' | last -%}
    {%- assign month_name = site.data.months[month] | default: month -%}
* [{{ month_name }} {{ year }}]({{ site.baseurl }}/{{ page.path | remove: 'index.md' }})
  {%- endif -%}
{%- endfor -%}
