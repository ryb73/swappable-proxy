"use strict";
/* jshint mocha: true */

const chai   = require("chai"),
      assert = chai.assert,
      A      = require("./a"),
      B      = require("./b");

describe("SwappableProxy", function() {
  it("supports has", function() {
    let obj = new A();

    assert.property(obj, "aField");
    assert.notProperty(obj, "bField");

    obj.doSwap();

    assert.property(obj, "bField");
    assert.notProperty(obj, "aField");
  });

  it("supports get", function() {
    let obj = new A();
    assert.equal(obj.aField, "a");

    obj.doSwap();
    assert.equal(obj.bField, "b");
  });

  it("supports set for existing properties", function() {
    let obj = new A();

    obj.aField = "A!";
    assert.equal(obj.aField, "A!");

    obj.doSwap();

    obj.bField = "B!";
    assert.equal(obj.bField, "B!");
  });

  it("supports set for new properties", function() {
    let obj = new A();
    obj.newProp = "A!";
    assert.equal(obj.newProp, "A!");

    obj.doSwap();

    obj.newProp = "B!";
    assert.equal(obj.newProp, "B!");
  });

  it.skip("supports for..in", function() {
    let proxiedObj = new A();
    let nonProxiedA = new A(true);
    let nonProxiedB = new B(true);

    console.log(Object.keys(proxiedObj));

    let propsProxied = doForIn(proxiedObj);
    let propsA = doForIn(nonProxiedA);
    assert.deepEqual(propsProxied, propsA);

    proxiedObj.doSwap();

    propsProxied = doForIn(proxiedObj);
    let propsB = doForIn(nonProxiedB);
    assert.deepEqual(propsProxied, propsB);
  });

  it("supports function application", function() {
    let obj = new A();
    assert.equal(obj.getValue(), "ay");
    obj.doSwap();
    assert.equal(obj.getValue(), "bee");
  });

  it("supports function application on prototype", function() {
    let obj = new A();
    assert.equal(obj.protoGetValue(), "a");
    obj.doSwap();
    assert.equal(obj.protoGetValue(), "b");
  });

  it("supports swapping back and forth", function() {
    let obj = new A();
    assert.equal(obj.aField, "a");

    obj.doSwap();
    assert.equal(obj.bField, "b");

    obj.doSwap(A);
    assert.equal(obj.aField, "a");
  });

  it("supports JSON.stringify", function() {
    let proxiedObj = new A();
    let nonProxiedA = new A(true);
    let nonProxiedB = new B(true);

    assert.equal(JSON.stringify(proxiedObj), JSON.stringify(nonProxiedA));
    proxiedObj.doSwap();
    assert.equal(JSON.stringify(proxiedObj), JSON.stringify(nonProxiedB));
  });
});

function doForIn(obj) {
  let results = [];
  for(let item in obj) {
    results.push(item);
  }
  return results;
}