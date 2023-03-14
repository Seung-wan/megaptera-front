# 학습 키워드

- Web APIs - History
- React Router - NavLink, Link, Navigate, useNavigate

## 강의 정리

### Navigation

SPA 어플리케이션에서는 html을 하나만 사용하기 때문에, 링크를 클릭하면 url의 주소만 바뀌고 실제로 서버에 html파일을 요청할 필요가 없다.  
따라서 a 태그를 이용하여 네비게이션을 하는 방식이 아닌 History 객체의 pushState를 이용한다.

```ts
const state = {};
const title = '';
const url = '/about';

history.pushState(state, title, url);
```

React Router에서는 이와 같은 기능을 추상화해놓은 Link 컴포넌트가 있다.

```ts
function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
```

Link 컴포넌트외에 NavLink 컴포넌트도 존재하는데 NavLink 컴포넌트를 사용하면 현재 위치한 페이지의 Link 태그에 active라는 class가 붙는다.  
GNB, LNB등에서 스타일 처리를 해줄때 유용하다.

```ts
function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
```

Navigate 라는 컴포넌트도 있는데 redirect를 시켜준다.  
LogoutPage에 가면, 바로 `'/'` 경로로 redirect 된다.

```ts
import { Navigate } from 'react-router-dom';

export default function LogoutPage() {
  return <Navigate to="/" />;
}
```

Navigate 컴포넌트를 사용하는 LogoutPage를 테스트하려고 하면 `ReferenceError: Request is not defined` 라는 에러와 함께 테스트가 죽을때가 있는데 이때는 `whatwg-fetch`를 `setupTest.ts` 파일에서 import 해주면 된다.

`useNavigate` 라는 Hook으로 특정 상황에 navigate 시켜줄 수 있다.

```ts
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/about');
  };

  return (
    <footer>
      <button type="button" onClick={handleClick}>
        Press
      </button>
    </footer>
  );
}
```
