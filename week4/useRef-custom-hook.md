# 학습 키워드

- useRef
- Hook의 규칙

## 강의 정리

### useRef

useRef는 값을 참조하기 위한 객체이다.  
상태랑 상관없이 값을 계속 유지하고 싶을 때 useRef를 사용한다.

그러면 아래 코드와 같이 Component에서 그냥 객체를 사용하면 되지 않을까? 라는 의문이 들 것 같다.
아래와 같이 작성하게 되면 컴포넌트가 렌더링이 될 때마다 새롭게 ref 객체를 만든다.

```ts
export default function Component {
  const ref = {
    value: 1
  }
  ref.value = 2
}
```

그렇다면 컴포넌트 외부에 작성하면 어떨까?  
이렇게 작성할 경우의 문제점은 Component가 여러개 렌더링이 되면 여러 Component가 동일한 ref를 참조하게 된다.  
따라서 컴포넌트 개인의 ref를 가질수가 없다.

```ts
const ref = {
  value: 1
}
export default function Component {
  ref.value = 2
}
```

이를 위해서 Component에서는 ref를 사용하게 된다.

```ts
import { useRef } from 'react';

export default function Component {
  const ref = useRef(1);
  ref.current += 1;
}
```

ref는 state와 다르게 값이 변경되어도 리렌더링의 trigger가 되지 않는다.  
주요 용도:

1. 컴포넌트가 사라질 때까지 동일한 값을 써야 하는 경우 -> input등의 id 관리
2. (특히 useEffect 등과 함께 쓰면서 만나게 되는) 비동기 상황에서 현재 값을 제대로 쓰고 싶은 경우.

useEffect는 처음 렌더링되서 setup function이 실행 되었을 떄의 환경을 기억한다.  
따라서 렌더링 이후에 state가 변경되어도 변경된 값을 참조하지 않는다.

```ts
useEffect(() => {
  setTimeout(() => {
    console.log(filterText);
  }, 5_000);
}, []);
```

### Custom Hook

Component 내부의 도메인 로직을 재사용하기 위한 제일 쉬운 방법
컴포넌트에서 작성한 코드를 그대로 가져가서 use prefix를 붙인 파일로 추출하면 된다.

```ts
function useFetchProducts() {
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

  return products;
}
```

Custom Hook은 컴포넌트에서 도메인 로직을 분리한다.  
공식문서에는 여러 컴포넌트에서 사용되는 로직의 경우 제사용을 위해 분리한다고 나와있는데  
꼭 여러곳에서 사용되는 것이 아니어도 관심사의 분리를 위해 Custom Hook으로 분리하는 게 좋은 것 같다.  
실제 내부 구현은 어떻게 되어있는지 사용하는 Component에선 신경쓰지 않는다.

### Hook 규칙

Hook은 Component의 최상위에서만 호출해야 한다.

```ts
if (playing) {
  const products = useFetchProducts();
  console.log(products);
}
```

만약 특정 이벤트가 발생했을 때 data fetching을 하려고 하는 경우에는 Custom Hook 자체를 호출하는 것이 아니라,  
Custom Hook 내부의 data fetching 함수를 실행한다.
