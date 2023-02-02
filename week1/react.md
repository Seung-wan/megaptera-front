# 학습 키워드

- React란?
- React 컴포넌트
- React 리렌더링
- IoC(Inversion of Control)
- Library vs Framework

## React

<aside>

[**React 공식문서**](https://ko.reactjs.org/)

→ 옛날 거라서 보면 안 될 줄 알았는데, 최근에 업데이트가 됨.

- 기존에는 클래스 컴포넌트 예제가 많았지만, 많은 부분이 함수 컴포넌트로 변경되어 읽기에 괜찮다.

[**React Beta 문서**](https://beta.reactjs.org/)
→ 요즘 React 사용법을 다룬 문서. 베타 버전이고 완성도가 낮지만 (+ 한국어 버전이 없지만) 이것부터 읽는 걸 권장.

</aside>

- React로 작업하는 프로세스는 [Thinking in React](https://beta.reactjs.org/learn/thinking-in-react)를 참고. “상태”를 골라내는 게 핵심이다.  
  React는 직접 DOM을 찾아서 속성을 추가하고 element를 추가하는 명령형 프로그래밍이 아닌 선언적 프로그래밍을 할 수 있게 해준다. 화면에 UI를 어떻게 보여주고 싶은지 React에게 전달하면 된다.

- 한국어로 읽고 싶다면 [예전 문서의 설명](https://ko.reactjs.org/docs/thinking-in-react.html)만 살짝 참고하자(코드는 참고하지 말 것!).
- [React 코어 개발자가 쓴 React에 대한 이해를 돕는 글](https://overreacted.io/ko/react-as-a-ui-runtime/) (필독!)
  - Dan Abramov는 신이야...

### 렌더링

- 브라우저에 view를 보여주는 것
- 함수가 실행되는 것

- createRoot (React 18)

```ts
function Greeting() {
  return <p>Hello, world!</p>;
}

function main() {
  const element = document.getElementById('root');

  if (!element) {
    return;
  }

  const root = ReactDOM.createRoot(element);

  root.render(<Greeting />);
}

main();
```

- 여러 개의 Root를 만들 수 있고, 여러 번 render할 수 있다.
- React는 변경된 부분만 업데이트 한다.
  - Reconciliation(재조정)
  - diffing algorithm

### 리렌더링

State가 바뀔 때 리렌더링이 되고, 자녀들도 리렌더링이 된다.

- [React는 컴포넌트를 언제 다시 리렌더링 할까요?](https://velog.io/@surim014/react-rerender)
- [왜 리액트에서 리렌더링이 발생하는가.](https://medium.com/@yujso66/%EB%B2%88%EC%97%AD-%EC%99%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-%EB%A6%AC%EB%A0%8C%EB%8D%94%EB%A7%81%EC%9D%B4-%EB%B0%9C%EC%83%9D%ED%95%98%EB%8A%94%EA%B0%80-74dd239b0063)
- [React 렌더링 동작에 대한 (거의) 완벽한 가이드](https://velog.io/@superlipbalm/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior)

### Component는 최상위에 하나의 부모가 있어야 한다.

- React.createElement
  - jsx가 js로 변환될 때 위 메소드를 실행한다. 첫 번째 인자로 태그 혹은 컴포넌트를 1개 받는다.
- Fragment
  - DOM에 렌더링이 될 때 사라지는 태그, 코드 작성시 부모 태그의 역할을 한다.

### 보너스

[면접 때 종종 나오는 (쓸모 없는) 질문인 “React는 프레임워크인가요, 라이브러리인가요?”에 대한 React 개발자의 답변](https://twitter.com/trueadm/status/1194567962784653312)

[제어의 역전](https://martinfowler.com/bliki/InversionOfControl.html)(IoC: Inversion of Control)이 Framework의 주요한 특징이고, React는 IoC를 통해 상태와 업데이트가 얽힌 복잡한 상황을 간단히 선언형 UI로 구성하는 혜택을 누린다(이게 바로 React의 첫 번째 특징이다). 그 누구도 매번 root를 render하는 방식으로 쓰면서 “이게 라이브러리지!”라며 감탄하지 않는다.

하지만 일반적으로는 (Martin Fowler의 개탄처럼) IoC는 IoC 컨테이너와 엮여서 DI와 동의어처럼 쓰이고, Next.js, Remix 같은 걸 Framework이라고 부르니 면접 때 괜히 이런 걸로 싸우지는 말자. “리액트 개발자가 이렇게 이야기했다니까요!”라고 해봐야 서로 감정만 상할 뿐이다.

우리는 스스로 몰랐더라도 라이브러리, 프레임워크를 사용하면서 제어의 역전을 경험하고 있다.  
스스로 관리하지 않더라도 구현체에 값을 전달해주면, 구현체가 대신해서 특정 역할을 해주는 것.  
React의 선언적인 렌더링도 제어의 역전이다.
