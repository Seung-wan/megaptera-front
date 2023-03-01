# 학습 키워드

- Service worker
- MSW(Mock Service Worker)
- polyfill(폴리필)

## 강의 정리

### MSW (Mock Service Worker)

service worker는 원래 브라우저에서 쓸 수 있는 것  
원래는 오프라인 작업을 지원하기 위해 많이 사용된다.  
지금까지 작성했던 것은 코드 레벨에서 모킹하고 했지만, MSW는 네트워크 레벨에서 프록시를 이용해서 가짜로 해주는 것.

setupTests.ts 파일 작성

```ts
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '<rootDir>/src/setupTests.ts',
  ],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            jsx: true,
            decorators: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
};
```

src/setupTests.ts 파일 작성

```ts
import server from './mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());
```

src/mocks/server.ts 파일 작성

```ts
import { setupServer } from 'msw/node';

import handlers from './handlers';

const server = setupServer(...handlers);

export default server;
```

src/mocks/handlers.ts 파일 작성

```ts
import { rest } from 'msw';

const BASE_URL = 'http://localhost:3000';

const handlers = [
  rest.get(`${BASE_URL}/products`, (req, res, ctx) => {
    const products = [
      {
        category: 'Fruits',
        price: '$1',
        stocked: true,
        name: 'Apple',
      },
    ];

    return res(ctx.status(200), ctx.json({ products }));
  }),
];

export default handlers;
```

App.test.ts 파일 수정

```ts
import { render, screen, waitFor } from '@testing-library/react';

import App from './App';

// jest.mock 불필요.

test('App', async () => {
  render(<App />);

  await waitFor(() => {
    screen.getByText('Apple');
  });
});
```

너무 디테일하게 개발하면 사실상 백엔드를 개발하게 된다.  
적당한 선을 지켜서 활용해야 한다.
