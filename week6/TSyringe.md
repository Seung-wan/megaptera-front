# TSyringe

## 학습 키워드

- TSyringe
- 의존성 주입(Dependency Injection)
- reflect-metadata
- singleton (싱글톤)

### TSyringe (발음: 시린지)

영어 단어(syringe)의 뜻은 주사기라는 의미다.  
앞의 T가 붙은 것은 TS와 연결짓는 말장난.

MS에서 만들었고, IoC 컨테이너의 역할을 한다. 의존성을 주입해준다.  
테스트라던가, 미묘하게 조립해야 하는 경우에 많이 쓴다.  
External Store를 관리하는 데 사용할 것

React에서는 Props Drilling 이슈가 있다.  
데이터가 단방향으로 (부모 -> 자식)으로 흐르기 때문에, 컴포넌트 구조의 뎁스가 깊은 경우 부모 컴포넌트의 상태를  
자식 컴포넌트가 사용하려면 그 상태를 사용하지 않는 컴포넌트들도 props로 상태를 받아서 내려줘야 한다.

tsyringe와 reflect-metadata를 설치해준다.

```bash
npm i tsyringe reflect-metadata
```

상태는 Store라는 클래스를 만들어서 쓸 것.

```ts
// CounterStore.ts
import { singleton } from 'tsyringe';

type Listener = () => void;

@singleton()
export default class CounterStore {
  count = 0;

  listeners = new Set<Listener>();

  publish() {
    this.listeners.forEach((listener) => listener());
  }

  addListener(listener: Listener) {
    this.listeners.add(listener);
    this.publish();
  }

  removeListener(listener: Listener) {
    this.listeners.delete(listener);
    this.publish();
  }
}

// hooks/useCounterStore.tsx

import useForceUpdate from '../useForceUpdate';
import CounterStore from '../../stores/CounterStore';

export default function useCounterStore() {
  const counterStore = container.resolve(CounterStore);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    counterStore.addListener(forceUpdate);

    return () => {
      counterStore.removeListener(forceUpdate);
    };
  }, [counterStore, forceUpdate]);

  return counterStore;
}

// Counter.tsx
import { container } from 'tsyringe';

export default function Counter() {
  const counterStore = useCounterStore();

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    counterStore.addListener(forceUpdate);

    return () => {
      counterStore.removeListener(forceUpdate);
    };
  }, [counterStore, forceUpdate]);

  const handleClickIncrease = () => {
    counterStore.increase();
  };

  const handleClickDecrease = () => {
    counterStore.decrease();
  };
}
```

리액트 App의 진입점인 main.tsx(or App.tsx)에서 reflect-metadata를 import해줘야 한다.  
테스트를 위해서는 setupTests.ts 파일에 reflect-metadata를 import해준다.

@붙여서 쓰는 것을 데코레이터라고 하는데, 데코레이터를 쓰려면 tsconfig.json에 속성을 추가해줘야 한다.

```json
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
```

tsyringe가 알아서 싱글톤으로 관리해준다.

테스트 코드를 작성할 때는 각 테스트 케이스마다 Store를 초기화해줘야한다.

```ts
beforeEach(() => {
  container.clearInstances();
});
```
