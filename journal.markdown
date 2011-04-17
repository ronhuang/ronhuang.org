---
title: Journal
description: Archive of all my posts
layout: simple
bodyclass: journal
---

<div class="archive">
{% for post in site.posts %}
   <div class="time"><time>{{ post.date | date: "%B %d, %Y" }}</time></div>
   <div class="post"><a href="{{ post.url }}">{{ post.title }}</a></div>
{% endfor %}
</div>
