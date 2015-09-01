The PhosphorJS Library
======================

What?
-----

PhosphorJS is a collection of libraries designed to make it easy to build
high-performance, pluggable, desktop-style web applications. It **is not**
an opinionated framework which forces a developer into a specific model of
data flow, nor does it artificially limit the developer to using only the
facilities provided by its own libraries. PhosphorJS was designed from the
start to play nicely with existing and popular web frameworks.

The PhosphorJS libraries cover topics including (but not limited to): message
passing, signaling, attached properties, data structures, widgets, and layouts.
Each of the libraries is a separately installable NPM package. Developers are
free to use as much or as little of PhosphorJS as suits their needs.

Most users will be drawn to PhosphorJS for its high performance layouts and
well structured widget hierarchy. These features allow a developer to build
desktop-like experiences which are not possible using CSS alone, and which
are not within the purview of most of today's web frameworks.

PhosphorJS is written entirely in [TypeScript](https://www.typescriptlang.org),
and is simple and easy to use from ES5, ES6 and TypeScript.

Why?
----

The web is built on technology that is sub-optimal for modern desktop-style UI
applications. Nevertheless, the web stack is rapidly becoming *the* deployment
platform for new applications, desktop or otherwise. Several frameworks have
appeared which attempt to address the shortcomings using various techniques.
Unfortunately, these frameworks often comes with an opinionated view of how
data should flow through an application and/or a rigid model of how a widget
hierarchy should be assembled. In addition to being limiting, most of these
frameworks do not leverage the concepts of desktop toolkits which have been
proven (over several decades) to be highly useful.

HTML and CSS were designed for documents, not applications. There are certain
classes of user interactions which are expected of production-quality desktop
applications which are impossible to implement in CSS alone. Think of tabbed
and docked panels in an IDE application. These types of interactions must be
implemented using JavaScript, and implementing them in a scalable and elegant
fashion requires a reasonable amount of architecture. This includes facilities
such as: a message-passing hierarchy, resize/attach/detach/show/hide events,
size constraint aggregation, and efficient layout computation. PhosphorJS
provides these low-level facilities that are currently missing from the web,
in a way which is flexible, unopinionated, and compatible with your existing
code.

How?
----

- PhosphorJS never reads geometry from the DOM, therefore avoiding *all* inline
  reflows.
- PhosphorJS avoids CSS layout algorithms, instead managing the layout and sizing
  using javascript.

Show me the proof!
------------------

- [Check out this PR comment](https://github.com/ipython/ipython/pull/7997#issuecomment-88143191)
  showing a Panel resize comparison between CodePen and PhosphorJS. CodePen takes
  more than 16ms, Phosphor takes less than 0.5ms. (The PhosphorJS layout is *much*
  more complicated).
- Most importantly, [check out the source](https://github.com/phosphorjs).

Can I use it now?
-----------------

PhosphorJS is under development at the moment, but is very nearly production ready.
We will soon release a version 1.0 to show our intentions of API stability and support.

Consider browsing the API docs in the meantime:

- [phosphor-arrays](http://phosphorjs.github.io/phosphor-arrays/api)
- [phosphor-boxengine](http://phosphorjs.github.io/phosphor-boxengine/api)
- [phosphor-disposable](http://phosphorjs.github.io/phosphor-disposable/api)
- [phosphor-messaging](http://phosphorjs.github.io/phosphor-messaging/api)
- [phosphor-nodewrapper](http://phosphorjs.github.io/phosphor-nodewrapper/api)
- [phosphor-properties](http://phosphorjs.github.io/phosphor-properties/api)
- [phosphor-queue](http://phosphorjs.github.io/phosphor-queue/api)
- [phosphor-signaling](http://phosphorjs.github.io/phosphor-signaling/api)
- [phosphor-widget](http://phosphorjs.github.io/phosphor-widget/api)
