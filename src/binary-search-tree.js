const { NotImplementedError } = require("../extensions/index.js")

const { Node } = require("../extensions/list-tree.js")

class BinarySearchTree {
	constructor() {
		this.mount = null
	}

	root() {
		return this.mount
	}

	add(data) {
		const node = new Node(data)
		const recursiveAdd = (parent, node) => {
			if (node.data > parent.data) {
				if (parent.right) recursiveAdd(parent.right, node)
				else parent.right = node
			} else {
				if (parent.left) recursiveAdd(parent.left, node)
				else parent.left = node
			}
		}

		if (!this.mount) this.mount = node
		else recursiveAdd(this.mount, node)
	}

	has(data) {
		return this.find(data) !== null
	}

	find(data) {
		const recursiveSearch = (parent, data) => {
			if (data === parent.data) return parent
			if (data > parent.data) {
				if (parent.right) return recursiveSearch(parent.right, data)
				else return null
			} else {
				if (parent.left) return recursiveSearch(parent.left, data)
				else return null
			}
		}

		return recursiveSearch(this.mount, data)
	}

	remove(data, tree = false) {
		if (!this.has(data)) return null

		const recursiveSearch = (parent, data, prev) => {
			if (data === parent.data) return [prev, parent]

			prev = parent

			if (data > parent.data)
				return recursiveSearch(parent.right, data, prev)
			else return recursiveSearch(parent.left, data, prev)
		}

		const findList = (parent) => {
			if (!parent.left && !parent.right) return parent
			if (parent.left) return this.findRecursive(parent.left)
			if (parent.right) return this.findRecursive(parent.right)
		}

		const useBranch = tree ? tree : this.mount

		let [parent, node] = recursiveSearch(useBranch, data, null)
		const isRoot = !parent

		if (isRoot) {
			const list = findList(node.left)
			const maxOfLeft = this.findRecursive(node.left, "right")

			let [parentList, minOfLeft] = recursiveSearch(node, list.data, null)

			parentList.left = null
			node.data = minOfLeft.data

			maxOfLeft.right = node.right
			node.right = node.left
			node.left = null
		}

		if (!isRoot) {
			const direction = node.data > parent.data ? "right" : "left"
			const isList = !node.right && !node.left
			const hasOne = !node.right || !node.left
			const hasBoth = !isList && !hasOne

			if (isList) parent[direction] = null
			if (hasOne) parent[direction] = node.right || node.left

			if (hasBoth) {
				const minLeft = this.findRecursive(node.right, "left").data
				this.remove(minLeft)
				parent[direction].data = minLeft
			}
		}
	}

	min() {
		return this.findRecursive(this.mount, "left").data
	}

	max() {
		return this.findRecursive(this.mount, "right").data
	}

	findRecursive(parent, direction) {
		if (!parent[direction]) return parent
		return this.findRecursive(parent[direction], direction)
	}
}

module.exports = {
	BinarySearchTree,
}
