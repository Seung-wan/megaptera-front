# 학습 키워드

- 관심사의 분리
- Layered Architecture
- Flux Architecture
- useReducer
- useCallback

## 강의 정리

### Separation of Concerns

관심사를 나누는 것

리액트 앱을 만들면서 관심사의 분리를 하고 있었다.

App

- Header
- Main
  - Greeting
  - Counter
  - Posts
  - PostForm
    - TextField
  - Footer

App은 TextField가 어떻게 동작하는지 알고 싶지 않다.  
TextField는 Posts가 어떻게 동작하는지 알고 싶지 않다.

서로 관심사가 다르고 기능들이 다르다.  
위의 예시는 기능이 다른 것으로 나눴지만 설계, 아키텍처 관점에서 나눌 수 있다.

Layered Architecture는 백엔드에서 많이 쓰이는데, 프론트엔드에서도 똑같이 적용할 수 있다.  
레이어드 아키텍처는 사용자 관점에서 바라본다.

사람 - 스위치(UI) -> 모터 -> 바퀴

각각은 하나의 역할을 한다. 스위치는 ON/OFF만 한다.  
이걸 누르면 ON이 되고, 다시 누르면 OFF가 된다. 모터가 어떻게 도는지는 상관하지 않는다. 복잡도가 낮아진다.  
모터는 전류가 흐르면 돌아가기만 하면 된다. 각자 다른 관심사를 가진다.

거대한 프로그램이 아니라고 해도 Input -> Process -> Output 3단계로 코드를 구분하면, 코드를 이해하고 유지보수하는데 큰 도움이 된다.  
What's your name?

Input

Process -> Hello, [name] => 메시지

```ts
function greeting(name: string) {
  return `Hello, ${name}`;
}
```

Output

하나의 Output은 다시 사용자에게 Input을 요청하게 되는데, 일반적으로 이 싸이클이 계속 반복된다.

1. Input: 프로그램 시작
2. Process: 프로그램 초기화
3. Output: 사용자에게 초기 UI 보여주기
4. Input: 사용자의 입력
5. Process: 사용자의 입력에 따라 처리
6. Output: 처리 결과 보여주기
7. Input: 사용자의 또 다른 입력
8. …반복…

이 과정을 MVC로 거칠게 매핑하면 아래와 같다. (실제로는 아니지만)

- Model -> Process
- View -> Output
- Controller -> Input

서로 자기가 하는 일에만 신경을 써서 그것말 잘 하려고 한다.

### Flux Architecture

리액트를 발표하고 다음 해에 발표를 했다.  
MVC의 대안으로 내세운 아키텍처다. (엄밀히 말하면 영상에서 처럼 MVC를 사용하지는 않는다)  
View의 복잡한 관계(전통적인 MVC에선 이런 상황을 지양한다)를 겨냥해 명확히 `unidirectional data flow`를 강조한다.

1. Action -> 이벤트/메시지 같은 객체.
2. Dispatcher -> (여러) Store로 Action을 전달. 메시지 브로커와 유사하다.
3. Store (여러 개) -> 받은 Action에 따라 상태를 변경. 상태 변경을 알림.
4. View -> Store의 상태를 반영.

Redux는 단일 Store를 사용함으로써 좀 더 단순한 그림을 제안한다.

1. Action
2. Store -> dispatch를 통해 Action을 받고, 사용자가 정의한 reducer를 통해 State를 변경한다.
3. View -> State를 반영.

불변성을 지켜서 업데이트한다.

```js
const state = {
  name: 'tester',
};

const nextState = { ...state, name: 'New Name' };
```

reducer를 통해서 상태를 변경해준다.  
reducer는 리액트와는 상관이 없는 것이다.

Action을 어떻게 표현하느냐가 Redux를 사용함에 있어 큰 차이를 만든다.  
Action Creator도 존재하는데, Action을 만들어내는 Helper 함수의 역할을 한다.

하지만 상태를 UI에 반영하는 방법은 모두 동일하다.

3단계 프로세스

- Input -> Action + Dispatch
- Process -> reducer
- Output -> View(React)

### External Store

리액트가 아닌 것, 리액트의 바깥인 것.  
일반적인 아키텍처 관점에서 봤을 때 UI가 오히려 가장 바깥쪽, 외부와 가깝다.  
React는 사실 바깥쪽에 있는 것.

여기서 External Store의 의미는 안, 밖의 의미라기 보다는 React 내부에 있지 않다는 것. (React의 입장에서)

상태가 바뀌면 화면을 그려줘야하는데, useState 훅을 사용하지 않으면 상태의 변화가 UI에 반영되지 않는다.

따라서 useState를 사용하지 않는 값이 변화하였을 때 UI에 반영해주려면 forceUpdate를 시켜줘야 한다.  
class component에서는 존재했지만, function component에서는 직접 만들어서 쓰면 된다.  
useState보다 useReducer를 사용하는 것이 더 가볍다는 의견이 있다.  
[react-use PR](https://github.com/streamich/react-use/pull/837)

React는 재조정 (Reconciliation) 과정을 통해 상태가 바뀌면 해당 컴포넌트와 하위 컴포넌트를 다시 렌더링한다.  
setState가 내부적으로 useReducer를 사용한다.

```ts
const [, setState] = useState({});
const forceUpdate = () => setState({});

// Custom Hook
function useForceUpdate() {
  const [, setState] = useState({});
  return useCallback(() => setState({}), []);
}
```

useState로 상태를 관리하지 않고, 일반적인 변수로 관리하면서 forceUpdate를 시켜주는 것이 기본적인 External Store의 아이디어다.  
forceUpdate를 시켜줄 때의 주의해야 할 점은 state에 변화가 있어야, 리액트에서 리렌더링이 발생한다는 것이다.

Business Logic과 UI를 분리할 수 있다.

React에서 Business Logic을 분리하게 되면, React는 Business Logic이 어떻게 구성되어 있는지 알 필요 없이 가져다 쓰기만 하면 되고,  
UI와 분리가 되었기 때문에 Business Logic은 테스트를 하기가 쉬워진다.

관심사의 분리: 내가 알빠가 뭐야 라는 식  
각 레이어별로 레이어가 맡아야 하는 역할만 하면 된다.

Business Logic은 쉽게 바뀌지 않는다.  
UI는 자주 바뀌는데 UI에 Business Logic이 포함되어 있으면 테스트 코드가 쉽게 터진다.
