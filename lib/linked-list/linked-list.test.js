'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;

var LinkedList = require('./linked-list');

describe('LinkedList', function () {
  it('is accessible', function () {
    expect(LinkedList).to.be.defined;
  });

  it('is a constructor', function () {
    expect(LinkedList).to.be.a('function');

    var list = new LinkedList();
    expect(list).to.be.an('object');
    expect(list).to.be.instanceof(LinkedList);
  });

  describe('instance', function () {
    var list;

    beforeEach(function () {
      list = new LinkedList();
    });

    it('is an object', function () {
      expect(list).to.be.an('object');
      expect(list).to.be.instanceof(LinkedList);
    });

    describe('.unshift(value)', function () {
      it('is a function', function () {
        expect(list.unshift).to.be.a('function');
      });

      it('inserts `value` to the beginning of the list', function () {
        expect(list).to.have.length(0);

        list.unshift(1);
        expect(list).to.have.length(1);

        list.unshift(2);
        expect(list).to.have.length(2);
        expect(list.toArray()).to.eql([2, 1]);

        list.unshift(3);
        expect(list).to.have.length(3);
        expect(list.toArray()).to.eql([3, 2, 1]);
      });

      it('returns the updated `.length`', function () {
        expect(list).to.have.length(0);

        expect(list.unshift('foo')).to.equal(1);
        expect(list).to.have.length(1);

        expect(list.unshift('bar')).to.equal(2);
        expect(list).to.have.length(2);

        expect(list.unshift('baz')).to.equal(3);
        expect(list).to.have.length(3);
      });
    });


    describe('.unshift(value1, value2, ...valueN)', function () {
      beforeEach(function () {
        list.unshift(1);
      });

      it('inserts all values to the beginning of the list', function () {
        list.unshift(2, 3, 4);
        expect(list.toArray()).to.eql([2, 3, 4, 1]);
      });

      it('keeps the order of the values within the list', function () {
        list.unshift(4, 8, 2, -1);
        expect(list.toArray()).to.eql([4, 8, 2, -1, 1]);
      });

      it('returns the updated `.length', function () {
        expect(list).to.have.length(1);

        expect(list.unshift(2, 3, 4)).to.equal(4);
        expect(list).to.have.length(4);
      });
    });

    describe('.shift()', function () {
      beforeEach(function () {
        list.unshift(1, 2, 3);
      });

      it('is a function', function () {
        expect(list.shift).to.be.a('function');
      });

      it('removes the first value from the list', function () {
        expect(list).to.have.length(3);

        list.shift();
        expect(list).to.have.length(2);
        expect(list.toArray()).to.eql([2, 3]);
      });

      it('changes the original list', function () {
        expect(list).to.have.length(3);

        list.shift();
        expect(list).to.have.length(2);
        expect(list.toArray()).to.eql([2, 3]);
      });

      it('returns the removed value', function () {
        expect(list.shift()).to.equal(1);
      });

      it('returns `undefined` if list is empty', function () {
        var list = new LinkedList();
        expect(list.shift()).to.be.undefined;
      });
    });


    describe('.push(value)', function () {
      it('is a function', function () {
        expect(list.push).to.be.a('function');
      });

      it('inserts `value` to the end of the list', function () {
        expect(list).to.have.length(0);

        list.push(1);
        expect(list).to.have.length(1);

        list.push(2);
        expect(list).to.have.length(2);
        expect(list.toArray()).to.eql([1, 2]);

        list.push(3);
        expect(list).to.have.length(3);
        expect(list.toArray()).to.eql([1, 2, 3]);
      });

      it('returns the updated length', function () {
        expect(list).to.have.length(0);

        expect(list.push('foo')).to.equal(1);
        expect(list).to.have.length(1);

        expect(list.push('bar')).to.equal(2);
        expect(list).to.have.length(2);

        expect(list.push('baz')).to.equal(3);
        expect(list).to.have.length(3);
      });
    });


    describe('.push(value1, value2, ...ValueN)', function () {
      beforeEach(function () {
        list.push(1);
      });

      it('is a function', function () {
        expect(list.push).to.be.a('function');
      });

      it('inserts all values to the end of the list', function () {
        expect(list).to.have.length(1);

        list.push(2, 3);
        expect(list).to.have.length(3);
        expect(list.toArray()).to.eql([1, 2, 3]);

        list.push(4, 5);
        expect(list).to.have.length(5);
        expect(list.toArray()).to.eql([1, 2, 3, 4, 5]);
      });

      it('keeps the order of the values within the list', function () {
        expect(list).to.have.length(1);

        list.push(6, -4);
        expect(list).to.have.length(3);
        expect(list.toArray()).to.eql([1, 6, -4]);

        list.push('foo', 123);
        expect(list).to.have.length(5);
        expect(list.toArray()).to.eql([1, 6, -4, 'foo', 123]);
      });

      it('returns the updated `.length`', function () {
        expect(list).to.have.length(1);

        expect(list.push(2, 3, 4)).to.equal(4);
        expect(list).to.have.length(4);

        expect(list.push(5, 6, 7)).to.equal(7);
        expect(list).to.have.length(7);
      });
    });


    describe('.forEach(fn)', function () {
      var fn;

      beforeEach(function () {
        list.push('foo', 'bar', 'baz');
        fn = sinon.stub();
      });

      it('is a function', function () {
        expect(list.forEach).to.be.a('function');
      });

      it('calls the given function for each value in the list', function () {
        var fn = sinon.stub();
        expect(fn).to.not.have.been.called;

        list.forEach(fn);
        expect(fn.callCount).to.equal(3);
      });

      it('passes each value and position as parameters', function () {
        var fn = sinon.stub();

        list.forEach(fn);

        expect(fn).to.have.been.calledThrice;

        expect(fn.getCall(0)).to.have.been.calledWith('foo', 0);
        expect(fn.getCall(1)).to.have.been.calledWith('bar', 1);
        expect(fn.getCall(2)).to.have.been.calledWith('baz', 2);
      });

      it('returns undefined', function () {
        expect(list.forEach(fn)).to.be.undefined;
      });
    });


    describe('.map(fn)', function () {
      var fn = sinon.spy(function (val) {
        return val * 2;
      });

      beforeEach(function () {
        list.push(10, 20, 30);
        fn.reset();
      });

      it('is a function', function () {
        expect(list.map).to.be.a('function');
      });

      it('returns an empty array when list is empty', function () {
        var list = new LinkedList();
        var arr = list.map(fn);
        expect(list.length).to.equal(0);
        expect(arr).to.be.empty;
        expect(fn).to.not.have.been.called;
        expect(Array.isArray(arr)).to.be.true;
      });

      it('returns an array with the value returned by the given function',
        function () {
          var arr = list.map(fn);
          expect(arr).to.eql([20, 40, 60]);
        });

      it('calls the given function for each value in the list', function () {
        list.map(fn);
        expect(fn).to.have.been.calledThrice;
      });

      it('passes the value and its index to `fn`', function () {
        list.map(fn);

        expect(fn.getCall(0)).to.have.been.calledWith(10, 0);
        expect(fn.getCall(1)).to.have.been.calledWith(20, 1);
        expect(fn.getCall(2)).to.have.been.calledWith(30, 2);
      });
    });

    describe('.get(index)', function () {
      beforeEach(function () {
        list.push('foo', 'bar', 'baz');
      });

      it('is a function', function () {
        expect(list.get).to.be.a('function');
      });

      it('returns the value at the specific position', function () {
        expect(list.get(0)).to.equal('foo');
        expect(list.get(1)).to.equal('bar');
        expect(list.get(2)).to.equal('baz');
      });

      it('returns `undefined` if `index` is out of range', function () {
        expect(list.get(4)).to.be.undefined;
        expect(list.get(123456)).to.be.undefined;
      });

      it('returns `undefined` if `index` is not a number', function () {
        expect(list.get('not a number')).to.be.undefined;
      });
    });



    describe('.toArray()', function () {
      it('is a function', function () {
        expect(list.toArray).to.be.a('function');
      });

      it('returns an empty array if list is empty', function () {
        var arr = list.toArray();

        expect(Array.isArray(arr)).to.be.true;

        expect(list).to.have.length(0);
        expect(arr).to.have.length(0);
      });

      it('returns an array with all values in the list in order', function () {
        list.push(4, 2, 9, -1);
        var arr = list.toArray();

        expect(arr[0]).to.equal(list.get(0));
        expect(arr[1]).to.equal(list.get(1));
        expect(arr[2]).to.equal(list.get(2));
        expect(arr[3]).to.equal(list.get(3));

        expect(arr.length).to.equal(list.length);
      });
    });


    describe('.toString()', function () {
      var arr;

      beforeEach(function () {
        arr = ['foo', 'bar', 'baz'];
        list.push('foo', 'bar', 'baz');
      });

      it('is a function', function () {
        expect(list.toString).to.be.a('function');
      });

      it('uses the same representation as arrays', function () {
        expect(list.toString()).to.equal(arr.toString());

        var emptyList = new LinkedList();
        expect(emptyList.toString()).to.equal([].toString());
      });
    });


    describe('.toJSON()', function () {
      var arr;

      beforeEach(function () {
        arr = ['foo', 'bar', 'baz'];
        list.push('foo', 'bar', 'baz');
      });

      it('is a function', function () {
        expect(list.toJSON).to.be.a('function');
      });

      it('returns the array representation of the list', function () {
        // See https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON_behavior
        expect(list.toJSON()).to.eql(arr);

        var emptyList = new LinkedList();
        expect(emptyList.toJSON()).to.eql([]);
      });

      it('works with `JSON.stringify()', function () {
        expect(JSON.stringify(list)).to.equal(JSON.stringify(arr));
      });
    });
  });
});