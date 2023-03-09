# 학습 키워드

- Redux
- Reflect

## 강의 정리

### Redux 따라하기

코드를 작성하는 위주로 진행한다.

github의 external-store folder에 해당 내용을 정리했다.

우선, 타입스크립트의 제네릭에 대해 잘 알지 못한다면 타입을 지정하는 부분에서 꽤 어렵게 느낄수도 있을 것 같다.  
일반적으로 라이브러리와 같은 추상화 수준이 높은 코드, 로우 레벨의 코드를 작성하다 보면 타입을 먼저 잡아줄 수 없다.  
제네릭을 활용하여 타입을 안정적으로 잡아주는게 중요하다.

action은 기본적으로 type을 가진다. type은 선언적으로 state를 어떻게 변경시킬 것인지를 나타낸다.  
state를 변경시키는 경우에 action에 특정 값을 전달해줄 수 있는데 일반적으로 payload라는 네이밍을 사용한다.  
redux에서 payload로 사용하고 있기 때문에 그대로 사용한다.

payload의 타입은 먼저 잡아줄 수 없기 때문에, Action 타입을 사용하는 쪽에서 잡아줄 수 있도록 제네릭을 사용했다.

```ts
export type Action<Payload> = {
  type: string;
  payload?: Payload;
};
```

reducer는 기존의 state와 action을 받는다.  
reducer는 action에 따라서 state를 변화시키고, 새로운 state를 반환한다.  
이는 불변성을 지켜야 하기 때문이다. 기존의 state를 수정하면 변화를 알아차릴 수 없다.  
현재 작성된 코드에서 원시 타입의 경우에는 꼭 불변성을 지키지 않아도 상태가 업데이트 될 수 있을 것 같고,  
객체 타입의 경우에는 처리를 해주지는 않았지만 실제 객체의 값이 아닌 주소 값으로 비교하는게 성능면에서 괜찮을 것 같다.

```ts
type Reducer<State, Payload> = (state: State, action: Action<Payload>) => State;
```

dispatch로 action을 reducer에게 던진다.  
상태를 업데이트하고, 구독하고 있던 listener들에게 노티를 준다.

```ts
 dispatch<T>(action: Action<T>) {
  this.state = this.reducer(this.state, action);
  this.listeners.forEach((listener) => listener());
 }
```
