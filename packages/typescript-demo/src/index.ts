// TypeScript 调试示例

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

function processArray<T>(items: T[], predicate: (item: T) => boolean): T[] {
  const result = items.filter(predicate);
  return result;
}

class DataProcessor<T> {
  private data: T[] = [];

  constructor(initialData?: T[]) {
    this.data = initialData || [];
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.data.find(predicate);
  }

  map<R>(mapper: (item: T) => R): R[] {
    return this.data.map(mapper);
  }
}

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
];

const adults = processArray(users, (user) => (user.age ?? 0) >= 18);
console.log("成年用户:", adults);

const processor = new DataProcessor<User>(users);
const user = processor.find((u) => u.name === "Bob");
console.log("找到用户:", user);

const names = processor.map((u) => u.name);
console.log("用户名:", names);

(async () => {
  const result = await Promise.resolve(user);
  console.log("异步结果:", result);
})();

export { DataProcessor, processArray, User };
