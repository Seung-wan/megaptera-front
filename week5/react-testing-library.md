# 학습 키워드

- React Testing Library
- given - when - then 패턴
- Mocking
- Test fixture

## 강의 정리

### React Testing Library

리액트 테스트를 쉽게할 수 있도록 만든 것  
사용자 입장에 가깝게 테스트할 수 있다.

test는 **test**폴더를 따로 만들수도 있고 같은 계층에 [filename].test.tsx 이렇게 파일을 만들수도 있다.

```tsx
import { render, screen } from '@testing-library/react';

import TextField from './TextField';

test('TextField', () => {
  const text = 'Tester';
  const setText = () => {
    // do nothing...
  };

  render(
    <TextField
      label="Name"
      placeholder="Input your name"
      text={text}
      setText={setText}
    />,
  );

  screen.getByLabelText('Name');
});
```

테스트 코드, 즉 컴포넌트를 사용하는 코드를 작성하면서 해당 컴포넌트의 인터페이스를 점검할 수 있다. 기존에는 label이 빠져있었고, text 같이 범용적인 표현을 사용하지 않은 문제가 있었다. 개발하면서 이런 문제를 발견할 수도 있지만, 우리가 테스트부터 작성했거나 빠르게 테스트 코드를 작성했다면 작성하기 전 또는 바로 직후에 문제를 발견해서 수정할 수 있었을 것. 시간이 지나면 해당 코드에 대한 지식이 감소하고, 자신감 또한 감소하기 때문에 건드리기 힘든 코드가 되기 십상이다.

테스트 코드에서도 중복을 제거하는 것이 중요하다.

테스트를 작성할 때 외부 의존성이 강한 함수가 있다면 mocking을 이용할 수 있다. jest mock  
BDD 스타일로 테스트 코드를 작성하는 게 읽기 쉽다. 테스트 코드도 코드다.  
비즈니스 로직같은 부분, 예를 들어 input에 숫자만 입력받고 싶다면 이 부분은 외부에서 주입받게 한다.  
컴포넌트가 비즈니스 로직의 책임을 갖지 않게 한다.  
따라서 함수가 호출되었는지만 확인하면 된다.

```ts
import { render, screen, fireEvent } from '@testing-library/react';

import TextField from './TextField';

const context = describe;

describe('TextField', () => {
  const text = 'Tester';
  const setText = jest.fn();

  beforeEach(() => {
    setText.mockClear();
    // 또는 jest.clearAllMocks();
  });

  function renderTextField() {
    render(
      <TextField
        label="Name"
        placeholder="Input your name"
        text={text}
        setText={setText}
      />,
    );
  }

  it('renders an input control', () => {
    renderTextField();

    screen.getByLabelText('Name');
  });

  context('when user types text', () => {
    it('calls the change handler', () => {
      renderTextField();

      fireEvent.change(screen.getByLabelText('Name'), {
        target: {
          value: 'New Name',
        },
      });

      expect(setText).toBeCalledWith('New Name');
    });
  });
});
```

외부 의존성이 큰 함수는 모킹을 한다.

```tsx
import { render, screen } from '@testing-library/react';

import App from './App';

jest.mock('./hooks/useFetchProducts', () => () => [
 {
  category: 'Fruits', price: '$1', stocked: true, name: 'Apple',
 },
]);

test('App', () => {
 render(<App />);

 screen.getByText('Apple');
```

테스트 코드에서 쓰이는 더미 데이터를 fixture라고 하는데 `fixtures`라는 폴더를 만들어서 관리한다.
hook을 mocking하는 경우에도 처음에는 테스트 코드 내부에 작성할 수 있지만, 규모가 커지면 복잡해진다.
`hooks/__mocks__` 폴더에서 모킹을 해놓고 외부로 export하여 사용한다.
