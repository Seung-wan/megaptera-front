# 학습 키워드

- 라우터란?
- React Router
  - Browser Router
  - Route
  - Memory Router

## 강의 정리

### React Router

```ts
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
```

BrowserRouter를 잡아줘야 한다.  
테스트를 하기 위해 main.tsx에서 잡아준다.

```ts
import { BrowserRouter } from 'react-router-dom';

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

테스트 코드에서 라우터를 테스트하려면 메모리 라우터를 사용한다.  
라우터의 초기 위치를 잡아주기 위해 MemoryRouter의 initialEntries props를 활용한다.

```ts
describe('App', () => {
  function renderApp(path: string) {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );
  }

  context('when the current path is “/”', () => {
    it('renders the home page', () => {
      renderApp('/');

      screen.getByText(/Hello/);
    });
  });

  context('when the current path is “/about”', () => {
    it('renders the about page', () => {
      renderApp('/about');

      screen.getByText(/About/);
    });
  });
});
```
