"use strict";

const SwappableProxy = require("../");

function B($skipProxy) {
  let proxy;
  let value = "bee";

  if(!$skipProxy) {
    proxy = new SwappableProxy(this);
  }

  // Inject A to avoid circular dependency
  function doSwap(A) {
    if(proxy) {
      proxy.swap(new A());
    } else {
      throw new Error("Not a proxied instance");
    }
  }
  this.doSwap = doSwap;

  function getValue() {
    return value;
  }
  this.getValue = getValue;

  this.bField = "b";

  if(!$skipProxy) {
    return proxy.instance;
  }
}

B.prototype = {
  protoGetValue: function() {
    return this.bField;
  }
};

module.exports = B;