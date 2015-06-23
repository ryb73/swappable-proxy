"use strict";

function SwappableProxy($target) {
  let target = $target;
  let instance;

  function initialize() {
    // Only implementing a few of the main traps for now. Once the latest proxy
    // spec is implemented by v8, this will need to be updated
    let handler = {
      has: function(property) {
        return property in target;
      },

      get: function(receiver, property) {
        return target[property];
      },

      set: function(receiver, property, value) {
        target[property] = value;
        return true;
      },

      enumerate: function() {
        let result = [];
        for(let item in target) {
          result.push(item);
        }
        return result;
      }
    };

    instance = Proxy.create(handler, {});
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