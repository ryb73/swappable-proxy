"use strict";

const SwappableProxy = require("../"),
      B              = require("./b");

function A($skipProxy) {
  let proxy;
  let value = "ay";

  if(!$skipProxy) {
    proxy = new SwappableProxy(this);
  }

  function doSwap() {
    if(proxy) {
      proxy.swap(new B());
    } else {
      throw new Error("Not a proxied instance");
    }
  }
  this.doSwap = doSwap;

  function getValue() {
    return value;
  }
  this.getValue = getValue;

  this.aField = "a";

  if(!$skipProxy) {
    return proxy.instance;
  }
}

A.prototype = {
  protoField: 1,
  protoGetValue: function() {
    return this.aField;
  }
};

module.exports = A;