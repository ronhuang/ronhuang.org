---
layout: home
---

<div class="colophon" markdown="1">

[Ron Huang](/about/ "More about Ron") is a PhD student and software
programmer from Taiwan.

This is his yet another attempt of creating a personal site. Since he
doesn't have a habit of writing journal, let's hope this one will last
longer.

</div>


<div class="section" markdown="1">

#### Recent posts

{% for post in site.posts limit: 3 %}
 * [{{ post.title }}]({{ post.url }}) <span class="line-meta">{{ post.date | date: "%A, %B %d, %Y" }}</span>
{% endfor %}

<span class="more">[Full Archive &rarr;](/journal/ "View the Full Archives")</span>

</div>


<div class="section" markdown="1">

#### Recent projects

 * [Tweet Log](http://github.com/ronhuang/tweetlog) <span
   class="line-meta">Collects tweets that match the search criteria
   and retweet them in your Twitter account.</span>

<span class="more">[More Projects &rarr;](/projects/ "View All Projects")</span>

</div>
