'use strict';


var ListNode = require('./linked-node');

/**
 * Creates a linked list.
 *
 * @constructor
 */
function LinkedList() {
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
LinkedList.prototype.shift = function () {
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
LinkedList.prototype.unshift = function (value) {
  if (arguments.length > 1) {
    var i = arguments.length - 1;
    while (i) {
      this.unshift(arguments[i]);
      i -= 1;
    }
  } else if (arguments.length) {
    var oldFirst = this.first;
    var newFirst = new ListNode(value);

    if (oldFirst) {
      oldFirst.prev = newFirst;
      newFirst.next = oldFirst;
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
LinkedList.prototype.pop = function () {
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
LinkedList.prototype.push = function (value) {
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
LinkedList.prototype.indexOf = function (value, fromIndex) {
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
LinkedList.prototype.lastIndexOf = function (value, fromIndex) {
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


module.exports = LinkedList;