# 학습 키워드

- HTML DOM API
  - Location
  - pathname

## 강의 정리

### Routing

네트워크 에서의 라우팅이란, 통신 데이터를 보낼 때 최적의 경로를 선택하는 과정이다.  
웹에서의 라우팅이란 사용자가 요청한 URL에 따라서 적절한 페이지를 보여주는 것

라우팅은 일반적인 웹사이트를 만들게 될 때 필수적으로 사용하게 된다.  
리액트에서는 URL에 따라 적절한 컴포넌트(페이지)가 보이게 하는 방식으로 구현한다.

window 객체에 location이라는 객체가 있다.

- location.pathname
- location.host: 포트 번호까지 나온다.
- location.hostname
- location.hash

URL의 한글은 인코딩이 된다.   
인터넷을 통해서 전송할 수 있는 문자는 ASCII 문자이기 때문에, 한글은 인코딩을 해줘야 한다.


```ts
const pages :Record<string, React.FC> = {
  '/': HomePage,
  '/about': AboutPage
}

function App() {
  const path = window.location.pathname;

  const Page = pages[path] || HomePage
  // const Page = Reflect.get(pages, path) || HomePage

  return (
    <div>
      <Header/>
      <main>
        <Page/>
      </main>
      <Footer/>
    </div>
  );
}
```
