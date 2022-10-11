# CHANGELOG

## 7.1.1 (2022-10-11)

* docs: update screenshots (22ffdad)

## 7.1.0 (2022-10-06)

* build: fix npm vulnerability warnings (35cb15c)
* feat(Exchange): make queue listing items clickable (02f09b6)
* feat(Home): add CreateQueue component (bac20c3)
* fix: fix incorrect queue namespace notation (fe2319e)
* fix: fix buttons styling (32ec8be)
* refactor(LeftPanel): group queues by namespace (c61e20d)
* feat: add Queues component (d2564a5)
* feat: bind/unbind a queue, create/delete an exchange (d82f558)
* feat(Home): allow to create an exchange from home page (34cd46c)
* feat(Exchange): add Exchange component (5de18f9)
* refactor(LeftPanel): clean up (dbf3325)
* feat(LeftPanel/Queues): use custom useParams() hook (6a631d3)
* feat(hooks): add custom useParams() hook (1b70007)
* feat(LeftPanel): add fanout exchanges listing (07dfcb4)
* refactor: sync up with the latest changes from redis-smq (fb72567)

## 7.0.3 (2022-06-28)

* Clean up dev dependencies

## 7.0.2 (2022-06-28)

* Bump up webpack-cli to v4.10.0

## 7.0.1 (2022-06-28)

* Fix 'npm install' warnings
* Fix 'message.metadata undefined' error from ScheduledMessages

## 7.0.0 (2022-06-20)

* Improve WebsocketMainStream updates handling
* Update docs

## 7.0.0-rc.1 (2022-05-26)

* Update docs

## 7.0.0-rc.0 (2022-05-13)

* Remove PendingMessagesWithPriority component, refactor and clean up
* Sync up with redis-smq@7.0.0-rc.0

## 6.5.7 (2022-05-02)

* Fix NPM vulnerability warnings

## 6.5.6 (2022-04-22)

* Fix NPM security warnings
* Fix incomplete message options when message sequence ID equals 0
* Fix broken dev environment
* Refactor MessageOptions, remove redundant code
* Fix minor middleware bug ignoring basePath
* Update LICENSE
* Clean up
* Fix npm security warnings

## 6.5.5 (2022-03-21)

* Fix WebSocket ignoring basePath when opening a ws connection

## 6.5.4 (2022-03-20)

* Handle properly trailing slash in basePath
* Fix queue rate limit not being updated when selecting a queue
* Support basePath when using the web ui from behind a reverse proxy

## 6.5.3 (2022-02-23)

* Remove debug info
* Destroy websocket connection instance upon disconnect event

## 6.5.2 (2022-02-21)

* Refactor time series chart and clean up

## 6.5.1 (2022-02-18)

* Fix consumer time series
* Fix npm vulnerability warnings

## 6.5.0 (2022-02-18)

* Update docs
* Allow to configure queue rate limiting, clean up

## 6.4.0 (2022-02-08)

* Allow deleting namespaces
* Sync API updates from redis-smq@6.0.0-rc.12

## 6.3.0 (2022-01-31)

* Sync latest updates from redis-smq

## 6.2.0 (2022-01-20)

* Fix window.matchMedia error for Safari < 14
* Refactor the Web UI to match the latest updates from redis-smq

## 6.1.0 (2022-01-18)

* Fix npm vulnerability warnings
* Integrate queue deletion into Web UI, refactor
* Update HTTP API endpoints

## 6.0.0 (2022-01-03)

* Add support for multi-queue producers
* Add support for rates time series
* Refactor and make use of new WebSocket streams

## 5.0.7 (2021-12-07)

* Use strict package versioning.

## 5.0.6 (2021-12-04)

* Excluded screenshots from the npm package.

## 5.0.5 (2021-12-04)

* Fixed table heading captions in ConsumerResourcesChart.
* Updated screenshot-00003.png.

## 5.0.4 (2021-12-01)

* Refactored application routing.
* Added a custom error page for XHR requests errors.

## 5.0.3 (2021-11-24)

* Updated RedisSMQ logo.
* Updated screenshots.

## 5.0.2 (2021-11-23)

* Added RedisSMQ logo.
* Updated screenshots.

## 5.0.1 (2021-11-22)

* Fixed broken dist.
* Always run a new build before publishing.

## 5.0.0 (2021-11-22)

* Integrated RedisSMQ REST API allowing to manage queues and messages.
* Bug fixes and improvements regarding UI experience and page layout.
* Updated line charts.

## 4.0.0 (2021-11-02)

* Updated models to match metrics from redis-smq v4.

## 3.0.0 (2021-09-22)

* Moved redis-smq-monitor server to redis-smq.
* Clean up.

## 2.0.1 (2021-09-06)

* Fixed .npmignore

## 2.0.0 (2021-09-06)

* Fixed inconsistent typing between redis-smq and redis-smq-monitor.
* Fixed small issues in consumer listing.
* Refactored monitor server.

## 1.1.5 (2020-09-23)

* Fixed broken build.

## 1.1.4 (2020-09-23)

* Reset timeline when switching between queues.

## 1.1.3 (2020-09-21)

* Improved queue listing.
* Handled application state during a cold start.

## 1.1.2 (2020-09-20)

* Fixed root directory for static files
* Fallback to index.html if the requested path does not exist

## 1.1.1 (2020-09-20)

* Fixed package.json main entry.
* Improved error handling, websocket, and commonjs export type for the server.

## 1.1.0 (2020-09-20)

* Migrated React codebase to TypeScript.
* Improved consumer stats: added cpu usage percentage, pid, hostname, ip address.
* Added a new rates chart per queue, in plus of the existing global rates chart.
* Used react router for routing to new dedicated queue pages.
* Fixed many performance issues.
* Refactored the page layout and replaced semantic-ui with bootstrap.

## 1.0.2 (2019-11-11)

* Fixed npm warning about chart.js@^2.3 not being installed
* Removed unused packages

