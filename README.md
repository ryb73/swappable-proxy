# swappable-proxy

Example:

```javascript
const SwappableProxy = require("swappable-proxy"),
      B              = require("./b");

function A() {
  let proxy = new SwappableProxy(this);

  function doSwap() {
    proxy.swap(new B());
  }
  this.doSwap = doSwap;

  function sayHi() {
    console.log("My name is A");
  }
  this.sayHi = sayHi;

  return proxy.instance;
}

module.exports = A;
```

```javascript
function B() {
  function sayHi() {
    console.log("This is B");
  }
}

module.exports = B;
```

```javascript
let obj = new A();
obj.sayHi(); // My name is A
obj.doSwap();
obj.sayHi(); // This is B
```