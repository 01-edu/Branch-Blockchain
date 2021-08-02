## Semi-brute

### Instructions

Create a function `semiBrute()` that takes as argument a target, which is a two characters hexadecimal number, and returns a string which hash `sha256` starts with the target.

### Usage

```js
solution = semiBrute("e2")
console.log(solution)
// One valid result : 'abcdefghijklmnopqrs'
// Depending on your algorithm you might find other valid solutions

```

### Notions

- [Module crypto: hash](https://nodejs.org/docs/latest-v14.x/api/crypto.html#crypto_class_hash)
