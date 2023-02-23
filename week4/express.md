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
localhost는 127.0.0.1이다. 자기 자신을 가리키는 주소, 루프백 주소라고도 불린다.

### Hello World 예제

app.ts 파일 작성

res.send와 res.json의 차이점

res.send는 argument를 판단하여 Content-Type을 잡아준다. argument가 object이면 내부에서는 res.json을 호출한다.  
res.json은 Content-Type이 json이 아닐 경우 application/json으로 세팅하고 res.send를 호출한다.  
Content-Type이 다른점이라 생각되고 json 형식을 반환해주는 경우를 명시적으로 표현할때는 res.json도 좋은 것 같으나, argument를  
보고서 충분히 판단할 수 있으므로 큰 의미는 없는 것 같다.

```ts
// app.ts

// TypeScript이기 때문에 ESModule(import, export)을 사용한다.
import express from 'express';

// 서버의 포트 번호는 환경변수로 많이 관리하는 것 같다.
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

- GET은 request body에 값을 넣어줄 수 없다.
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

---

### BFF란?

[카카오페이지에서 BFF 적용기](https://fe-developers.kakaoent.com/2022/220310-kakaopage-bff/)  
카카오페이지에서 겪었던 문제

- 여러 플랫폼(Web, Android, iOS, ...)을 지원하게 되면서 각각 특정 데이터가 필요한 상황
- 원하는 데이터 형태에 도달하기 위해 여러 API 호출의 응답을 조작, 혼합, 일치시키는 상황
- 이런 상황들이 겹쳐 프론트엔드에서 복잡한 계산이나 비즈니스 로직을 작성하는 상황

프론트엔드에서 복잡한 계산을 수행하는 경우 렌더링이 느려질 수 있다. UI 스레드에서 렌더링과 비즈니스 로직 수행이 경합을 벌이기 때문이다.  
렌더링은 유저 경험과 매우 밀접한 관련이 있다.  
이를 개선하기 위해서는 어떠한 방법이 있을까?

다양한 플랫폼을 지원해야 하는 API는 클라이언트마다 사용하지 않는 불필요한 데이터가 포함될 수 있다.  
추가로 직접 API에 의존하는 경우에 아래와 같은 이슈가 발생할 수 있다.

- MSA 환경에서 API 엔드포인트가 분리될 때 팔로업 이슈
- CORS
- API 입장에서 여러 플랫폼과 스펙을 맞춰야 하는 비용
- 플랫폼별로 다른 인증 방식을 통합하려는 무리한 시도
- '화면에 필요한 데이터만 받는' partial response를 하기 어려운 이슈

이와 같은 문제들을 해결하기 위해 BFF가 등장했다. 말 그대로 프론트엔드를 위한 중간 서버를 구현하는 것  
하나의 프론트엔드에 대해 하나의 BFF를 두어서 프론트엔드 요구사항에 맞게 구현할 수 있다.  
여러 플랫폼을 지원하지 않을 경우에는 BFF가 의미 없을 수 있다.

카카오 페이지에서는 iOS, Android, Web을 지원하지만, Web에서만 BFF를 적용하고 있다.  
BFF에서는 생산성을 높이기 위해 데이터를 통합하는 처리를 담당한다.  
BFF를 사용함으로써 앞에서 말한 API 의존성 이슈를 처리해줄 수 있다.

카카오 페이지에서는 클라이언트에서 받아야하는 데이터의 형식이 여러가지인 경우가 많아서 BFF를 도입하게 되었다.
카카오 페이지의 BFF 구조는 NextJS, apollo server, urql, redux를 사용하고 있다.

### ts-node란?

JavaScript를 웹 브라우저가 아닌곳에서 실행하기 위해서는 JavaScript Runtime인 Node.js를 사용한다.  
TypeScript를 실행하기 위해서는 먼저 JavaScript 컴파일하는 과정이 필요한데 이를 생략하고  
TypeScript로 작성된 파일을 실행할 수 있게 해준다.

- ts-node는 Node.js를 위한 TypeScript 실행 엔진, REPL이다.
- JIT 컴파일러를 이용하여 TypeScript를 JavaScript로 변환해주고, 프리컴파일없이 타입스크립트를 Node.js에서 실행할 수 있게 해준다.
