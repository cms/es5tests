test("Object.getPrototypeOf (&sect;15.2.3.2)", function() {
  if (!Object.hasOwnProperty("getPrototypeOf")) {
    throw new Error("Object.getPrototypeOf doesn't exist");
  }

  ok( typeof Object.getPrototypeOf === "function", "Is a function" );
  strictEqual( Object.getPrototypeOf.length, 1, "Function expects one argument" );
  ok( function () {
    try {
    Object.getPrototypeOf(0);
    } catch(e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError if argument is not an object");

  ok( function () {
    function Dummy(){} // Dummy constructor

    return Object.getPrototypeOf(new Dummy()) === Dummy.prototype;
  }(), "Gets the right [[Prototype]] internal property");

});

test("Object.getOwnPropertyDescriptor (&sect;15.2.3.3)", function () {
  if (!Object.hasOwnProperty("getOwnPropertyDescriptor")) {
    throw new Error("Object.getOwnPropertyDescriptor doesn't exist");
  }

  ok( typeof Object.getOwnPropertyDescriptor === "function", "Is a function" );
  strictEqual( Object.getOwnPropertyDescriptor.length, 2, "Function expects two arguments" );
  ok( function () {
    try {
    Object.getOwnPropertyDescriptor(0, 'foo');
    } catch(e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError if argument is not an object");
  ok( function () {
    var d = Object.getOwnPropertyDescriptor([], "length");
    return !d.configurable && !d.enumerable && d.writable;
  }(), "Gets a valid property descriptor" );
});

test("Object.getOwnPropertyNames (&sect;15.2.3.4)", function() {
  if (!Object.hasOwnProperty("getOwnPropertyNames")) {
    throw new Error("Object.getOwnPropertyNames doesn't exist");
  }

  ok( typeof Object.getOwnPropertyNames === "function", "Is a function" );
  strictEqual( Object.getOwnPropertyNames.length, 1, "Function expects one argument" );
  ok( function () {
    try {
      Object.getOwnPropertyName(0);
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError if type of first argument is not Object" );
  ok( function () {
    try {
      Object.getOwnPropertyName(0);
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError if type of first argument is not Object" );

  strictEqual( Object.getOwnPropertyNames([])[0], "length", "Gets non enumerable properties" );
  strictEqual( Object.getOwnPropertyNames(new String("foo")).join(), "0,1,2", "If the argument is a String instance, own properties will be the character positions" );
});

test("Object.create (&sect;15.2.3.5)", function() {
  // prerequisites
  if (!Object.hasOwnProperty("create")) {
    throw new Error("Object.create doesn't exist");
  }

  ok( typeof Object.create === "function", "Is a function" );
  strictEqual( Object.create.length, 2, "Function expects two arguments" );
  ok(function () {
    try {
      Object.create(0);
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError if type of first argument is not Object" );

  ok(function () {
    try {
      Object.create(null);
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError first argument is null" );

  ok(function () {
    if (typeof Object.getPrototypeOf != "function") {
      throw new Error("Object.getPrototypeOf is not a function");
    }

    if (typeof Object.prototype.isPrototypeOf === "undefined") {
      throw new Error("Object.prototype.isPrototypeOf is not a function");
    }

    var proto = {},
        obj = Object.create(proto);

    return Object.getPrototypeOf(obj) === proto && proto.isPrototypeOf(obj);
  }(), "Sets the right [[Prototype]]" );

  ok(function () {
    var obj = Object.create({}, {
      x: {
        value: true
      },
      y: {
        value: "foo"
      }
    });

    return obj.hasOwnProperty("x") && obj.hasOwnProperty("y") &&
           obj.x === true && obj.y === "foo";
  }(), "Object.create initialises object with new properties" );
});

test("Object.defineProperty (&sect;15.2.3.6)", function() {
  if (!Object.hasOwnProperty("defineProperty")) {
    throw new Error("Object.defineProperty doesn't exist");
  }

  ok( typeof Object.defineProperty === "function", "Is a function");
  strictEqual( Object.defineProperty.length, 3, "Function expects three arguments");
  ok( function () {
    try {
      Object.defineProperty(0, "test", { writable: false });
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throw TypeError if O is not Object");

  ok( function () {
    try {
      Object.defineProperty({}, "test", { get: false });
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throw TypeError when [[Get]] not callable");

  ok( function () {
    try {
      Object.defineProperty({}, "test", { set: false });
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throw TypeError when [[Set]] not callable");

  ok( function () {
    var result;
    try {
      Object.defineProperty({}, "test", { get: function () { return "foo"; }, writable: true});
    } catch (e) {
      result = e instanceof TypeError;
    }

    try {
      Object.defineProperty({}, "test", { set: function () {}, writable: true});
    } catch (e) {
      result = result && e instanceof TypeError;
    }

    try {
      Object.defineProperty({}, "test", { get: function () { return "foo"; }, value: true });
    } catch (e) {
      result = result && e instanceof TypeError;
    }

    try {
      Object.defineProperty({}, "test", { get: function () {}, value: true });
    } catch (e) {
      result = result && e instanceof TypeError;
    }

    return result;
  }(), "[[Get]] or [[Set]] with [[Value]] or [[Writable]] descriptors combination should throw TypeError");


  ok( function () {
    try {
      Object.defineProperty({}, "test", { get: function () { return "foo"; }, writable: true});
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Getter and writable descriptors should throw TypeError");

  ok( function () {
    var o = {};
    return Object.defineProperty(o, "test", { value: true}) === o;
  }(), "Function returns the same object reference");
});

test("Object.defineProperties (&sect;15.2.3.7)", function () {
  if (!Object.hasOwnProperty("defineProperties")) {
    throw new Error("Object.defineProperty doesn't exist");
  }

  ok( typeof Object.defineProperties === "function", "Is a function");
  strictEqual( Object.defineProperties.length, 2, "Function expects two arguments");
  ok( function () {
    try {
      Object.defineProperties(0, {});
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError if first argument is not an object");
});

test("Object.seal (&sect;15.2.3.8)", function () {
  if (!Object.hasOwnProperty("seal")) {
    throw new Error("Object.seal doesn't exist");
  }

  ok( typeof Object.seal === "function", "Is a function");
  strictEqual( Object.seal.length, 1, "Function expects one argument");
  ok( function () {
    try {
      Object.seal(0);
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError if argument is not an object");
});

test("Object.freeze (&sect;15.2.3.9)", function () {
  if (!Object.hasOwnProperty("freeze")) {
    throw new Error("Object.freeze doesn't exist");
  }

  ok( typeof Object.freeze === "function", "Is a function");
  strictEqual( Object.freeze.length, 1, "Function expects one argument");
  ok( function () {
    try {
      Object.freeze(0);
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError if argument is not an object");
});

test("Object.preventExtensions (&sect;15.2.3.10)", function () {
  if (!Object.hasOwnProperty("preventExtensions")) {
    throw new Error("Object.preventExtensions doesn't exist");
  }

  ok( typeof Object.preventExtensions === "function", "Is a function");
  strictEqual( Object.preventExtensions.length, 1, "Function expects one argument");
  ok( function () {
    try {
      Object.preventExtensions(0);
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError if argument is not an object");
  ok( function () {
    var o = {foo: "bar"},
        isNotExtensible;

    Object.preventExtensions(o);
    o.baz = "baz";

    isNotExtensible = typeof Object.isExtensible === "function" ? Object.isExtensible(o) === false
                                                                : typeof o.baz === "undefined";
    return isNotExtensible;
  }(), "Functionality test");
});

test("Object.isSealed (&sect;15.2.3.11)", function() {
  if (!Object.hasOwnProperty("isSealed")) {
    throw new Error("Object.isSealed doesn't exist");
  }
  ok( typeof Object.isSealed === "function", "Is a function");
  strictEqual( Object.isSealed.length, 1, "Function expects one argument");
  ok( function () {
    try {
      Object.isSealed(0);
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError if argument is not an object");
  ok( typeof Object.isSealed({}) === "boolean", "Returns a boolean result");
  ok( function(){
    var obj = {};
    Object.seal( obj );
    obj.foo = "bar"; // Exception in strict mode
    return Object.isSealed( obj ) && typeof obj.foo === 'undefined';
  }(),"");
});

test("Object.isFrozen (&sect;15.2.3.12)", function() {
  if (!Object.hasOwnProperty("isFrozen")) {
    throw new Error("Object.isFrozen doesn't exist");
  }
  ok( typeof Object.isFrozen === "function", "Is a function");
  strictEqual( Object.isFrozen.length, 1, "Function expects one argument");
  ok( function () {
    try {
      Object.isFrozen(0);
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError if argument is not an object");
  ok( typeof Object.isFrozen({}) === "boolean", "Returns a boolean result");
  ok( function(){
    var obj = {};
    Object.freeze( obj );
    obj.foo = "bar"; // Exception in strict mode
    return Object.isFrozen( obj ) && typeof obj.foo === 'undefined';
  }(),"");
});

test("Object.isExtensible (&sect;15.2.3.13)", function() {
  if (!Object.hasOwnProperty("isExtensible")) {
    throw new Error("Object.isExtensible doesn't exist");
  }

  ok( typeof Object.isExtensible === "function", "Is a function");
  strictEqual( Object.isExtensible.length, 1, "Function expects one argument");
  ok( function () {
    try {
      Object.isExtensible(0);
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError if argument is not an object");
  ok( typeof Object.isExtensible({}) === "boolean", "Returns a boolean result");
  // Functionality test
  ok( function(){
    var obj = {};
    Object.preventExtensions( obj );
    obj.foo = "bar"; // Exception in strict mode
    return !Object.isExtensible( obj ) && typeof obj.foo === 'undefined';
  }(),"");
});

test("Object.keys (&sect;15.2.3.14)", function() {
  if (!Object.hasOwnProperty("keys")) {
    throw new Error("Object.keys doesn't exist");
  }

  ok( typeof Object.keys === "function", "Is a function");
  strictEqual( Object.keys.length, 1, "Function expects one argument");
  ok( function () {
    try {
      Object.keys(0);
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError when argument is not an object");
  ok( function () {
    try {
      Object.keys(0);
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError when argument is not an object");
  //
  // Functionality tests
  strictEqual( Object.prototype.toString.call(Object.keys({})), "[object Array]", "The method returns an array object");
  ok( function () {
    var o = { foo: 1, bar: 2, baz: 3, 0: true},
        result = Object.keys(o), i = 0;
    for (var prop in o ) {
      if ( o.hasOwnProperty(prop) && prop != result[i++]) {
        return false;
      }
    }
    return true;
  }(), "Respects the same iteration algoritm implemented by the for...in statement");

  ok( function () {
    function Dummy () {}
    Dummy.prototype.foo = true;

    return Object.keys(new Dummy()).length === 0;
  }(), "Gets only own properties");
  strictEqual( Object.keys([]).length, 0, "Gets only enumerable property names");
});
