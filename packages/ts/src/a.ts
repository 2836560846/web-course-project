interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// type Todo2 = Pick<Todo,'title'|'completed'>
type Todo2 = MyPick<Todo, 'title'>

const todo: Todo2 = {
  title: "",
  // completed: false
  // description: ''
}
type MyPick<T, K extends keyof T> = {
	[key in K]: T[key]
}

interface A {
  x: number;
  y: number;
}

// type T1 = Omit<A, "x">; // { y: number }
type T1 = MyOmit<A, "x">; // { y: number }

type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}

const objA:T1 = {
  // x: 0,
  y: 0
}