# 학습 키워드

- ReactRouter - RouterProvider

## 강의 정리

### Router

React Router 버전 6.4부터 라우터 객체를 만들어서 쓰도록 지원한다.  
실제로 페이지가 많아지게 되면, `App.tsx`가 상당히 비대해지는 경우가 있는데 라우터 객체를 활용하면 분리할 수 있다.

레이아웃을 잡으려면 Layout 컴포넌트를 만들고, 라우터 객체를 계층형으로 작성한다.  
`Outlet` 컴포넌트는 라우터 객체의 element가 렌더링 되는 위치다.

```ts
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

const routes = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
    ],
  },
];

export default routes;
```

```ts
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import routes from './routes';

const router = createBrowserRouter(routes);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
```

라우터 객체를 만드는 방식으로 변경하면 테스트 코드에도 변경이 생긴다.  
중복을 제거하기 위해서 테스트마다 path만 변경되기 때문에, path를 매개변수로 받는 renderRouter 함수를 하나 작성해서 사용한다.

```ts
describe('routes'', () => {
 function renderRouter(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
 }

 context('when the current path is “/”', () => {
  it('renders the home page', () => {
   renderRouter('/');

   screen.getByText(/Hello/);
  });
 });

 context('when the current path is “/about”', () => {
  it('renders the about page', () => {
   renderRouter('/about');

   screen.getByText(/About/);
  });
 });
});
```
