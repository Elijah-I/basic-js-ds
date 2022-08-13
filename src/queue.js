const { NotImplementedError } = require("../extensions/index.js")

const { ListNode } = require("../extensions/list-node.js")

class Queue {
	constructor() {
		this.head = null
		this.length = 0
	}

	getUnderlyingList() {
		return this.head
	}

	enqueue(value) {
		const node = new ListNode(value)
		if (!this.head) this.head = node
		else {
			let last = this.head
			while (last.next) last = last.next
			last.next = node
		}
	}

	dequeue() {
		let current = this.head
		this.head = current.next
		return current.value
	}
}

module.exports = {
	Queue,
}
