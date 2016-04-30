"use strict";

function SwappableProxy($target) {
  let target = $target;
  let instance;

  function initialize() {
    // Only implementing a few of the main traps for now. Once the latest proxy
    // spec is implemented by v8, this will need to be updated
    let handler = {
      has: function(dummy, property) {
        return property in target;
      },

      get: function(dummy, property, receiver) {
        if(property === "toJSON") {
          return handleToJSON();
        }

        return target[property];
      },

      set: function(dummy, property, value, receiver) {
        target[property] = value;
        return true;
      }
    };

    // Wrap the proxy around a dummy placeholder object -- the handler will reference our own
    // internal target instead
    instance = new Proxy({}, handler);
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