const { NotImplementedError } = require("../extensions/index.js")

const { ListNode } = require("../extensions/list-node.js")

function convertArrayToList(arr) {
	return arr.reverse().reduce((acc, cur) => {
		if (acc) {
			const node = new ListNode(cur)
			node.next = acc
			return node
		}

		return new ListNode(cur)
	}, null)
}

function removeKFromList(l, k) {
	let prev = null
	let current = l

	while (current.next) {
		if (current.value == k) {
			if (prev) prev.next = current.next
			else l = current.next
		} else prev = current
		current = current.next
	}

	if (current.value == k) prev.next = current.next

	return l
}

module.exports = {
	removeKFromList,
}
