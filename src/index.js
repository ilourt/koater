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

let router = {
  /**
   * Store the routes added to the router.
   * @type {Object}
   */
  _routes: {},

  /**
   * Generate function generator used by Koa to handle requests
   * @return {*Function} Function generator used by Koa to handle requests
   */
  routes: function () {
    let _this = this;
    return function *() {
      let currentRoute = _this._routes[this.method + '_' + this.path];
      if (currentRoute && typeof currentRoute.fn === 'function' ) {
        currentRoute.fn.bind(this)();
      }
    }
  },

  /**
   * Add route to use
   * @param  {string}   method Method for the route (GET, POST, ...)
   * @param  {string}   path   Url matching the route
   * @param  {Function} fn     Function which handle the request
   * @param  {string}   name   Name of the route (not mandatory)
   */
  use: function ({method, path, fn, name}) {
    let _name = method + '_' + path;
    this._routes[_name] = {fn, name: name || _name};
  },

  /**
   * Get a route based on its name
   * @param  {string} name Name of the route wanted
   * @return {object}      Object represented the route
   */
  getByName: function(name) {
    let routeKey = Object.keys(this._routes)
      .find((key) => this._routes[key].name === name);
    return routeKey ? this._routes[routeKey] : null;
  }
};

module.exports = router;
