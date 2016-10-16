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
let sinon = require('sinon');
let co = require('co');
let router = require('../../src');

describe('Router ', function() {
  let routeName = 'myRouteName';

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
    router.use({method, path, fn, name: routeName});

    test.number(Object.keys(router._routes).length).is(2);
    test.bool(router._routes.hasOwnProperty(method + '_' + path)).isTrue();

    route = router._routes[method + '_' + path];
    test.string(route.method).is(method);
    test.string(route.path).is(path);
    test.string(route.name).is(routeName);
    test.function(route.fn).is(fn);
  });

  it('should retrieve route by its name', function() {
    let route = router.getByName(routeName);

    test.object(route).match((obj) => obj.name === routeName);
  });

  describe('call to routes()', function() {
    it ('should call the appropriate route', function() {
      let fn = sinon.spy();
      let method = 'PATCH';
      let path = '/test'
      router.use({path, method, fn});

      // Call the routes method
      let generatorFn = router.routes().bind({method, path});
      co(generatorFn());

      test.bool(fn.called).isTrue();
    });
  });
});
