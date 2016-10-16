/**
 * This file is part of the Koater lib.
 *
 * (c) Irwin Lourtet <dev@lourtet.fr>
 *
 * For the full copyright and license information, please view
 * the LICENSE file distributed with this source code.
 *
 * @author Irwin Lourtet <dev@lourtet.fr>
 */

let test = require('unit.js');
let router = require('../../src');

describe('Router ', function() {
  it('should add route without name', function() {
    let route;
    let fn = function(){};
    let path = '/my-path';
    let method = 'GET';
    router.use({method, path, fn});

    test.number(Object.keys(router._routes).length).is(1);
    test.bool(router._routes.hasOwnProperty(method + '_' + path)).isTrue();

    route = router._routes[method + '_' + path];
    test.string(route.method).is(method);
    test.string(route.path).is(path);
    test.string(route.name).is(method + '_' + path);
    test.function(route.fn).is(fn);
  });

  it('should add route with name', function() {
    let route;
    let fn = function(){};
    let path = '/my-path2';
    let method = 'POST';
    let name = 'myRouteName';
    router.use({method, path, fn, name});

    test.number(Object.keys(router._routes).length).is(2);
    test.bool(router._routes.hasOwnProperty(method + '_' + path)).isTrue();

    route = router._routes[method + '_' + path];
    test.string(route.method).is(method);
    test.string(route.path).is(path);
    test.string(route.name).is(name);
    test.function(route.fn).is(fn);
  })
});
