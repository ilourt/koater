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
  it('should add route', function() {
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
    test.function(route.fn).is(fn);
  });
});
