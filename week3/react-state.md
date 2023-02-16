# 학습 키워드

- React state란?
- DRY 원칙
- SSOT(Single Source of Truth)
- useState
- 1급 객체(first-class object)란?
- Lifting State Up

## 강의 정리

### 또 Thinking in React

Step 3: Find the minimal but complete representation of UI state
Step 4: Identify where your state should live
Step 5: Add inverse data flow

### React의 State

데이터가 있다고 해서 다 State는 아니다, State는 변경을 다루기 위한 요소다.  
상태가 바뀌면 하위에 있는게 다 바뀐다.  
React는 가능하면 DRY를 따르라고 나와있다, 반복하지 마라.  
DRY는 어디에든 적용하는게 좋은 것 같다.  
DRY 원칙을 따르는 SSOT를 만든다.

React State의 조건

- 변경되어야 한다. 변경되지 않는 건 state로 다룰 가치가 없다.
- 부모 컴포넌트가 props를 통해 전달한다면 state가 아니다.
- 다른 state나 props를 이용해 계산이 가능하다면 state가 아니다. (computed value)

다루는 상태가 너무 많으면 복잡해진다. TypeScript를 잘 쓰면 직접 관리하는 상태의 수를 줄여줄 수 있다.  
JavaScript를 사용하면 상태로 object를 들고 있으면 불안하다. 넘겨줘야 하는 값들이 너무 많다.  
TypeScript로 상태가 잘 정의되어 있으면 재사용하기 편하다, 부담감이 없다. 객체로 만들어서 여러개를 넘길 필요 없이 store를 만들어서 하나를 넘기면 된다.  
정말 자동완성이 너무 좋다.  
TypeScript를 리액트에서 잘 쓰는 방법을 계속 고민하고 생각해보기

그렇다면 상태는 누가 잡아주면 좋지? 어떤 파일이 상태를 들고 있어야 하는가.  
기본적으로는 사용하는 곳에서 잡아준다.  
원론적으로 본다면 해당 상태를 사용하는 컴포넌트를 모두 포함하는 컴포넌트가 상태를 소유해야 하는데, 계속 위로 올려가면서(Lifting State Up) 확인해야 한다.  
사용하는 컴포넌트의 교집합이 되는 부모 컴포넌트를 찾아야 한다.

하위 컴포넌트에서 상위 컴포넌트의 State를 변경하기 위해서는 상위 컴포넌트에서 하위 컴포넌트로 setter 함수를 전달해줘야 한다.  
여러 컴포넌트에서 props로 중복되는 값을 받게 되면 중복되는 값 자체를 타입으로 분리하거나, 아니면 구현부를 타입으로 분리해주면 좋다.

utils 함수에 매개변수로 넘겨줄 때 제품을 필터링 하는 경우에, 첫 번째 매개변수로는 product, 두 번째 매개변수로는 filterConditions를 담는 객체와 같이  
primitive type과 reference type을 혼용해서도 사용한다. 특정 라이브러리에서도 이러한 패턴을 봤었던 것 같다.

### External Store

상태를 React에 있는 것으로 모두 처리하려고 했다.  
상태가 많을수록 복잡해지고, 다른 방법을 생각해볼 수 있다.  
복잡한 상태를 관리하는 스킬이 프론트엔드 개발자의 역량이라고 생각한다.

리액트가 아닌곳에서 상태를 관리하려고 하는 것을 External Store라고 부른다.
External Store를 다루고 훅 개념을 써서 External Store를 어떻게 하면 잘 쓸 수 있는지 알아볼 것.
