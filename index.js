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
        if(property === "toJSON") {
          return handleToJSON();
        }

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

  // Special case for toJSON -- if the target didn't define its own toJSON
  // function, then we want to make sure that JSON doesn't try to JSONify
  // the proxy object
  function handleToJSON() {
    if(target.toJSON)
      return target.toJSON;

    return function toJSON() {
      return target;
    };
  }

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