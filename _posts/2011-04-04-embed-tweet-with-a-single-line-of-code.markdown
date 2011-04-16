---
title: Embed Tweet with a Single Line of Code
description: Introducing Embed Tweet, a web widget to easily embed
             tweets in blogs
tags: [embed tweet, twitter, javascript, widget]
keywords: [embed tweet, twitter, javascript, widget]
layout: post
comments: true
---

In my previous [post](/2011/04/02/after-april-fools-day/), I needed to
show a tweet. Though I could have embedded a picture of the tweet, I
would really prefer a functional one, where the links, mentions, and
hashtags are all linkified. But I wasn't able to find any useful ones
beside [Blackbird
Pie](http://media.twitter.com/blackbird-pie/). Blackbird Pie was OK,
but it requires users to manually generate the tweet and embed the
generated HTML. And in my case, I also have to slightly change the
HTML to fit my style.

So I created a web widget to easily embed tweets. There's currently no
name for this widget. I will just refer it as Embed Tweet. It is based
on [Blackbirdpy](https://github.com/jmillerinc/blackbirdpy), but
written in JavaScript and modified to fit closer to the current visual
style of Twitter.

To embed a tweet, you have to first find out the tweet ID of the tweet
you wish to embed. For example, the ID of the first tweet ever
[http://twitter.com/jack/status/20](http://twitter.com/jack/status/20)
is 20. Then, simply add the following script to the location where you
want the tweet to show up. Make sure to replace 20 in the example to
the actual tweet ID. The tweet will automatically embed below the
script.

    <script src="http://inmate.ronhuang.org/tweet/20" type="text/javascript"></script>

The script above will render the following tweet.

<div>
<script src="http://inmate.ronhuang.org/tweet/20" type="text/javascript"></script>
</div>

(You might not see the tweet if you are viewing from the feed.)

Hope you find this widget useful. The source code is available at
[GitHub](https://github.com/ronhuang/inmate).

----

You can also embed multiple tweets by add multiple instance of the
above script.

    <script src="http://inmate.ronhuang.org/tweet/839088619" type="text/javascript"></script>
    <script src="http://inmate.ronhuang.org/tweet/13364298974" type="text/javascript"></script>
    <script src="http://inmate.ronhuang.org/tweet/21301896997" type="text/javascript"></script>

<div>
<script src="http://inmate.ronhuang.org/tweet/839088619" type="text/javascript"></script>
<br/>
<script src="http://inmate.ronhuang.org/tweet/13364298974" type="text/javascript"></script>
<br/>
<script src="http://inmate.ronhuang.org/tweet/21301896997" type="text/javascript"></script>
</div>
<br/>
<br/>
