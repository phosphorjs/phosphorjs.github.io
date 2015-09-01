The PhosphorJS UI library
=========================

What?
-----

PhosphorJS is a UI library designed to allow high-performance web applications
to be built with your favourite UI toolkits. PhosphorJS does not replace your existing
library choices, rather it embeds other toolkit UIs into components that have been
written from the ground up to maximise performance and minimize reflows.

PhosphorJS is written in [TypeScript](https://www.typescriptlang.org),
and is simple and easy to use from ES5, ES6 and TypeScript.

Why?
----

The web is built on technology that is highly sub-optimal for modern, dynamic
UI applications. Many frameworks have appeared that attempt to minimise the latency
of DOM changes, however none have fully applied the concepts of high-performance UI frameworks,
such as clear event APIs and correctly timed attach/detach methods, to name just two. PhosphorJS aims
to fill this gap.

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
