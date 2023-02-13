# 학습 키워드

- REST API 와 GraphQL
  - REST API 란 무엇인가
  - GraphQL은 왜 등장했는가?
  - REST API vs GraphQL
- JSON
- DSL(Domain-Specific Language)
- 선언형 프로그래밍
- 명령형 프로그래밍
- SRP(단일 책임 원칙)
- Atomic Design
- React component 와 props

## 강의 정리

### React로 사고하기

리액트로 웹페이지를 개발하는 사고 방식, 순서를 알아볼 것.
공식문서의 Thinking in React 파트를 하나하나 자세하게 살펴볼 것이다.

### Step 1: Break the UI into a component hierarchy

리액트로 컴포넌트를 쪼개기, DOM tree를 만들듯이 Component tree를 만드는 것.

JSON Data와 mockup을 가지고 시작한다.  
mockup은 디자이너가 전달해주는 것인데, 여기에 스타일링을 입힐 것이지만, 완성된 결과와 비교했을 때 큰 틀에서는 차이가 크지 않다.  
일단은 백엔드에서 JSON 형태의 데이터를 돌려주는 API를 제공한다고 가정한다.
대부분은 REST API 또는 GraphQL을 사용한다.

- REST API

  - fetch API -> GET, POST, PUT/PATCH, DELETE (CRUD)
  - Resource 중심

- GraphQL
  - Graph라는 자료 구조를 이용한다.
  - Query에서 얻고자 하는 걸 스키마 처럼 넣어준다, 지정해준다. Post만 얻을 것인지, Post에 딸려있는 Comment까지 얻을 것인지 쿼리에서 결정해준다.
  - Query(Read)
  - Mutation(Command: Create, Update, Delete): 조작하는 것
  - Subscription(Event를 인지하는 용도): 쿼리에 대해서 인지를 하지는 않는다. Mutation에 대해서 인지를 한다.
  - 주로 Query와 Mutation이 중심이 된다.

JSON(JavaScript Object Notation)은 데이터를 프론트엔드와 백엔드가 데이터를 교환하기 위해 만들었다.
기본적으로 JSON은 string이다.

- JSON.stringify: 자바스크립트 값이나 객체를 JSON 문자열로 변환한다.
- JSON.parse: 문자열을 자바스크립트 객체로 바꿔준다.

F/E는 이 데이터를 사용자가 볼 수 있도록 UI를 구성한다. React는 선언형(HTML과 유사한 모양의 DSL을 사용)으로 UI를 구성할 수 있다.  
정확하게는 XML이다.
DSL은 도메인 특화 언어라고 해서 특정 도메인의 문제를 풀기위해 사용하는 언어.

### 컴포넌트 계층 구조

리액트 공식문서를 가보면 Declarative, Component-Based, Learn Once, Write Anywhere라는 설명이 있다.  
React의 강력한 특징중의 하나는 컴포넌트를 기반으로 UI를 작성하는 것이다.  
Build encapsulated components that manage their own state, then compose them to make complex UIs.  
간단한 컴포넌트들을 모아서 복잡한 UI를 만들어내야 한다. 복잡한 컴포넌트를 만들고 있으면 리액트의 장점을 살리지 못하는 것이다.  
캡슐화하고 있는 컴포넌트들을 모아서 조립을 하는 것. 자동차를 부품을 조립하면서 만들어나가는 것처럼 리액트도 똑같이 컴포넌트를 조립하면서 만든다.

컴포넌트를 나누는 기준
객체지향에서 말하는 5가지 원칙, SOLID

- SRP
  - 모든 클래스는 하나의 책임만 가지며 캡슐화해야한다. (캡슐화된 컴포넌트)
  - 하나의 컴포넌트가 변경되는 이유는 단 하나여야 한다.
  - 컴포넌트를 봤는데 하는 일도 너무 많고, 변경이 있으면 많은 부분을 고쳐야 하면 컴포넌트를 쪼개야 한다.
  - 컴포넌트는 html이 길어질수도 있고, 자바스크립트 코드가 많아질수도 있다.
  - 자바스크립트 코드가 많아지는 경우는 다른 방법을 알아볼 것. 아마 커스텀 훅을 얘기하시는 것 같다.
- CSS
  - html 코드가 많아지는 경우에는 css를 위한 class를 잘 활용해야 한다.
  - css를 만들어야겠다고 생각할 때 우리 머리속으로 컴포넌트를 쪼갠다.
- Design's Layer
  - 디자인을 만들때부터 레이어를 나눠놓고 있다. 이것도 그대로 컴포넌트 구조로 활용할 수 있다.
  - 리액트 공식문서에서 hierarchy를 만드는 과정은 아샬님은 디자인에 가깝다고 하셨다.
- Information Architecture (JSON Schema의 영향)
  - JSON 구조가 체계적으로 잘 되어 있다면 JSON 구조를 활용할 수도 있다.
  - JSON 구조를 그대로 보여주기에 조금 애매하다면 프론트 단에서 가공을 해서 화면에 뿌려줄 수도 있고, 백엔드에 요청해서 데이터를 변환해달라고 할 수도 있다.
  - 실제로 아샬님은 이 방법을 엄청 많이 쓰게 된다, 만약 데이터 구조가 좋지 않으면 백엔드에서 수정하는 편이라고 하셨다.
  - Redux를 빡세게 사용하는 경우에는 Normalize를 많이 하게 된다. 데이터 오는 것들을 어떻게 할지, 캐시 관련된 것들을 어떻게 할지. gql은 캐싱을 알아서 해준다.
  - 자연스러운 SRP가 된다, 사실상 강제가 된다. product 하나를 보여주는 컴포넌트를 만들게 된다.

작은 컴포넌트, 부품을 만들어서 조립을 할 것이다. 나쁘게 얘기하면 조합의 가지수가 많아서 폭발적으로 양이 늘어나서 관리하기 어려울수도 있지만,  
관리만 잘하면 적은 부품만으로 여러가지를 다 만들 수 있다. 우리가 원하는 UI를 만들려고 할때 컴포넌트를 조립해서 만들면 매우 편하다. 하나만 수정하거나, 하나만 추가해서  
새로운 것을 만들어낼 수 있다.

Atomic Design
아토믹 디자인을 그대로 사용하라는 것이 아니다.  
만든 사람도 이미 우리가 쓰고 있던거고 이대로 해야하는게 아니다. 개념적인 것이다.  
이렇게 잘 조합을 해서 우리가 원하는 모든것을 만들자는 아이디어

- ATOMS
- MOLECULES
- ORGANISMS
- TEMPLATES
- PAGES

실제로 Thinking in React에 나오는 예제를 만들어 볼 것.

JSX는 XML이기 때문에 싱글 태그를 닫아줄 때는 Self-Closing 문법을 사용해야 한다.

둘 다 똑같다, 아샬님은 1번 스타일을 선호. 팀에서 어떻게 하는지를 따라가면 된다.

```tsx
// 1번
 <div>
    <input type="checkbox" id="only-stock" />
    <label htmlFor="only-stock">Only show products in stock</label>
  </div>

// 2번
  <div>
    <label>
      <input type="checkbox" />
      Only show products in stock
    </label>
  </div>
```

리스트를 렌더링 할 때 key를 잡아줘야 하는 이유는 데이터의 변화가 생겼는지 바로 알 수 있기 위함이다.  
일반적으로는 데이터의 id값으로 하고, id 값이 없다면 unique한 key값을 만들어야 한다.

고차함수 reduce를 사용할 때 타입 잡아주기  
아샬님은 왠만하면 type alias를 사용하시는데 현재 product와 같은 경우에는 interface를 사용하신다.  
해당 데이터의 경우 class로 만들 경우가 생길 수 있다.

```tsx
const categories = products.reduce(
  (acc: string[], product: Product) =>
    acc.includes(product.category) ? acc : [...acc, product.category],
  [],
);
```

컴포넌트는 비슷한 구조가 반복되면 그때 분리를 한다. 처음부터 컴포넌트 파일로 분리할 필요는 없다.  
컴포넌트 상단에 분리할 컴포넌트를 작성해준다.

너무 길어지거나 보편적으로 쓸 수 없게끔 되면 그때 분리를 해준다.

하나의 컴포넌트 안에서 변수명이 겹치면, 다른 파일로 분리를 해주면 된다.  
오히려 분리를 해야한다는 것을 알려주는 좋은 신호인 것 같다.

원래 컴포넌트가 받는 props의 타입을 잡아줄 때, 컴포넌트 이름에 상관없이 일관되게 Props로 잡았었는데  
컴포넌트명 + Props를 붙이는 게 더 좋은 것 같다는 생각이 들어서 바꿔야겠다.

아샬님은 코드를 작성하실 때 구현부를 먼저 작성하시고, 그 다음에 당연히 빨간줄이 뜨게 될 것이고  
선언부를 작성하시는데 이렇게 코드를 작성하는게 좋다는 것은 많이 들었고 나도 의식적으로 구현부를 먼저 작성해야겠다.  
마치 아주 초소형의 TDD 같은 느낌도 든다.

컴포넌트를 분리하는 과정은 섣불리 분리를 하려고 해서 어려움을 겪는 것 같다.  
아샬님처럼 우선 요구사항에 맞게 정적인 페이지를 작성하고, 중복되는 부분들을 하나씩 컴포넌트로 분리해나가는 과정이 좋은 것 같다.  
나중에 감각이 늘어나면 어느정도 미리 설계를 할 수 있겠지만 지금은 천천히 해나가는 게 더 중요할 것 같다.

Props는 Destructuring해서 사용하는게 좋다.  
타입스크립트를 쓸 때는 Props를 넘길 때 product.name, product.price 처럼 작게 쪼개서 넘기기 보다는 product 하나를 넘기는게 좋다.  
자동완성이 강력하기 때문에 상관이 없다.

만약 코드가 길어지면 들여쓰기를 통해서 깔끔하게 잘 정리하자.

Props를 어떻게 하면 잘 잡을지 고민해보는게 중요하다.  
기본적으로 받아야하는 게 있으면 type에선 &로 잡아주기.

컴포넌트는 특수한 게 있고 보편적인 게 있다. 쪼개는 기준을 스스로 잡아보면 좋다.