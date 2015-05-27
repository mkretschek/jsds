'use strict';

// TODO(mkretschek): describe linked lists pros and cons.

/**
 * @fileoverview Implements the linked list data structure.
 */


// FIXME(mkretschek): if we are not going to implement any methods in
// LinkedNode, we should not make it a constructor and should just use
// a factory function instead.
var LinkedNode = require('./linked-node');

function createNode(value, next, prev) {
  return {
    value: value,
    next: next,
    prev: prev
  };
}


/**
 * Creates a linked list.
 *
 * @constructor
 */
function DoublyLinkedList() {
  this.first = null;
  this.last = null;
  this.length = 0;
}


/**
 * Removes the first element from the list and returns it. Returns
 * `undefined` if the list is empty. Should behave like
 * `Array.prototype.shift()`.
 *
 * @returns {*}
 */
DoublyLinkedList.prototype.shift = function () {
  var first = this.first;

  if (!first) {
    return undefined;
  }

  if (first.next) {
    this.first = first.next;
    this.first.prev = null;
  } else {
    this.first = null;
  }

  this.length -= 1;
  first.next = null;
  return first.value;
};


/**
 * Inserts one or more elements to the beginning of the list and returns
 * its new length. Should behave like `Array.prototype.unshift()`.
 *
 * @param {*} value
 * @returns {number}
 */
DoublyLinkedList.prototype.unshift = function (value) {
  if (arguments.length > 1) {
    var i = arguments.length - 1;
    while (i >= 0) {
      this.unshift(arguments[i]);
      i -= 1;
    }
  } else if (arguments.length) {
    var oldFirst = this.first;
    var newFirst = new LinkedNode(value);

    if (oldFirst) {
      oldFirst.prev = newFirst;
      newFirst.next = oldFirst;
    } else {
      this.last = newFirst;
    }

    this.first = newFirst;
    this.length += 1;
  }

  return this.length;
};


/**
 * Removes the last element from the list and returns it. If the list is
 * empty, returns `undefined`. Should behave like `Array.prototype.pop()`.
 * @returns {*}
 */
DoublyLinkedList.prototype.pop = function () {
  var last = this.last;

  if (!last) {
    return null;
  }

  if (last.prev) {
    this.last = last.prev;
    last.prev.next = null;
  }

  last.prev = null;
  this.length -= 1;

  return last.value;
};


/**
 * Inserts one or more elements to the end of the list and returns its
 * new length.
 * @param {*} value
 * @returns {number}
 */
DoublyLinkedList.prototype.push = function (value) {
  if (arguments.length > 1) {
    var len, i;
    for (i = 0, len = arguments.length; i < len; i += 1) {
      this.push(arguments[i]);
    }
  } else if (arguments.length) {
    var oldLast = this.last;
    var newLast = new LinkedNode(value);

    if (oldLast) {
      oldLast.next = newLast;
      newLast.prev = oldLast;
    } else {
      this.first = newLast;
    }

    this.last = newLast;
    this.length += 1;
  }

  return this.length;
};


/**
 * Searches for the given value in the list and returns the index of its
 * first occurrence. If the value is not found, returns `-1`.
 * @param value
 * @param {number} fromIndex Index to start the search at.
 * @returns {number}
 */
DoublyLinkedList.prototype.indexOf = function (value, fromIndex) {
  fromIndex = fromIndex || 0;
  var i = 0;

  var node = this.first;

  while (node) {
    if (i >= fromIndex && node.value === value) {
      return i;
    }

    i += 1;
    node = node.next;
  }

  return -1;
};


/**
 * Searches for the given value starting at the end of the list and
 * traversing it backwards. Returns `-1` if the value is not in the list.
 * @param value
 * @param {number} fromIndex Index to start the search at.
 * @returns {number}
 */
DoublyLinkedList.prototype.lastIndexOf = function (value, fromIndex) {
  fromIndex = fromIndex || 0;
  var i = 0;

  var node = this.last;

  while (node) {
    if (i <= fromIndex && node.value === value) {
      return i;
    }

    i += 1;
    node = node.prev;
  }

  return -1;
};


/**
 * Get the value at the specific index.
 * @param {number} index
 * @returns {*}
 */
DoublyLinkedList.prototype.get = function (index) {
  // TODO(mkretschek): allow negative indexes
  index = Number(index);

  if (index >= this.length || isNaN(index)) {
    return undefined;
  }

  var node;

  // When getting an element closer to the end of the list, traverse it
  // backwards. This is an attempt to reduce one of the main cons regarding
  // linked lists that is accessing specific items. Should get more efficient
  // as the list grows larger.
  if (index > this.length / 2) {
    index = this.length - index - 1;
    node = this.last;

    while (index && node) {
      node = node.prev;
      index -= 1;
    }
  } else {
    node = this.first;

    while (index && node) {
      node = node.next;
      index -= 1;
    }
  }

  return node ? node.value : undefined;
};


/**
 * Creates an array from the linked list.
 * @returns {Array}
 */
DoublyLinkedList.prototype.toArray = function () {
  var node = this.first;
  var arr = [];

  while (node) {
    arr.push(node.value);
    node = node.next;
  }

  return arr;
};


DoublyLinkedList.prototype.next = function () {
  this._curr = this._curr ? this._curr.next : this.first;

  if (!this._curr) {
    var err = new RangeError('End of list');
    err.code = 'END_OF_LIST';
    throw err;
  }

  return this._curr.value;
};


DoublyLinkedList.prototype.reset = function () {
  delete this._curr;
};


module.exports = DoublyLinkedList;