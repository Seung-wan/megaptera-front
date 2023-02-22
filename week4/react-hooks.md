# 학습 키워드

- React Hook 이란
- Hooks
  - useState
  - useEffect
  - useContext
  - useRef
  - useLayoutEffect
- React StrictMode 란

## 강의 정리

### React의 Hook

(사소함) 보통 외국에서는 복수형으로 많이 부른다. Hooks, Github Actions.  
한국에서는 Hook, Github Action과 같이 단수로 많이 표기한다.

React 16부터 체계가 잡혔다.  
React 16.8에서 Hooks가 도입되었다.  
React 18에서는 Concurrent Mode가 강조가 되었다.

리액트에서 사용하던 기존 방식의 문제가 있었다.

- Wrapper Hell (HoC), 장풍을 쏘게 된다.
- Huge Components
- Confusing Classes, 난해한 this

Class Component를 사용하지만, 객체지향으로 짜는것도 아니다. 혼란스러운 면이 있었다.  
Class Component를 없애겠다는 것은 아니지만, Function Component와 Hook을 사용할 것이라는 말.  
기존의 Class 코드는 문제없이 사용이 가능하다.

예전에는 상태를 가진 컴포넌트를 Class Component로 만들고 props만 재사용 하는 순수한 컴포넌트는 Function Component로 작성했다.  
Redux에서는 Presentational, Container Components로 분리했다.

이제는 모두 Function Component로 사용한다.  
도메인 로직들을 모두 커스텀 훅으로 분리하여 재사용이 가능하다.

대표적인 Hooks

- useState -> State Hook -> React의 State
- useEffect -> Side-effect
- useContext
- useRef
- useLayoutEffect -> useEffect와 같게 동작하지만 실행 시점이 다르다.

### useEffect

리액트 베타 문서에 `You Might Not Need an Effect`라는 주제의 내용도 있듯이 useEffect를 제대로 사용하는게 중요하다.  
useEffect는 렌더링 이후에 해야 할 일, React의 외부와 관련된 일을 정해줄 수 있다.

### 타이머 예제

```ts
// 브라우저의 title을 밀리초로 변경한다.
useEffect(() => {
  document.title = `Now: ${new Date().getTime()}`;
});
```

```ts
function Timer() {
  useEffect(() => {
    const savedTitle = document.title;
    // useEffect 내부에서 setTimeout, setInterval을 사용할 경우에는 컴포넌트가 unmount 되었을 때 clear를 해줘야 한다.
    // useEffect의 clean up 함수를 이용해서 처리한다.
    const id = setInterval(() => {
      document.title = `Now: ${new Date().getTime()}`;
    }, 100);

    return () => {
      document.title = savedTitle;
      clearInterval(id);
    };
  });

  return <p>Playing</p>;
}

export default function TimerControl() {
  const [playing, setPlaying] = useState(false);

  const handleClick = () => {
    setPlaying(!playing);
  };

  return (
    <div>
      {playing ? <Timer /> : <p>Stop</p>}
      <button type="button" onClick={handleClick}>
        Toggle
      </button>
    </div>
  );
}
```

### 처음에 한번만 실행하기

useEffect의 2번째 매개변수에 의존성 배열을 넣어줄 수 있다.

- 빈 배열을 넣으면, 컴포넌트가 처음 mount될 때만 useEffect의 setup function이 실행된다.
- 특정 값을 담고 있는 배열을 넣으면, 컴포넌트가 처음 mount될 때와, 특정 값이 변경되었을 때만 useEffect의 setup function이 실행된다.
- 배열을 넣어주지 않으면, 컴포넌트가 처음 mount될 때와, 컴포넌트가 렌더링이 될 때마다 setup function이 실행된다.

일반적으로는 data fetching을 할 때 useEffect를 사용한다.

```ts
const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  const fetchProducts = async () => {
    const url = 'http://localhost:3000/products';
    const response = await fetch(url);
    const data = await response.json();
    setProducts(data.products);
  };

  fetchProducts();
}, []);
```

fetchProducts라는 함수가 useEffect 내부에 있어야 하는지에 대한 의문이 있을 수 있다.  
실제로 useEffect 외부에, 컴포넌트 내부에 선언해도 문제는 없다.  
하지만 fetchProducts 내부에서 Component의 State값을 참조하는 경우에는 문제가 생길 수 있다.  
Component가 렌더링이 되었을 때 바깥에 있는 변수들을 캡처해서 쓰기 때문에(바인딩) 문제가 생길 수 있다.  
가능하면 함수들을 useEffect 내부에 모두 넣으면 고민할 필요가 없다. useEffect의 setup function이 클로저가 된다.

### Effect가 두 번 실행되는 문제

StrictMode는 개발자가 일으킬 수 있는 문제를 검사하기 위해 사용된다.
dev 환경에서 렌더링이 2번 되는것은 문제가 아니다. 간혹 useEffect에서 문제가 생기는 경우가 있는데, flag 변수를 이용한다.

### 의존성 배열을 이용해 Fetch할 때 주의사항

리액트에서는 컴포넌트가 unmount 되었을 때 상태를 업데이트 하려고 하면 문제가 생긴다.  
이를 막기위해 flag 변수를 이용하여 data fetching이 완료되었을 때 컴포넌트가 unmount되지 않았으면 setter function을 실행하도록 한다.  
axios를 이용하는 경우에 기존에는 cancelToken을 사용했는데 이제는 deprecated 되었고 AbortController를 사용하는것이 권장된다.
