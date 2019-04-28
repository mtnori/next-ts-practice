interface A {
  a: string;
}

interface B extends A {
  b: number;
}

const b: B = {
  a: "aaa",
  b: 100
};
console.log(b);

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface C extends Omit<B, "a"> {}
const c: C = {
  b: 100
};
console.log(c);

interface D {
  a: number;
}

interface E extends D, Omit<B, "a"> {}
const e: E = {
  a: 555,
  b: 100
};
console.log(e);
