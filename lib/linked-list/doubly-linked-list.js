'use strict';


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
  this.head = null;
  this.tail = null;
  this.length = 0;
}

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
 * Gets the value at the given index. Returns `undefined` if the index is
 * out of range.
 *
 * @param {number} index
 * @returns {*}
 */
DoublyLinkedList.prototype.get = function (index) {
  var node = this._get(index);
  return node ? node.value : undefined;
};

/**
 * Calls the given function for each value in the list.
 * @param {function(value, index)} fn
 */
DoublyLinkedList.prototype.forEach = function (fn) {
  var node = this.head;
  var i = 0;

  while (node) {
    fn(node.value, i);
    node = node.next;
    i += 1;
  }
};

/**
 * Creates an array with the results of calling the given function for
 * each item in the list.
 * @param {function(value, index)} fn
 * @returns {Array}
 */
DoublyLinkedList.prototype.map = function (fn) {
  var arr = [];

  this.forEach(function (value, i) {
    arr.push(fn(value, i));
  });

  return arr;
};

/**
 * Returns an array representation of the list.
 * @returns {Array}
 */
DoublyLinkedList.prototype.toArray = function () {
  return this.map(function (val) {
    return val;
  });
};

/**
 * Creates a string representation of the list.
 * @returns {string}
 */
DoublyLinkedList.prototype.toString = function () {
  return this.toArray().toString();
};


/**
 * Creates a value that can be properly serialized by JSON.stringify().
 * @returns {Array}
 */
DoublyLinkedList.prototype.toJSON = function () {
  return this.toArray();
};

/**
 * Creates a new linked list with the same elements. Nodes are deep cloned
 * but the values themselves not.
 * @returns {DoublyLinkedList}
 */
DoublyLinkedList.prototype.clone = function () {
  var list = new DoublyLinkedList();

  this.forEach(function (value) {
    list.push(value);
  });

  return list;
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
    return;
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