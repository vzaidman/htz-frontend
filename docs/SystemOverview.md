# System Overview

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Introduction](#introduction)
  - [Summary](#summary)
  - [Terms](#terms)
    - [Application Server](#application-server)
    - [CDN](#cdn)
    - [Page API](#page-api)
    - [Server-Side Rendering (SSR)](#server-side-rendering-ssr)
- [Request Lifecycle](#request-lifecycle)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

### Summary

* Haaretz frontend sites are [Next.js][] apps using [React][] and [Fela][] for
  the view layer and [Apollo][] for state data management.
* Development tasks are run using [npm scripts][], preferably using the [Yarn][]
  package manager. See the [README][] if you are trying to get set up.

### Terms

#### Application Server

An [Express][] web server using the [Next.js][] request handler, it is capable
of serving any page on the site by fetching the required data and serializing a
React component tree into HTML (using [server-side rendering][SSR]).

* :link: See [server.js][].

#### CDN

A Content Delivery Network sits between users and the Application Server in
production environments. If a page is not cached by the CDN, the CDN will
request the same page from the Application Server on behalf of the user, and
(depending on the response headers) may cache the page before sending it along
to the user.

#### Page API

A service running separately from the Application Server that offers a REST API
for retrieving content from the Haaretz CMS in JSON format. The Page API may be
accessed by both the Application Server (during [server-side rendering][SSR])
and by client-side application code (when navigating to a new page).

#### Server-Side Rendering (SSR)

Serializing a React component tree into HTML (and a full HTTP response body) by
executing the same JavaScript rendering code on the server that runs on the
client. It is a common technique used in React applications, and a feature
provided by [Next.js][].

Using server-side rendering means that component authors sometimes need to be
aware of whether their code is running on the client or the server. Some
considerations include:

* Which modules are imported. Some modules only work on the server (e.g. modules
  that access the filesystem or spawn processes) and some only work in the
  browser (e.g. modules accessing `window` properties or doing DOM operations).
  Some modules may work on both but be undesirably large when bundled as a
  dependency, increasing page load time. Modules that work in both environments
  are often referred to as “isomorphic” or “universal.”
* Which features are available. The server runs a modern version of Node.js, but
  most browsers run a different JavaScript engine or a different version of the
  same engine. Modern syntax used in source files thus needs to be transpiled
  and modern features polyfilled.
* What can safely be stored and accessed in the global or module scope. In a web
  browser, only the current user is able to see the entire execution context. But
  on the server, multiple requests (by different users or the same user) may be
  fulfilled concurrently. In order to avoid mixing up their data, no data about
  the current user or request can be stored in a global or module – it must
  instead be passed around as necessary.


## Request Lifecycle

* When a user first enters the site, their request goes to the Application Server.
  * **TODO:** In production, a load balancer will sit in front of the Application
    Server. Update with details of load balancer operation.
  * **TODO:** In production, the user may receive a cached page from the CDN.
    Update with details of CDN operation.
* The Application Server parses the requested URL and translates it into the
  appropriate Next.js route and query parameters.
  * Since our application needs to query the Page API to determine the page
    type, there is currently only a single Next.js “page”:
    [pages/index.js][].
  * :link: See the Next.js [custom server and routing][custom server] docs.
  * :link: See the `server.get()` calls in [server.js][].
* Next.js calls the page’s [`getInitialProps`][getInitialProps] static method,
  which fetches any data that is necessary to fulfill the request.
  * During [server-side rendering][SSR], components in the tree are rendered
    once, synchronously, for each request. This means that any component with
    data fetching needs must have those needs fulfilled in this top-level page
    method, or else the initial rendering of that component will be a loading or
    empty state.
  * Our components specify such data fetching needs as [GraphQL][] queries.
  * :link: See the [`withData`][withData] Higher Order Component.
* In `getInitialProps`, Apollo’s [`getDataFromTree`][getDataFromTree] function
  finds all the GraphQL queries required by any of the components being rendered
  and runs the queries.
  * Since there is not currently a GraphQL server, the queries are directed to a
    local instance of [GraphQL.js][]. This module is capable of resolving GraphQL
    queries both in the Application Server and in the browser.
  * A [context object][GraphQL context] is created with information about the
    URL being rendered, the user’s cookies, and an instance of a Page API client.
    This context object is available to every GraphQL resolver.
  * :link: See the GraphQL client in [lib/createClient.js][].
  * :link: See the GraphQL schema in [lib/schema.js][].
  * :link: See [how GraphQL executes queries][GraphQL execution].
* The `MainLayout` component includes a GraphQL query for the `page` field.
  * The `page` resolver uses the Page API client provided on the context object
    to send an API request using [`fetch()`][fetch].
  * The Page API client is simply a [`DataLoader`][DataLoader] instance. This
    utility makes it easy to batch in-flight requests and cache the results.
  * :link: See the page query in [layouts/MainLayout.js][].
  * :link: See the `page` resolver in [lib/schema.js][].
  * :link: See the `DataLoader` instance in [lib/createClient.js][].
* Apollo saves the results of all the GraphQL queries in its store. This data is
  then retrieved from the store and returned as one of the props in
  `getInitialProps`.
* Once `getInitialProps` is complete, Next.js renders the page component with
  the returned props using a ReactDOM method like [renderToString][].
  * **TODO**: In the future, this may support streaming the results by using
    the new `renderToStream` method, but at the moment it would need to be
    supported by Next.js, since we don’t call `renderToString` directly.
    * :link: See [zeit/next.js#2659][], [zeit/next.js#1209][], [zeit/next.js#2279][].
* The Application Server responds with the response body generated by Next.js.
  * **TODO**: Update with details of CDN operation.
* Subsequent navigation by the user, if done with the [Link][] component,
  uses the [`pushState()`][pushState] API instead of sending additional requests
  to the Application Server.
  * The new page’s `getInitialProps` method is still run, but this time the
    `getDataFromTree` method is skipped. On the client, we can start rendering
    the component tree immediately, with data fetching triggered as the
    components are rendered, since they can simply be updated when the data is
    ready.
  * In order to fulfill the GraphQL queries required by the new page, the client
    may send requests directly to the Page API, if necessary.


[Next.js]: https://github.com/zeit/next.js
[React]: https://facebook.github.io/react/
[Express]: https://expressjs.com/
[Fela]: http://fela.js.org/
[GraphQL]: http://graphql.org/
[GraphQL.js]: https://github.com/graphql/graphql-js
[DataLoader]: https://github.com/facebook/dataloader
[Apollo]: https://www.apollodata.com/
[npm scripts]: https://docs.npmjs.com/misc/scripts
[Yarn]: https://yarnpkg.com/
[README]: ../README.md
[server.js]: https://github.com/Haaretz/htz-frontend/blob/master/packages/apps/haaretz.co.il/server.js
[custom server]: https://github.com/zeit/next.js#custom-server-and-routing
[SSR]: #server-side-rendering-ssr
[getInitialProps]: https://github.com/zeit/next.js/#fetching-data-and-component-lifecycle
[renderToString]: https://facebook.github.io/react/docs/react-dom-server.html#rendertostring
[withData]: https://github.com/Haaretz/htz-frontend/blob/master/packages/apps/haaretz.co.il/lib/withData.js
[getDataFromTree]: http://dev.apollodata.com/react/server-side-rendering.html#getDataFromTree
[pages/index.js]: https://github.com/Haaretz/htz-frontend/blob/master/packages/apps/haaretz.co.il/pages/index.js
[lib/schema.js]: https://github.com/Haaretz/htz-frontend/blob/master/packages/apps/haaretz.co.il/lib/schema.js
[lib/createClient.js]: https://github.com/Haaretz/htz-frontend/blob/master/packages/apps/haaretz.co.il/lib/createClient.js
[layouts/MainLayout.js]: https://github.com/Haaretz/htz-frontend/blob/master/packages/apps/haaretz.co.il/layouts/MainLayout.js
[GraphQL context]: http://graphql.org/learn/execution/#root-fields-resolvers
[GraphQL execution]: http://graphql.org/learn/execution/
[fetch]: https://github.com/matthew-andrews/isomorphic-fetch
[Link]: https://github.com/zeit/next.js#with-link
[pushState]: https://developer.mozilla.org/en-US/docs/Web/API/History_API
[zeit/next.js#1209]: https://github.com/zeit/next.js/issues/1209
[zeit/next.js#2279]: https://github.com/zeit/next.js/pull/2279
[zeit/next.js#2659]: https://github.com/zeit/next.js/pull/2659
