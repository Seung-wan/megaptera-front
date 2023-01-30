# 학습 키워드

- REPL
- TypeScript
  - Interface vs Type
  - 타입 추론
  - Union Type vs Intersection Type
  - Optional Parameter

## 강의 정리

### TypeScript

타입스크립트 공식문서

- 핸드북 정독하기

간단히 REPL을 쓰고 싶다면 ts-node를 실행
(TS Playground도 좋다)

- npx ts-node

### 타입 지정

타입을 잡아주면 타입에 정확히 맞는 것만 할당할 수 있다.

```ts
let name: string;
let age: number;

name = '홍길동';
age = 13;

name = 13; // error TS2322: Type 'number' is not assignable to type 'string'.
age = '홍길동'; // error TS2322: Type 'string' is not assignable to type 'number'.

let human: {
  name: string;
  age: number;
};

human = { name: '홍길동', age: 13 };
```

```ts
type Human = {
  name: string;
  age: number;
};

let boy: Human;

boy = { name: '홍길동', age: 13 };

interface Person {
  name: string;
  age: number;
}

let girl: Person;

girl = { name: '홍길동', age: 13 };

function add(x: number, y: number): number {
  return x + y;
}

add(1, 2);

add('Hello', 'World'); // TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

function sub(x: number, y: number): string {
  return x - y; // TS2322: Type 'number' is not assignable to type 'string'.
}
```

### 리터럴 타입, Union에서 유용하게 쓰인다.

```ts
let category: 'food';

category = 'food';
```

### 배열 타입

```ts
let numbers: number[];
let counts: Array<number>;

numbers = [1, 2, 3];
```

### 튜플 타입

```ts
let anythings: any[];

anythings = ['hp', 256];

let pair: [string, number];

pair = ['hp', 256];
```

### 타입 추론, TS에서는 타입 추론을 권장한다.

```ts
const name: string = '홍길동';

const name = '홍길동';
```

### Union Type

- 여러 타입 중 하나이다.
- boolean은 true | false와 같다.

```ts
type bool = true | false;

let flag: bool;

flag = true;

flag = false;

flag = 3; // TS2322: Type 'number' is not assignable to type 'bool'.
```

- 매개 변수를 제한하거나 할 때 매우 유용하게 쓸 수 있다.
- Union으로 타입을 잡아주면 자동 완성이 매우 강력하다.

```ts
type Category = 'food' | 'toy' | 'bag';

function fetchProducts({ category }: { category: Category }) {
  console.log(`Fetch ${category}`);
}
```

- 레거시 코드 환경의 경우 계속 변화가 생기기 때문에 Union을 안 쓸 수가 없다.
- ReactNode가 대표적이다.

```ts
let target: string | number;

target = '홍길동';

target = 13;

target = null; // TS2322: Type 'null' is not assignable to type 'string | number'.

target = undefined; // TS2322: Type 'undefined' is not assignable to type 'string | number'.

let targetName: string | undefined;

targetName = '홍길동';

targetName = undefined;
```

- undefined를 직접 쓸 일은 없고 함수 매개변수에서 optional 하게 받고 싶은 경우에 사용될 수 있다.
- 하지만 이런 경우에도 ? 기호를 이용하여 optional parameter로 처리하면 undefined도 같이 받을 수 있다.

```ts
function greeting(name?: string): string {
  return `Hello, ${name || 'world'}`;
}
```

- 기본값(default parameter)을 잡아주면 좋다.

```ts
function greeting(name: string = 'world'): string {
  return `Hello, ${name}`;
}
```

- 매개변수(parameter)가 객체(object)일 때도 활용할 수 있다.

```ts
function greeting({ name, age }: { name: string; age?: number }): string {
  return age ? `${name} (${age})` : name;
}
```

- 타입을 잡아준 방식

```ts
type Human = {
  name: string;
  age?: number;
};

function greeting({ name, age }: Human): string {
  return age ? `${name} (${age})` : name;
}

greeting(); // TS2554: Expected 1 arguments, but got 0.

greeting({ name: '홍길동' });

greeting({ name: '홍길동', age: 13 });
```

### Intersection Type

- 타입을 확장하는 간단한 방식
- type Person은 Human과 Creature을 모두 만족해야 한다.

```ts
type Human = {
  name: string;
  age: number;
};

type Creature = {
  hp: number;
  mp: number;
};

type Person = Human & Creature;

let person: Person;

person = { name: '홍길동', age: 13, hp: 256, mp: 16 };
```

### Generics, Utility Types, and Tips

- 유틸성 타입 공부하기

### 편집기 자동 완성 + 개발 환경에서의 오류 검사

- TypeScript를 사용하는 핵심적인 이유
- 오래된 라이브러리의 경우에 d.ts 파일로 타입 지원, 패키지 이름은 @types/~ 형태
- DefinitelyTyped
