+++
title = "Introducing Calennar"
description = "Introducing Calennar, seminar schedules in iCalendar format"
date = "2011-05-08"
categories = ["projects"]
tags = ["calendar", "calennar", "cs", "inmate", "nus", "seminar"]
disqus_identifier = 298399847
+++

Introducing Calennar, seminar schedules in iCalendar format.
Currently, this only support seminars from [NUS School of Computing].
You can subscribe Calennar into your favorite calendar client with the
following URL:

``` plain
http://inmate.ronhuang.org/calennar/nuscs.ics
```

NUS SoC offers many seminars. However, since I am not from SoC, I do
not receive automatic email notifications for these seminars and often
missed interesting ones. They do offer [web] [pages] for the seminar
schedules, but there are no corresponding RSS or Twitter account to
subscribe to. So I built Calennar [^1] to automatically collect the
seminar schedules and publish them in the iCalendar format. Users can
subscribe the URL above in their calendar client and have the seminars
show up in the calendar. The following are screenshots of how seminar
entries look like in Google Calendar.

![Screenshot][summary]
![Screenshot][detail]

By default, the URL above only returns seminars up to one year ago. So
if you access the URL on 8th May 2011, only seminars after 8th May
2010 will be returned. However, you can retrieve all of the
seminars [^2]:

``` plain
http://inmate.ronhuang.org/calennar/nuscs-all.ics
```

You can also retrieve seminars of certain year by appending the year
after "nuscs", such as:

``` plain
http://inmate.ronhuang.org/calennar/nuscs-2010.ics
```

Have fun attending the seminars, I know I did. As usual, the source
code is available at [GitHub].

[web]: http://www.comp.nus.edu.sg/cssem.html
[pages]: http://www.comp.nus.edu.sg/is/seminars.html
[summary]: /img/calennar-summary.png "Summary"
[detail]: /img/calennar-detail.png "Detail"
[NUS School of Computing]: http://www.comp.nus.edu.sg/
[GitHub]: https://github.com/ronhuang/inmate
[^1]: Calendar + Seminar = Calennar. I apologize once again for the poor naming. :p
[^2]: Oldest entry is from July 2001.
