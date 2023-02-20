# 학습 키워드

- Express 란
- URL 구조
- REST API
- HTTP Method(CRUD)

## 강의 정리

### Express

프론트엔드 개발자라고 해도 BFF(Backend for Frontend) 혹은 NextJS등 백엔드에 대한 지식이 필요하다.  
테스트 코드에서 Mocking을 할 때도 필요하다.

Express는 Node.js 기반의 서버 프레임워크.  
굉장히 역사가 오래된 프레임워크다.  
NestJS, Apollo에서도 Express를 지원한다.

### 간단한 서버 앱 npm 패키지 세팅

공식문서는 JS 기반으로 나와있기 때문에 TS 지원을 위해 추가적인 설치를 해줄 것.

프로젝트 폴더 구성

```bash
mkdir express-demo-app
cd express-demo-app
```

.gitignore 파일은 항상 작성해주기

```bash
touch .gitignore
echo "/node_modules/" > .gitignore
```

패키지 초기화

```bash
npm init -y
```

TypeScript

```bash
npm i -D typescript
npx tsc --init
```

Eslint

```bash
npm i -D eslint
npx eslint --init

# import/export syntax 선택
# Node 환경 선택
# Airbnb 선택
```

ts-node

```bash
npm i -D ts-node
```

Express

```bash
npm i express
npm i -D @types/express
```

localhost:3000을 주소창에 입력했을 때 완전한 형태는 <http://localhost:3000/> 이다.
localhost는 127.0.0.1이다. 자기 자신을 가리키는 주소.

### Hello World 예제

app.ts 파일 작성

```ts
// app.ts

import express from 'express';

const port = 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

실행은 ts-node를 이용해서 할 수 있으나, 코드가 수정되었을 때마다 서버를 재시작해주기 위해 nodemon을 사용하는 게 개발 환경에서는 편하다.  
local에서는 global로 설치해서 사용하는 게 편한 것 같다.

```bash
npm i -g nodemon
nodemon app.ts
```

### REST API

> Roy Fielding - “[Architectural Styles and the Design of Network-based Software Architectures](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)” (2000)

> [Richardson Maturity Model](https://martinfowler.com/articles/richardsonMaturityModel.html)

대개는 "필딩 제약 조건" 4가지를 모두 만족하지 않고, Resource와 HTTP Verb만 도입하는 수준으로 사용한다.

- /write-post 와 같이 작성하지 않고
- /posts 처럼 작성한다. (CRUD)

CRUD에 대해 HTTP Method를 대입한다. Read는 Collection(복수)과 Item(Element)(단수)로 나뉜다.

기본 리소스 URL: /products

1. Read (Collection) -> GET /products => 상품 목록 확인
2. Read (Item) -> GET /products/{id} => 특정 상품 정보 확인
3. Create (Collection Pattern 활용) -> POST /products => 상품 추가 (JSON 정보 함께 전달)
4. Update (Item) -> PUT 또는 PATCH /products/{id} => 특정 상품 정보 변경 (JSON 정보 함께 전달)
5. Delete (Item) -> DELETE /products/{id} => 특정 상품 삭제

- PUT이 먼저 나왔기 때문에 기존에는 PUT을 많이 사용했지만 이제 PATCH도 많이 사용한다.
- PUT은 overwrite, 덮어쓰는 느낌. 없으면 추가하고, 있으면 덮어쓴다.
- PATCH는 일부만 수정하는 업데이트를 하는 느낌.
- DELETE는 DB의 row를 hard delete하지 않고 soft delete를 할 때도 DELETE Method를 사용한다.
- 실제로는 row의 특정 컬럼값을 변경하는 것이지만, 리소스 입장에서 볼 때는 삭제되는 것이기 때문에 DELETE Method를 사용한다.

Thinking in React 예제

```ts
app.get('/products', (req, res) => {
  const products = [
    {
      category: 'Fruits',
      price: '$1',
      stocked: true,
      name: 'Apple',
    },
    {
      category: 'Fruits',
      price: '$1',
      stocked: true,
      name: 'Dragonfruit',
    },
    {
      category: 'Fruits',
      price: '$2',
      stocked: false,
      name: 'Passionfruit',
    },
    {
      category: 'Vegetables',
      price: '$2',
      stocked: true,
      name: 'Spinach',
    },
    {
      category: 'Vegetables',
      price: '$4',
      stocked: false,
      name: 'Pumpkin',
    },
    {
      category: 'Vegetables',
      price: '$1',
      stocked: true,
      name: 'Peas',
    },
  ];

  res.send({ products });
});
```
