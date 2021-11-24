# CHANGELOG

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

