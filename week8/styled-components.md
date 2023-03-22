# 학습 키워드

- styled-components

## 강의 정리

### styled-components

npm trends에서 가장 많은 사용률을 보여주는 styled-components에 대해 학습, 하나만 할 줄 알면 나머지도 비슷하다.

Babel Plugin을 SWC에서 쓸 수 있도록 설정 (SSR 지원등 공식 권장사항)

```shell
npm i styled-components
npm i -D @types/styled-components @swc/plugin-styled-components
```

```json
{
"jsc": {
    "experimental": {
        "plugins": [
            [
                "@swc/plugin-styled-components",
                {
                    "displayName": true,
                    "ssr": true
                }
            ]
        ]
    }
}
}
```

간단한 Styled Component 만들기.

```tsx
import styled from 'styled-components';

const Paragraph = styled.p`
	color: #00F;
`;

export default function Greeting() {
  return (
    <Paragraph>
      Hello, world!
    </Paragraph>
  );
}
```

HTML 태그가 아닌, 기존 Styled Component에 스타일 입히기

```tsx
import styled from 'styled-components';

const Paragraph = styled.p`
	color: #00F;
`;

const BigParagraph = styled(Paragraph)`
	font-size: 5rem;
`;

export default function Greeting() {
	return (
		<BigParagraph>
			Hello, world!
		</BigParagraph>
	);
}
```

기존 컴포넌트에도 스타일을 입힐 수 있다. 다만, 기존 컴포넌트가 class를 잡아줘야 한다.

```tsx
import styled from 'styled-components';

function HelloWorld({ className }: React.HTMLAttributes<HTMLElement>) {
	return (
		<p className={className}>
			Hello, world!
		</p>
	);
}

const Greeting = styled(HelloWorld)`
	color: #00F;
`;

export default Greeting;
```

