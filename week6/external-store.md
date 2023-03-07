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
MVC의 대안으로 내세운 아키텍처다.  
View의 복잡한 관계(전통적인 MVC에선 이런 상황을 지양한다)를 겨냥해 명확히 `unidirectional data flow`를 강조한다.

1. Action -> 이벤트/메시지 같은 객체.
2. Dispatcher -> (여러) Store로 Action을 전달. 메시지 브로커와 유사하다.
3. Store (여러 개) -> 받은 Action에 따라 상태를 변경. 상태 변경을 알림.
4. View -> Store의 상태를 반영.
