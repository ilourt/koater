# Koater

[![Actual version published on NPM](https://badge.fury.io/js/koater.png)](https://www.npmjs.org/package/koater)

Koater is a router for koa.

Still under heavy development, **do not use it in production**.

## Installation

Not an npm for the moment. You can use via this git repository.

## Usage

### Instantiate router:

```js
let router = require('koater');
```

### Add route

```js
router.use({name, path, method, fn})
```

Params:
* **name** (string) : name of the route (not mandatory). It is used to retreive the route by its name.
* **path** (string) : path of the route (eg */users* )
* **method** (string) : HTTP method (GET, POST, PUT, ...)
* **fn** (function) : function used to handle the request. The *this* variable is the Koa one.

### Retrieve route

```js
let myRoute = router.getByName('myRouteName')
```

Params:
* (string) : the name of the route

Return:
* route (Object): an object representing the route

### Associate to Koa app

```js
let router = require('koater');
let koa = require('koa');

// Instantiate koa app
let app = koa();

... add routes to the router

app.use(router.routes());

app.listen('3000');

```

## Roadmap

* [ ] Add possibility to add middleware
* [x] Unit tests
* [ ] Publish on npm

## Author

Irwin Lourtet <dev@lourtet.fr>
