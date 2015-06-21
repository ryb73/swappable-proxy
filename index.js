"use strict";

require("harmony-reflect");

const _ = require("lodash");

function SwappableProxy($target) {
  let target = $target;
  let instance;

  function initialize() {
    let traps = [ "getPrototypeOf", "setPrototypeOf", "isExtensible", "preventExtensions",
      "getOwnPropertyDescriptor", "defineProperty", "has", "get", "set", "deleteProperty",
      "enumerate", "ownKeys", "apply", "construct" ];

    let handler = {};
    traps.forEach(function(trap) {
      handler[trap] = generateHandlerFunction(trap);
    });

    instance = new Proxy({}, handler);
  }

  function generateHandlerFunction(trap) {
    return function() {
      let args = _.clone(arguments);
      args[0] = target;
      return Reflect[trap].apply(Reflect, args);
    };
  }

  function swap(newTarget) {
    target = newTarget;
  }
  this.swap = swap;

  Object.defineProperties(this, {
    instance: {
      enumerable: true,
      get: function() {
        return instance;
      }
    }
  });

  initialize();
  $target = null;
}

module.exports = SwappableProxy;