"use strict";

const SwappableProxy = require("../"),
      A              = require("./a");

function B() {
  let proxy = new SwappableProxy(this);
  return proxy.instance;
}

module.exports = B;