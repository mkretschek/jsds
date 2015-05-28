'use strict';

var util = require('util');

var LinkedList = require('./linked-list');

/**
 * Creates a new linked node object.
 * @param {*} value
 * @returns {{value: *, next: null, prev: null}}
 */
function createNode(value) {
  return {
    value: value,
    next: null,
    prev: null
  };
}


/**
 * Creates a doubly linked list structure with an API very similar to
 * JavaScript's Array API.
 *
 * @constructor
 */
function DoublyLinkedList() {
  LinkedList.apply(this, arguments);
  this.tail = null;
}

util.inherits(DoublyLinkedList, LinkedList);

/**
 * Adds the given values to the end of the list and returns its new length.
 *
 * @param {*} value
 * @returns {number} The new length of the list.
 */
DoublyLinkedList.prototype.push = function (value) {
  if (arguments.length > 1) {
    var i, len;
    for (i = 0, len = arguments.length; i < len; i += 1) {
      this.push(arguments[i]);
    }
  } else {
    var oldTail = this.tail;
    var newTail = createNode(value);

    if (oldTail) {
      oldTail.next = newTail;
      newTail.prev = oldTail;
    } else {
      // List is empty, set the new node as the head as well
      this.head = newTail;
    }

    this.tail = newTail;
    this.length += 1;
  }

  return this.length;
};

/**
 * Removes the last element from the list and returns it.
 *
 * @returns {*} The value contained in the last node in the list or
 * `undefined` if the list is empty.
 */
DoublyLinkedList.prototype.pop = function () {
  if (!this.length) {
    return;
  }

  var oldTail = this.tail;
  var newTail = oldTail.prev;

  if (newTail) {
    oldTail.prev = null;
    newTail.next = null;
  }

  this.tail = newTail;
  this.length -= 1;

  return oldTail.value;
};

/**
 * Inserts the given values to the beginning of the list.
 *
 * @param value
 * @returns {number}
 */
DoublyLinkedList.prototype.unshift = function (value) {
  if (arguments.length > 1) {
    var i = arguments.length - 1;

    for (; i >= 0; i -= 1) {
      this.unshift(arguments[i]);
    }
  } else {
    var oldHead = this.head;
    var newHead = createNode(value);

    if (oldHead) {
      oldHead.prev = newHead;
      newHead.next = oldHead;
    } else {
      // List is empty, set the new node as the tail as well
      this.tail = newHead;
    }

    this.head = newHead;
    this.length += 1;
  }

  return this.length;
};

/**
 * Removes and retrieves the first element from the list.
 * @returns {*}
 */
DoublyLinkedList.prototype.shift = function () {
  if (!this.length) {
    return;
  }

  var oldHead = this.head;
  var newHead = oldHead.next;

  if (newHead) {
    newHead.prev = oldHead.next = null;
  }

  this.length -= 1;
  this.head = newHead;

  return oldHead.value;
};


/**
 * Gets the node at the specific index.
 * @param index
 * @returns {{value, next}|null}
 * @private
 */
DoublyLinkedList.prototype._get = function (index) {
  index = Number(index);

  if (index < 0 || index >= this.length || isNaN(index)) {
    return null;
  }

  var mid = this.length / 2;
  var i, node;

  if (index <= mid) {
    i = 0;
    node = this.head;

    while (node && i < index) {
      node = node.next;
      i += 1;
    }
  } else {
    i = index - Math.floor(mid) - 1;
    node = this.tail;

    while (node && i) {
      node = node.prev;
      i -= 1;
    }
  }

  return node;
};



module.exports = DoublyLinkedList;