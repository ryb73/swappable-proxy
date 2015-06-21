"use strict";
/* jshint mocha: true */

const chai   = require("chai"),
      assert = chai.assert,
      A      = require("./a"),
      B      = require("./b");

describe("SwappableProxy", function() {
  it("supports getPrototypeOf", function() {
    let obj = new A();
    assert.instanceOf(obj, A);
    obj.doSwap();
    assert.instanceOf(obj, B);
  });
});