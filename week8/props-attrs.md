# 학습 키워드

- props
- attrs

## 강의 정리

### Props 활용

```tsx
import { useBoolean } from 'usehooks-ts';

import styled, { css } from 'styled-components';

type ParagraphProps = {
  active?: boolean;
}

const Paragraph = styled.p<ParagraphProps>`
	color: ${(props) => (props.active ? '#F00' : '#888')};
	${(props) => props.active && css`
		font-weight: bold;
	`}
`;

export default function Greeting() {
  const { value: active, toggle } = useBoolean(false);

  return (
    <div>
      <Paragraph>
        Inactive
      </Paragraph>
      <Paragraph active>
        Active
      </Paragraph>
      <Paragraph active={active}>
        Hello, world
        {' '}
        <button type="button" onClick={toggle}>
          Toggle
        </button>
      </Paragraph>
    </div>
  );
}
```

useBoolean 훅을 사용하여 간단하게 on/off 하는 용도의 state를 만들었다.  
스타일드 컴포넌트도 리액트 컴포넌트와 동일하게 props를 전달받을 수 있는데 똑같이 타입을 잡아준다.  
각 css 속성의 값으로 함수를 넣게 되는데, 함수는 props를 받아서 props에 따라 조건부 스타일링 처리를 해준다.

먼저 속성을 정의하고 값을 분기처리할 수도 있고, 아예 속성까지 props에 따라 처리할 수도 있다. 이때 자동완성을 위해 css 함수를 사용해주면 편리하다.

