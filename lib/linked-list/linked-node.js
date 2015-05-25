'use strict';

/**
 * @fileoverview Defines a simple interface for linked list nodes.
 */

/**
 * A simple implementation of a linked list node, linking a value to its
 * adjacent values.
 *
 * @param {*} value The value this node has.
 * @param {LinkedNode?} next The next node in the list.
 * @param {LinkedNode?} prev The previous node in the list.
 *
 * @constructor
 */

function LinkedNode(value, next, prev) {
  /**
   * Node's value
   * @type {*}
   */
  this.value = value;

  /**
   * Next node
   * @type {(LinkedNode|null)}
   */
  this.next = next instanceof LinkedNode ? next : null;

  /**
   * Previous node.
   * @type {(LinkedNode|null)}
   */
  this.prev = prev instanceof LinkedNode ? prev : null;
}


LinkedNode.prototype.isFirst = function () {
  return Boolean(this.prev);
};

LinkedNode.prototype.isLast = function () {
  return Boolean(this.next);
};

module.exports = LinkedNode;