# 학습 키워드

- React에서 JSX를 사용하는 목적
- Syntactic sugar
- React.createElement
- React Element
- React StrictMode
- VDOM(Virtual DOM)이란?
  - DOM이란?
  - DOM과 Virtual DOM의 차이
- Reconciliation(재조정) 과정은 무엇인가?

## 강의 정리

### JSX

JSX is an XML-like syntax extension to ECMAScript  
XML에서 가장 중요한 것은 문법 확장이다.

리액트를 다룰 때 기본이 되는 기술  
JSX는 자주 접하게 된다.

JSX는 리액트를 만들면서 나온 부산물이지만 다른곳에서도 사용할 수 있다.  
리액트만의 전유물은 아니지만 리액트가 유명해지면서 사실상 JSX가 리액트가 됐다.

JSX는 XML처럼 작성된 부분을 React.createElement를 쓰는 코드로 변환한다.

XML에서는 `<br>` 같은 태그를 꼭 닫아서 써야한다, `</br>`  
중괄호를 써서 JavaScript 코드를 그대로 쓸 수 있고, 결국은 JavaScript 코드와 1:1로 매칭된다.

### Example 1

```jsx
<p>Hello, world!</p>;

React.createElement('p', null, 'Hello, world!');

// @jsx를 코드의 상단에 작성하면 JSX를 JS로 변환할 때 아래와 같이 생성된다.
// jsx를 리액트 외부에서 사용하고 싶을 때 이런 방식으로 사용할 수 있다.
/* @jsx r.createElement */

<p>Hello, world!</p>;

r.createElement('p', null, 'Hello, world!');
```

### Example 2

```jsx
<Greeting name="world" />;

React.createElement(Greeting, { name: 'world' });
```

### Example 3

```jsx
<Button type="submit">Send</Button>;

React.createElement(Button, { type: 'submit' }, 'Send');
```

### Example 4

JSX에서는 아래와 같이 작성할 수 없다.  
React Element는 React.createElement 메소드를 실행하기 위해 1개의 부모만 가질 수 있기 때문이다.  
`<div>` 같은 태그로 감싸주거나 렌더링되고 나서 돔에 태그를 삽입하고 싶지 않다면, React.Fragment를 이용한다.  
`<React.Fragment></React.Fragment>`는 아예 생략해서 `<></>` 이렇게 쓸 수 있다.

```jsx
  <p>Hello, world!</p>
  <Button type="submit">Send</Button>

  <>
    <p>Hello, world!</p>
    <Button type="submit">Send</Button>
  </>

  React.createELement(
    React.Fragment,
    null,
    React.createElement('p', null, 'Hello, world!'),
    React.createElement('Button', {type: "submit"}, 'Send'),
  )
```

```jsx
<div className="test">
  <p>Hello, world!</p>
  <Button type="submit">Send</Button>
</div>;

React.createElement(
  'div',
  { className: 'test' },
  React.createElement('p', null, 'Hello, world!'),
  React.createElement(Button, { type: 'submit' }, 'Send'),
);
```

### Example 5

jsx는 태그안에서 text와 JavaScript 값으로만 구분을 한다, 임의로 공간을 주려면  
`{' '}`을 이용하면 createElement에 추가된다.

```jsx
// prettier-ignore

<div>
  <p>Count: {' '} {count}!</p>
  <button type="button" onClick={() => setCount(count + 1)}>
    Increase
  </button>
</div>;

React.createElement(
  'div',
  null,
  React.createElement('p', null, 'Count: ', ' ', count, '!'),
  React.createElement(
    'button',
    { type: 'button', onClick: () => setCount(count + 1) },
    'Increase',
  ),
);
```

### React Element

JSX는 React에 있는 createElement를 사용하도록 코드를 바꿔주는 것  
JSX없이도 React를 사용할 수 있다, JSX로 할 수 있는 모든 것은 순수 JavaScript로도 할 수 있다.

createElement는 React element를 만들어낸다.  
Browser DOM에서도 element를 만드는 createElement가 있다.

```js
document.createElement('div');

const element = document.createElement('div');

// 태그에 단일 클래스명을 지정할 때
element.className = 'test';

// 태그에 복수의 클래스명을 지정할 때
element.classList = 'test, good';
element.classList = ['test', 'good'].join(' ');

element.appendChild(document.createElement('p'));
```

React Element 트리를 갱신하는데 쓸 수 있다.  
React.createElement를 직접 쓰면 힘들기 때문에  
jsx-runtime에서는 \_jsx, Preact는 h란 함수를 지원한다.

### VDOM (Virtual DOM)

DOM같은 가상의 DOM을 만들어서 쓰는 것이다.  
React에서는 바로 DOM을 조작하는 것이 아니라 Virtual DOM Tree를 만들어서 사용한다.  
실제 DOM과 동기화를 해준다, 이 과정을 재조정(Reconciliation)이라고 한다.  
VDOM과 Real DOM을 비교하면서 바뀐 부분만 변경시켜준다.

VDOM을 쓰면 일을 2번 하는 것이다, 바로 DOM에 반영해주면 될탠데 왜 VDOM을 쓸까?

### React Developer Tools

chrome의 extension이다.  
컴포넌트 구조나 state의 변화를 확인할 수 있고, 리렌더링 되는 컴포넌트도 확인할 수 있다.

### VDOM을 쓰는 이유?

미신: React는 DOM보다 빠르다.
현실: VDOM은 유지보수하기 좋은 어플리케이션을 만들어주고 충분히 빠르다.

`VDOM의 접근 방식이 React의 선언적 API를 가능하게 한다.`  
명령형으로 DOM을 다루는 것은 개발자 경험이 좋지 않다.  
선억적인 프로그래밍은 의도를 더욱 명확하게 드러내고 가독성이 좋은 코드를 작성할 수 있다.  
JSX를 작성하면 리액트가 그대로 DOM에 반영해준다, 반영하는 행위에 대해서는 신경쓸 필요가 없다.

`VDOM이 무엇이고, 왜 쓰는지 안다면 활용할 수 있는 최적화 기법이 존재한다.`
