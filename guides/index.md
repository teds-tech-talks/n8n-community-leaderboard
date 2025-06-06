---
layout: content
title: "Guides"
description: "Browse our collection of guides"
---

<div class="guides-index">
  <div class="guides-grid">
    {% for guide in site.guides %}
      <article class="guide-card">
        <h2><a href="{{ guide.url | relative_url }}">{{ guide.title }}</a></h2>
        {% if guide.excerpt %}
          <p>{{ guide.excerpt | strip_html | truncate: 150 }}</p>
        {% endif %}
        <div class="guide-meta">
          {% if guide.date %}<time>{{ guide.date | date: "%B %d, %Y" }}</time>{% endif %}
          {% if guide.author %}<span class="author">by {{ guide.author }}</span>{% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
</div>
