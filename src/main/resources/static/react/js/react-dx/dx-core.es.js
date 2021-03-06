/**
 * Bundle of @devexpress/dx-core
 * Generated: 2018-07-26
 * Version: 1.5.0
 * License: https://js.devexpress.com/Licensing
 */
var DXCore=function(){
  var compare = function compare(a, b) {
    var aPosition = a.position();
    var bPosition = b.position();
    for (var i = 0; i < Math.min(aPosition.length, bPosition.length); i += 1) {
      if (aPosition[i] < bPosition[i]) return -1;
      if (aPosition[i] > bPosition[i]) return 1;
    }
    return aPosition.length - bPosition.length;
  };
  
  var insertPlugin = function insertPlugin(array, newItem) {
    var result = array.slice();
    var targetIndex = array.findIndex(function (item) {
      return compare(newItem, item) < 0;
    });
    result.splice(targetIndex < 0 ? array.length : targetIndex, 0, newItem);
    return result;
  };
  
  var asyncGenerator = function () {
    function AwaitValue(value) {
      this.value = value;
    }
  
    function AsyncGenerator(gen) {
      var front, back;
  
      function send(key, arg) {
        return new Promise(function (resolve, reject) {
          var request = {
            key: key,
            arg: arg,
            resolve: resolve,
            reject: reject,
            next: null
          };
  
          if (back) {
            back = back.next = request;
          } else {
            front = back = request;
            resume(key, arg);
          }
        });
      }
  
      function resume(key, arg) {
        try {
          var result = gen[key](arg);
          var value = result.value;
  
          if (value instanceof AwaitValue) {
            Promise.resolve(value.value).then(function (arg) {
              resume("next", arg);
            }, function (arg) {
              resume("throw", arg);
            });
          } else {
            settle(result.done ? "return" : "normal", result.value);
          }
        } catch (err) {
          settle("throw", err);
        }
      }
  
      function settle(type, value) {
        switch (type) {
          case "return":
            front.resolve({
              value: value,
              done: true
            });
            break;
  
          case "throw":
            front.reject(value);
            break;
  
          default:
            front.resolve({
              value: value,
              done: false
            });
            break;
        }
  
        front = front.next;
  
        if (front) {
          resume(front.key, front.arg);
        } else {
          back = null;
        }
      }
  
      this._invoke = send;
  
      if (typeof gen.return !== "function") {
        this.return = undefined;
      }
    }
  
    if (typeof Symbol === "function" && Symbol.asyncIterator) {
      AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
        return this;
      };
    }
  
    AsyncGenerator.prototype.next = function (arg) {
      return this._invoke("next", arg);
    };
  
    AsyncGenerator.prototype.throw = function (arg) {
      return this._invoke("throw", arg);
    };
  
    AsyncGenerator.prototype.return = function (arg) {
      return this._invoke("return", arg);
    };
  
    return {
      wrap: function (fn) {
        return function () {
          return new AsyncGenerator(fn.apply(this, arguments));
        };
      },
      await: function (value) {
        return new AwaitValue(value);
      }
    };
  }();
  
  
  
  
  
  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  
  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
  
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  
  var getDependencyError = function getDependencyError(pluginName, dependencyName) {
    return new Error('The \'' + pluginName + '\' plugin requires \'' + dependencyName + '\' to be defined before it.');
  };
  
  var PluginHost = function () {
    function PluginHost() {
      classCallCheck(this, PluginHost);
  
      this.plugins = [];
      this.subscriptions = new Set();
      this.gettersCache = {};
    }
  
    createClass(PluginHost, [{
      key: 'ensureDependencies',
      value: function ensureDependencies() {
        var defined = new Set();
        var knownOptionals = new Map();
        this.plugins.filter(function (plugin) {
          return plugin.container;
        }).forEach(function (plugin) {
          if (knownOptionals.has(plugin.name)) {
            throw getDependencyError(knownOptionals.get(plugin.name), plugin.name);
          }
  
          plugin.dependencies.forEach(function (dependency) {
            if (defined.has(dependency.name)) return;
            if (dependency.optional) {
              if (!knownOptionals.has(dependency.name)) {
                knownOptionals.set(dependency.name, plugin.name);
              }
              return;
            }
            throw getDependencyError(plugin.name, dependency.name);
          });
  
          defined.add(plugin.name);
        });
      }
    }, {
      key: 'registerPlugin',
      value: function registerPlugin(plugin) {
        this.plugins = insertPlugin(this.plugins, plugin);
        this.cleanPluginsCache();
      }
    }, {
      key: 'unregisterPlugin',
      value: function unregisterPlugin(plugin) {
        this.plugins.splice(this.plugins.indexOf(plugin), 1);
        this.cleanPluginsCache();
      }
    }, {
      key: 'cleanPluginsCache',
      value: function cleanPluginsCache() {
        this.validationRequired = true;
        this.gettersCache = {};
        this.knownKeysCache = {};
      }
    }, {
      key: 'knownKeys',
      value: function knownKeys(postfix) {
        if (!this.knownKeysCache[postfix]) {
          this.knownKeysCache[postfix] = Array.from(this.plugins.map(function (plugin) {
            return Object.keys(plugin);
          }).map(function (keys) {
            return keys.filter(function (key) {
              return key.endsWith(postfix);
            })[0];
          }).filter(function (key) {
            return !!key;
          }).reduce(function (acc, key) {
            return acc.add(key);
          }, new Set())).map(function (key) {
            return key.replace(postfix, '');
          });
        }
        return this.knownKeysCache[postfix];
      }
    }, {
      key: 'collect',
      value: function collect(key, upTo) {
        var _this = this;
  
        if (this.validationRequired) {
          this.ensureDependencies();
          this.validationRequired = false;
        }
  
        if (!this.gettersCache[key]) {
          this.gettersCache[key] = this.plugins.map(function (plugin) {
            return plugin[key];
          }).filter(function (plugin) {
            return !!plugin;
          });
        }
        if (!upTo) return this.gettersCache[key];
  
        var upToIndex = this.plugins.indexOf(upTo);
        return this.gettersCache[key].filter(function (getter) {
          var pluginIndex = _this.plugins.findIndex(function (plugin) {
            return plugin[key] === getter;
          });
          return pluginIndex < upToIndex;
        });
      }
    }, {
      key: 'get',
      value: function get$$1(key, upTo) {
        var plugins = this.collect(key, upTo);
  
        if (!plugins.length) return undefined;
  
        var result = plugins[0]();
        plugins.slice(1).forEach(function (plugin) {
          result = plugin(result);
        });
        return result;
      }
    }, {
      key: 'registerSubscription',
      value: function registerSubscription(subscription) {
        this.subscriptions.add(subscription);
      }
    }, {
      key: 'unregisterSubscription',
      value: function unregisterSubscription(subscription) {
        this.subscriptions.delete(subscription);
      }
    }, {
      key: 'broadcast',
      value: function broadcast(event, message) {
        this.subscriptions.forEach(function (subscription) {
          return subscription[event] && subscription[event](message);
        });
      }
    }]);
    return PluginHost;
  }();
  
  var EventEmitter = function () {
    function EventEmitter() {
      classCallCheck(this, EventEmitter);
  
      this.handlers = [];
    }
  
    createClass(EventEmitter, [{
      key: "emit",
      value: function emit(e) {
        this.handlers.forEach(function (handler) {
          return handler(e);
        });
      }
    }, {
      key: "subscribe",
      value: function subscribe(handler) {
        this.handlers.push(handler);
      }
    }, {
      key: "unsubscribe",
      value: function unsubscribe(handler) {
        this.handlers.splice(this.handlers.indexOf(handler), 1);
      }
    }]);
    return EventEmitter;
  }();
  
  function shallowEqual(objA, objB) {
    if (objA === objB) {
      return true;
    }
  
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
  
    if (keysA.length !== keysB.length) {
      return false;
    }
  
    // Test for A's keys different from B.
    var hasOwn = Object.prototype.hasOwnProperty;
    for (var i = 0; i < keysA.length; i += 1) {
      if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
        return false;
      }
  
      var valA = objA[keysA[i]];
      var valB = objB[keysA[i]];
  
      if (valA !== valB) {
        return false;
      }
    }
  
    return true;
  }
  
  function argumentsShallowEqual(prev, next) {
    if (prev === null || next === null || prev.length !== next.length) {
      return false;
    }
  
    for (var i = 0; i < prev.length; i += 1) {
      if (prev[i] !== next[i]) {
        return false;
      }
    }
  
    return true;
  }
  
  var memoize = function memoize(func) {
    var lastArgs = null;
    var lastResult = null;
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      if (lastArgs === null || !argumentsShallowEqual(lastArgs, args)) {
        lastResult = func.apply(undefined, args);
      }
      lastArgs = args;
      return lastResult;
    };
  };
  
  var easeInQuad = function easeInQuad(t) {
    return t * t;
  };
  var easeOutQuad = function easeOutQuad(t) {
    return t * (2 - t);
  };
  var easeInOutQuad = function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };
  
  var easeInCubic = function easeInCubic(t) {
    return t * t * t;
  };
  var easeOutCubic = function easeOutCubic(t) {
    return (t - 1) * (t - 1) * (t - 1) + 1;
  };
  var easeInOutCubic = function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };
  
  var easeInQuart = function easeInQuart(t) {
    return t * t * t * t;
  };
  var easeOutQuart = function easeOutQuart(t) {
    return 1 - (t - 1) * (t - 1) * (t - 1) * (t - 1);
  };
  var easeInOutQuart = function easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (t - 1) * (t - 1) * (t - 1) * (t - 1);
  };
  
  var easeInQuint = function easeInQuint(t) {
    return t * t * t * t * t;
  };
  var easeOutQuint = function easeOutQuint(t) {
    return 1 + (t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1);
  };
  var easeInOutQuint = function easeInOutQuint(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1);
  };
  
  return {
    PluginHost,
    EventEmitter,
    memoize,
    shallowEqual,
    argumentsShallowEqual,
    easeInQuad,
    easeOutQuad,
    easeInOutQuad,
    easeInCubic,
    easeOutCubic,
    easeInOutCubic,
    easeInQuart,
    easeOutQuart,
    easeInOutQuart,
    easeInQuint,
    easeOutQuint,
    easeInOutQuint
  };
  }();
  //# sourceMappingURL=dx-core.es.js.map
  