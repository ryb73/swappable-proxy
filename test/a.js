"use strict";

const SwappableProxy = require("../"),
      B              = require("./b");

function A() {
  let proxy = new SwappableProxy(this);

  function doSwap() {
    proxy.swap(new B());
  }
  this.doSwap = doSwap;

  return proxy.instance;
}

module.exports = A;