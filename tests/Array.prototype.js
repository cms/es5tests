test("Array.prototype.indexOf (&sect;15.4.4.14)", function () {
  if (!Array.prototype.hasOwnProperty("indexOf")) {
    throw new Error("Array.prototype.indexOf doesn't exist");
  }

  ok( typeof Array.prototype.indexOf === "function", "Is a function");
  strictEqual( [1,1,1].indexOf(1), 0, "Compares in ascending order, returning the index of the first found position");
  ok( function () {
    return [null].indexOf(undefined) === -1  && [""].indexOf(0) === -1 &&
           [false].indexOf(0) === -1 && ["\n\r "].indexOf(false) === -1 &&
           ['0'].indexOf(0) === -1 && [0].indexOf('') === -1;
  }(), "Strict equality algorithm is used");
  strictEqual( ['foo'].indexOf(1), -1, "If searchElement is not found, -1 is returned");
  strictEqual( ['foo'].indexOf('foo', 1), -1, "If fromIndex argument greater or equal than length, returns -1, i.e. the array will not be searched");
  strictEqual( [1,2,3].indexOf(2, -2), 1, "If fromIndex is negative, it is used as the offset from the end of the array to compute fromIndex");
  strictEqual( [1,2,3].indexOf(1, -10), 0, "If the computed index is less than 0, the whole array will be searched");
  strictEqual( [].indexOf('foo'), -1, "If the target object length property is zero, return -1");
  strictEqual( ['foo',0,'foo'].indexOf('foo', 1), 2, "fromIndex argument starts the search at a defined index");
  strictEqual( Array.prototype.indexOf.length, 1, "Function length speficied to one");
  ok( Array.prototype.indexOf.call({0: 'foo', 1: 'bar', length: 2}, 'bar') === 1, "Can be used with array-like objects");
});

test("Array.prototype.lastIndexOf (&sect;15.4.4.15)", function () {
  if (!Array.prototype.hasOwnProperty("lastIndexOf")) {
    throw new Error("Array.prototype.lastIndexOf doesn't exist");
  }

  ok( typeof Array.prototype.lastIndexOf === "function", "Is a function");
  strictEqual( [1,1,1].lastIndexOf(1), 2, "Compares in descending order, returning the index of the first found position");
  ok( function () {
    return [null].lastIndexOf(undefined) === -1  && [""].lastIndexOf(0) === -1 &&
           [false].lastIndexOf(0) === -1 && ["\n\r "].lastIndexOf(false) === -1 &&
           ['0'].lastIndexOf(0) === -1 && [0].lastIndexOf('') === -1;
  }(), "Strict equality algorithm is used");
  strictEqual( ['foo'].lastIndexOf(1), -1, "If searchElement is not found, -1 is returned");
  strictEqual( [].lastIndexOf('foo'), -1, "If the target object length property is zero, return -1");
  strictEqual( ['foo',0,'foo'].lastIndexOf('foo', 1), 0, "fromIndex argument is used");
  strictEqual( [1,2,3].lastIndexOf(2, -2), 1, "fromIndex argument with negative value should be len - abs(n)");
  strictEqual( Array.prototype.lastIndexOf.length, 1, "Function length speficied to one");
  strictEqual( Array.prototype.lastIndexOf.call({0: 'bar', 1: 'bar', length:2}, 'bar'), 1, "Can be used with array-like objects");
});

test("Array.prototype.every (&sect;15.4.4.16)", function () {
  if (!Array.prototype.hasOwnProperty("every")) {
    throw new Error("Array.prototype.every doesn't exist");
  }

  ok( typeof Array.prototype.every === "function", "Is a function");
  strictEqual( Array.prototype.every.length, 1, "Function length speficied to one");
  ok( function () {
    try {
      [].every({});
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError when callbackfn is not callable");
  ok( function () {
    var arr = [];
    arr[10] = 'foo'; // only one element with the index 10, length is now 11
    return arr.every(function (val, index) { return index === 10 && val === "foo";});
  }(), "callbackfn is called only for elements of the array which actually exist; it is not called for missing elements of the array");
  ok( function () {
    var arr = [1,2,3];
    return arr.every(function (val, index) {
      if (index === 0) { arr.push(4); } // added after every call
      return val !== 4;
    });
  }(),"Elements which are appended to the array after the call to every begins will not be visited by callbackfn");
  ok( function () {
    var arr = [1,2,3];

    return arr.every(function (val, index) {
    if (index === 0) { arr[arr.length - 1] = 'foo'; } // changed after every call
      return val !== 3; // 3 shouldn't be found
    });
  }(), "If existing elements of the array are changed, their value as passed to callbackfn will be the value at the time every visits them");

  ok( function () {
    var arr = [1,2,3];

    return arr.every(function (val, index) {
    if (index === 0) { delete arr[1]; } // deleted index 1 after every call
      return index !== 1; // index 1 shouldn't be visited
    });
  }(), "Elements that are deleted after the call to every begins and before being visited are not visited");


  ok([].every(function () {}), "In particular, for an empty array, it returns true");
  ok( function () {
    var o = {};
    return [0].every(function () { return o === this; }, o);
  }(), "The thisArg argument is set as this value of callbackfn");
  ok( Array.prototype.every.call({0: 1, 1: 2, length: 2}, function (val) { return val > 0;}), "Can be used with array-like objects");
});

test("Array.prototype.some (&sect;15.4.4.17)", function () {
  if (!Array.prototype.hasOwnProperty("some")) {
    throw new Error("Array.prototype.some doesn't exist");
  }

  ok( typeof Array.prototype.some === "function", "Is a function");
  strictEqual( Array.prototype.some.length, 1, "Function length speficied to one");
  ok( function () {
    try {
      [].some({});
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError when callbackfn is not callable");
  ok( function () {
    var arr = [];
    arr[10] = 'foo'; // only one element with the index 10, length is now 11
    return arr.some(function (val, index) { return index === 10 && val === "foo";});
  }(), "callbackfn is called only for elements of the array which actually exist; it is not called for missing elements of the array");
  ok( function () {
    var arr = [1,2,3];
    return !arr.some(function (val, index) {
      if (index === 0) { arr.push(4); } // added after some 
      return val === 4;
    });
  }(),"Elements which are appended to the array after the call to some begins will not be visited by callbackfn");
  ok( function () {
    var arr = [1,2,3];

    return !arr.some(function (val, index) {
    if (index === 0) { arr[2] = 'foo'; } // changed after some
      return val === 3; // 3 shouldn't be found, since array can mutate from callbackfn
    });
  }(), "If existing elements of the array are changed, their value as passed to callbackfn will be the value at the time some visits them");

  ok( function () {
    var arr = [1,2,3];

    return !arr.some(function (val, index) {
    if (index === 0) { delete arr[1]; } // index 1 deleted after the some call
      return index === 1; // index 1 shouldn't be visited
    });
  }(), "Elements that are deleted after the call to some begins and before being visited are not visited");

  strictEqual([].some(function () {}), false, "In particular, for an empty array, it returns false");
  ok( function () {
    var o = {};
    return [0].some(function () { return o === this; }, o);
  }(), "The thisArg argument is set as this value of callbackfn");
  ok( Array.prototype.some.call({0: 1, 1: 2, length: 2}, function (val) { return val === 2;}), "Can be used with array-like objects");
});

test("Array.prototype.forEach (&sect;15.4.4.18)", function () {
  if (!Array.prototype.hasOwnProperty("forEach")) {
    throw new Error("Array.prototype.forEach doesn't exist");
  }

  ok( typeof Array.prototype.forEach === "function", "Is a function");

  ok(function () {
    var arr = [1,2,3], indexes = [];

    arr.forEach(function (val, index) {
      indexes.push(index);
    });

    return indexes.join() === "0,1,2";
  }(), "callbackfn is invoked once for each element present in the array, in ascending order.");

  ok( function () {
    var arr = [], result;
    arr[10] = 'foo'; // only one element with the index 10, length is now 11
    arr.forEach(function (val, index) { result = val === 'foo' && index === 10; });
    return result;
  }(), "callbackfn is called only for elements of the array which actually exist; it is not called for missing elements of the array");

  ok( function () {
    var arr = ['foo'], result;

    arr.forEach(function (val, index, o) {
      result = val === 'foo' && index === 0 && o === arr;
    });
    return result;
  }(), "callbackfn is called with three arguments: the value of the element, the index of the element, and the object being traversed");

  ok( function () {
    var arr = [1,2,3], lastValue;
    arr.forEach(function (val, index) {
      if (index === 0) { arr.push(4); } 
      lastValue = val;
    });
    return lastValue === 3;
  }(),"Elements which are appended to the array after the call to forEach begins will not be visited by callbackfn");

  ok( function () {
    var arr = [1,2,3], result, n = arr.length - 1;

    arr.forEach(function (val, index) {
      if (index === 0) { arr[n] = 'foo'; } // change the last item value on the first call
      if (index === n) { result = arr[n] === 'foo'; } // verify the change on the last call
    });
    return result;
  }(), "If existing elements of the array are changed, their value as passed to callbackfn will be the value at the time forEach visits them");

  ok( function () {
    var arr = [1,2,3], result = true;

    arr.forEach(function (val, index) {
      if (index === 0) { delete arr[1]; } // delete index 1 on first call
      if (index === 1) { result = false; } // index 1 shouldn't be visited
    });
    return result;
  }(), "Elements that are deleted after the call to forEach begins and before being visited are not visited");

  ok( function () {
    try {
      [].forEach({});
    } catch (e) {
      return e instanceof TypeError;
    }
  }(), "Throws TypeError when callbackfn is not callable");

  ok( function () {
    var o = {}, result;
    [0].forEach(function () { result = this === o; }, o);
    return result;
  }(), "The thisArg argument is set as this value of callbackfn");

  ok( function () {
    var result;
    Array.prototype.forEach.call({0: 1, length: 1}, function (val, index) { result = (val == 1 && index == 0);})
    return result;
  }(), "Can be used with array-like objects");

  strictEqual( Array.prototype.forEach.length, 1, "Function length speficied to one");
});
