---
title: Journal
layout: simple
bodyclass: journal
---

<ul class="archive">
{% for post in site.posts %}
  <li>
      <time>{{ post.date | date: "%A, %B %d, %Y" }}</time>
      <a href="{{ post.url }}">{{ post.title }}</a>
  </li>
{% endfor %}
</ul>
