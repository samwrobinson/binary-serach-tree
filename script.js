// Create Node class

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = buildTree(arr);
    }
}

function buildTree(array) {
    // Sort the Array
    array = mergeSort(array);
    array = removeDupes(array);

    return sortedArrayToBST(array, 0, array.length - 1);
}

function insert(node, value) {
    let newNode = new Node(value);

    if (node === null) {
        return newNode;
    }
    
    if (value < node.data) {
        node.left = this.insert(node.left, value);
    } else {
        node.right = this.insert(node.right, value);
    }

    return node;
}

function deleteNode(node, value) {
    if (node === null) {
        return null;
    }

    if (value < node.data) {
        node.left = deleteNode(node.left, value);
    } else if (value > node.data) {
        node.right = deleteNode(node.right, value);
    } else {
        if (node.left === null && node.right === null) {
            return null;
        }

        if (node.left === null) {
            return node.right;
        } else if (node.right === null) {
            return node.left;
        }

        node.right = minValue(node.right);
        node.right = deleteNode(node.right, node.data);
    }
    return node;
}

function minValue(node) {
    let current = node;

    while (current.left !== null) {
        current = current.left;
    }
    return current.data;
}

function removeDupes(array) {
    let curr = null;
    let next = null;
    // Remove duplicates from the array
    for (let i=0; i<array.length; i++) {
        curr = array[i];
        next = array[i + 1];

        if (curr === next) {
            array.splice(i + 1, 1);
            i--;
        }
    }

    return array
}

function sortedArrayToBST(array, start, end) {
    // if start index greater than end index
    if (start > end) {
        return null;
    }
    // Find the middle of the array
    let mid = parseInt((start + end) / 2);
    // Create a node from the middle point of the array
    let node = new Node(array[mid]);
    // Use recursion to repeat for the left and right sides of the array
    node.left = sortedArrayToBST(array, start, mid - 1);
    node.right = sortedArrayToBST(array, mid + 1, end);

    // Return the root node and its children
    return node;
}

function mergeSort(array) {
    // Find index to split from
    let index = Math.floor(array.length / 2);
    let leftHalf = array.slice(0, index);
    let rightHalf = array.slice(index, array.length);

    if (array.length === 1) return array;

    const sortedLeftArray = mergeSort(leftHalf);
    const sortedRightArray = mergeSort(rightHalf);

    return merge(sortedLeftArray, sortedRightArray);
}

function merge(leftHalf, rightHalf) {
    let sortedArray = [];
    leftIndex = 0;
    rightIndex = 0;

    while (leftIndex < leftHalf.length && rightIndex < rightHalf.length) {
        if (leftHalf[leftIndex] < rightHalf[rightIndex]) {
            sortedArray.push(leftHalf[leftIndex]);
            leftIndex++;
        } else {
            sortedArray.push(rightHalf[rightIndex]);
            rightIndex++;
        }
    }

    while (leftIndex < leftHalf.length) {
        sortedArray.push(leftHalf[leftIndex]);
        leftIndex++;
    }

    while (rightIndex < rightHalf.length) {
        sortedArray.push(rightHalf[rightIndex]);
        rightIndex++
    }
    return sortedArray;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
 

const tree = new Tree([1,2,3,4,5,6,7])

console.log(tree)
prettyPrint(tree.root)
insert(tree.root, 120)
prettyPrint(tree.root)
deleteNode(tree.root, 7)
prettyPrint(tree.root)