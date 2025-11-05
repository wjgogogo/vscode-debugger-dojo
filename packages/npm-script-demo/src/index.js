/**
 * 示例源代码
 */

export function hello(name) {
  return `Hello, ${name}!`;
}

export function sum(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

console.log("Module loaded");
console.log(hello("Li Hua"));
console.log(sum(10, 10));
console.log(multiply(10, 10));
