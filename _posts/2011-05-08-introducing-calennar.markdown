---
title: Introducing Calennar
description: Introducing Calennar, seminar schedules in iCalendar format
tags: [calennar, seminar, calendar, nus, inmate]
keywords: [calennar, seminar, calendar, nus, inmate]
layout: post
comments: true
---

Introducing Calennar, seminar schedules in iCalendar
format. Currently, this only support seminars from
[NUS School of Computing][1]. You can subscribe Calennar into your
favorite calendar client with the following URL:

    http://inmate.ronhuang.org/calennar/nuscs.ics

NUS SoC offers many seminars. However, since I am not from SoC, I do
not receive automatic email notifications for these seminars and often
missed interesting ones. They do offer [web][2] [pages][3] for the
seminar schedules, but there are no corresponding RSS or Twitter
account to subscribe to. So I built Calennar [^1] to automatically
collect the seminar schedules and publish them in the iCalendar
format. Users can subscribe the URL above in their calendar client and
have the seminars show up in the calendar. The following are
screenshots of how seminar entries look like in Google Calendar.

![Screenshot](https://lh4.googleusercontent.com/_WOSBJMG52nM/TcZtDbcU2LI/AAAAAAAAPDg/eoMefYgfcyA/s800/calennar-summary.png "Summary")

![Screenshot](https://lh3.googleusercontent.com/_WOSBJMG52nM/TcZqRQ0v86I/AAAAAAAAPDA/kftlC0-To9E/s800/calennar-detail.png "Detail")

By default, the URL above only returns seminars up to one year ago. So
if you access the URL on 8th May 2011, only seminars after 8th May
2010 will be returned. However, you can retrieve all of the seminars
[^2] collected by Calennar by appending "all" after "nuscs":

    http://inmate.ronhuang.org/calennar/nuscs-all.ics

You can also retrieve seminars of certain year by appending the year
after "nuscs", such as:

    http://inmate.ronhuang.org/calennar/nuscs-2010.ics

Have fun attending the seminars, I know I did. As usual, the source
code is available at [GitHub][4].


[1]: http://www.comp.nus.edu.sg/
[2]: http://www.comp.nus.edu.sg/cssem.html
[3]: http://www.comp.nus.edu.sg/is/seminars.html
[4]: https://github.com/ronhuang/inmate


[^1]: Calendar + Seminar = Calennar. I apologize once again for the poor naming. :p
[^2]: Oldest entry is from July 2001.
