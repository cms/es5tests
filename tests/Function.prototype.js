test("Function.prototype.bind (&sect;15.3.4.5)", function () {
  if (!Function.prototype.hasOwnProperty("bind")) {
    throw new Error("Function.prototype.bind doesn't exist");
  }

  function dummy() { return this; }
  var o = {}, bound = dummy.bind(o);

  ok( typeof Function.prototype.bind === "function", "Is a function");
  strictEqual( Function.prototype.bind.length, 1, "Function length speficied to one");
  ok( function () {
    try {
      Function.prototype.bind.call({});
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError when target is not callable");
  strictEqual( typeof bound, "function", "Returns a function object");
  strictEqual( bound.hasOwnProperty("prototype"), false, "Resulting function doesn't have a prototype property");
  ok( function () {
    return bound() == o;
  }(), "Sets the right this value ([[BoundThis]])");
  strictEqual(function () { return Array.prototype.join.call(arguments) }.bind(o,1,2)(3,4), "1,2,3,4", "Persists the new function [[BoundArgs]]");
  strictEqual(function (a,b,c,d) { }.bind(o,1,2).length, 2, "The resulting function length should be Target.arguments.length minus [[BoundArgs]]");
  strictEqual(dummy.bind(o,1,2).length, 0, "If there are more [[BoundArgs]] than Target.arguments defined, length should be zero");
});
