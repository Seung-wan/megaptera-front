# 학습 키워드

- Reset CSS
- `box-sizing` 속성
- `word-break` 속성
- Theme
- ThemeProvider

## 강의 정리

### Reset CSS

브라우저들마다 스타일이 적용되는 방법이 다 달라서 모든 스타일을 초기화해놓고, 0부터 시작하기 위해 Reset CSS를 사용한다.  

패키지 설치
```shell
npm i styled-reset
```


컴포넌트 형태로 스타일을 초기화해줄 수 있다.
```tsx
import { Reset } from 'styled-reset';

export default function App() {
  return (
    <>
      <Reset />
      <Greeting />
    </>
  );
}
```

styled-components에서 전역 스타일을 지정하는 방식

```tsx
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
	}
	
	*,
	*::before,
	*::after {
		box-sizing: inherit;
	}
	
	html {
		font-size: 62.5%;
	}
	
	body {
		font-size: 1.6rem;
	}
	
	:lang(ko) {
		h1, h2, h3 {
			word-break: keep-all;
		}
	}
`;

export default GlobalStyle;
```

Reset CSS와 동일하게 App 컴포넌트에 적용해준다.

```tsx
import { Reset } from 'styled-reset';

import GlobalStyle from './styles/GlobalStyle';

export default function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <Greeting />
    </>
  );
}
```

### Theme

디자인 시스템의 근간을 마련하는데 활용한다.
React Context를 이용하여 내려준다.

```tsx
const defaultTheme = {
  colors: {
    background: '#FFF',
    text: '#000',
    primary: '#F00',
    secondary: '#00F',
  },
};

export default defaultTheme;
```

타입을 잡아주는게 안정적으로 작성하기에 더 좋다.
```tsx
const Theme = typeof defaultTheme;

export default Theme
```

App 컴포넌트에서 ThemeProvider로 감싸준다.
```tsx
import { ThemeProvider } from 'styled-components';

import { Reset } from 'styled-reset';

import defaultTheme from './styles/defaultTheme';

import GlobalStyle from './styles/GlobalStyle';

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Reset />
      <GlobalStyle />
      <Greeting />
    </ThemeProvider>
  );
}
```

실제로 styled-components 내부에서 theme을 사용하려고 하면 type을 잡지 못하는 문제가 발생하는데 type을 잡아줘야 한다.  
```tsx
import 'styled-components';

import Theme from './Theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
```

usehooks-ts를 이용하여 다크모드 지원하기.
```tsx
import { useDarkMode } from 'usehooks-ts';

import { ThemeProvider } from 'styled-components';

import { Reset } from 'styled-reset';

import defaultTheme from './styles/defaultTheme';
import darkTheme from './styles/darkTheme';

import GlobalStyle from './styles/GlobalStyle';

import Greeting from './components/Greeting';
import Button from './components/Button';

export default function App() {
const { isDarkMode, toggle } = useDarkMode();

const theme = isDarkMode ? darkTheme : defaultTheme;

return (
  <ThemeProvider theme={theme}>
    <Reset />
    <GlobalStyle />
    <Greeting />
    <Button onClick={toggle} isActive={isDarkMode}>
      Dark Theme Toggle
    </Button>
  </ThemeProvider>
	);
}
```

defaultTheme을 하나 잡아놓고, 어플리케이션 전체에서 사용하면 된다.

Jest에서 **window.matchMedia** 에러가 발생하면 matchMedia를 잡아주면 된다.

```ts
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```
