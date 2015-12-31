+++
title = "Embed Tweet with a Single Line of Code"
description = "Introducing Embed Tweet, a web widget to easily embed tweets in blogs"
date = "2011-04-04"
categories = ["projects"]
tags = ["blackbirdpy", "embed tweet", "javascript", "twitter", "widget"]
disqus_identifier = 280995954
+++

**Updated in 2015/12/28: this widget is no longer usable. Please refer
  to [Embed a Single Tweet] for similar feature.**

In my previous [post]({{< relref "after-april-fools-day.md" >}}), I
needed to show a tweet. Though I could have embedded a picture of the
tweet, I would really prefer a functional one, where the links,
mentions, and hashtags are all linkified. But I wasn't able to find
any useful ones beside [Blackbird Pie]. Blackbird Pie was OK, but it
requires users to manually generate the tweet and embed the generated
HTML. And in my case, I also have to slightly change the HTML to fit
my style.

So I created a web widget to easily embed tweets. There's currently no
name for this widget. I will just refer it as Embed Tweet. It is based
on [Blackbirdpy], but written in JavaScript and modified to fit closer
to the current visual style of Twitter.

To embed a tweet, you have to first find out the tweet ID of the tweet
you wish to embed. For example, the ID of the first tweet ever
http://twitter.com/jack/status/20 is 20. Then, simply add the
following script to the location where you want the tweet to show
up. Make sure to replace 20 in the example to the actual tweet ID. The
tweet will automatically embed below the script.

    <script src="http://inmate.ronhuang.org/tweet/20" type="text/javascript"></script>

The script above will render the following tweet.

(You might not see the tweet if you are viewing from the feed.)

Hope you find this widget useful. The source code is available at [GitHub].

[Blackbird Pie]: http://media.twitter.com/blackbird-pie/
[Blackbirdpy]: https://github.com/jmillerinc/blackbirdpy
[GitHub]: https://github.com/ronhuang/inmate
[Embed a Single Tweet]: https://dev.twitter.com/web/embedded-tweets
