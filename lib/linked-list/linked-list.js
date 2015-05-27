'use strict';


/**
 * Creates a new linked node object.
 * @param {*} value
 * @returns {{value: *, next: null}}
 */
function createNode(value) {
  return {
    value: value,
    next: null
  };
}


/**
 * Creates a linked list structure with an API very similar to JavaScript's
 * Array API. This data structure is recommended mainly for first in, first
 * out (FIFO) situations (such as queues), as appending/removing from the end
 * can get considerably slower as the list grows.
 *
 * @constructor
 */
function LinkedList() {
  this.head = null;
  this.length = 0;
}

/**
 * Adds the given values to the end of the list and returns its new length.
 *
 * > **NOTE:** Since the linked list does **NOT** keep a reference to the
 * > last element, this operation tends to get slower as the list grows.
 *
 * @param {*} value
 * @returns {number} The new length of the list.
 */
LinkedList.prototype.push = function (value) {
  if (arguments.length > 1) {
    var i, len;
    for (i = 0, len = arguments.length; i < len; i += 1) {
      this.push(arguments[i]);
    }
  } else {
    var oldTail = this._getTail();
    var newTail = createNode(value);

    if (oldTail) {
      oldTail.next = newTail;
    } else {
      this.head = newTail;
    }

    this.length += 1;
  }

  return this.length;
};

/**
 * Removes the last element from the list and returns it.
 *
 * > **NOTE:** likewise the `.push()` method, this tends to get slower as
 * > the list grows.
 *
 * @returns {*} The value contained in the last node in the list or
 * `undefined` if the list is empty.
 */
LinkedList.prototype.pop = function () {
  if (!this.length) {
    return;
  }

  var newTail = this.get(this.length - 2);

  var oldTail;

  if (newTail) {
    oldTail = newTail.next;
    newTail.next = null;
  } else {
    oldTail = this.head;
  }

  this.length -= 1;

  return oldTail.value;
};

/**
 * Inserts the given values to the beginning of the list.
 *
 * @param value
 * @returns {number}
 */
LinkedList.prototype.unshift = function (value) {
  if (arguments.length > 1) {
    var i = arguments.length - 1;

    for (; i >= 0; i -= 1) {
      this.unshift(arguments[i]);
    }
  } else {
    var oldHead = this.head;
    var newHead = createNode(value);

    if (oldHead) {
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
LinkedList.prototype.shift = function () {
  if (!this.length) {
    return;
  }

  var oldHead = this.head;
  var newHead = oldHead.next;

  oldHead.next = null;
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
LinkedList.prototype.get = function (index) {
  var node = this._get(index);
  return node ? node.value : undefined;
};

/**
 * Calls the given function for each value in the list.
 * @param {function(value, index)} fn
 */
LinkedList.prototype.forEach = function (fn) {
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
LinkedList.prototype.map = function (fn) {
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
LinkedList.prototype.toArray = function () {
  return this.map(function (val) {
    return val;
  });
};

/**
 * Creates a string representation of the list.
 * @returns {string}
 */
LinkedList.prototype.toString = function () {
  return this.toArray().toString();
};


/**
 * Creates a value that can be properly serialized by JSON.stringify().
 * @returns {Array}
 */
LinkedList.prototype.toJSON = function () {
  return this.toArray();
};

/**
 * Creates a new linked list with the same elements. Nodes are deep cloned
 * but the values themselves not.
 * @returns {LinkedList}
 */
LinkedList.prototype.clone = function () {
  var list = new LinkedList();

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
LinkedList.prototype._get = function (index) {
  var node;

  if (index >= 0 && index < this.length) {
    var i = 0;
    node = this.head;

    while (node && i < index) {
      node = node.next;
      i += 1;
    }
  }

  return node;
};


/**
 * Gets the last node in the list.
 * @returns {{value, next}|null}
 * @private
 */
LinkedList.prototype._getTail = function () {
  var node = this.head;

  while (node && node.next) {
    node = node.next;
  }

  return node;
};


module.exports = LinkedList;