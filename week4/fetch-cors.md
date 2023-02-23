# 학습 키워드

- Fetch API 란
- Promise
- ReadableStream
- Unicode
- CORS 란

## 강의 정리

### Fetch API란

웹 브라우저에서 쓰는 것

XMLHttpRequests를 추상화 시켜놓은 것이 axios다.  
Fetch를 추상화 시켜 놓은 것은 ky이다.

http client로 어떤 라이브러리를 사용하는 게 좋을까?  
고민을 해보면 재밌을 것 같다. toss에서는 @toss/ky를 오픈소스 라이브러리로 발표했는데 왜 ky를 선택했을까?

Fetch는 서버와 통신을 하는 것이기 때문에 그대로 사용하면 Promise 객체가 pending인 상태라서 값을 바로 받아올 수 없다.
then 메소드 혹은 async/await 문법을 사용하여 비동기 처리가 끝난 후의 값을 받아와야 한다.

```ts
// response의 body에는 ReadableStream 형태의 값이 들어있다.
const response = await fetch('http://localhost:3000/products');

// reader를 얻는다.
const reader = response.body.getReader();

// chunk의 value값에는 Uint8Array 형식의 바이트 값이 들어있다.
// chunk는 value와 done을 key로 갖고 있는 객체인데, done이 true가 될 때까지 읽어야 한다.
// 내부적으로 Generator로 구현이 되어 있는 것 같다.
const chunk = await reader.read();

// chunk의 value는 byte array기 때문에 string으로 바꿔주고 싶다.
// decode를 한 것을 JSON.parse 해주면 우리가 원하는 값이 들어오게 된다.
JSON.parse(new TextDecoder().decode(chunk.value));
```

실제로는 JSON을 기본적으로 지원하기 때문에 복잡하게 하지 않아도 된다.

```ts
const response = await fetch('http://localhost:3000/products');
const data = await response.json();
```

기본적으로 fetch에 첫번째 매개변수로 url만 넣게 되면 GET 요청을 하게 된다.  
다른 HTTP Method를 사용하고 싶으면 option을 지정해준다.

```ts
const response = fetch(url, {
  method: 'POST',
});
```

React에서 fetch 사용하기

```ts
const url = 'http://localhost:3000/products';
const response = await fetch(url);
const data = await response.json();
const { products } = data;
```

CORS(Cross-Origin Resource Sharing) 에러가 발생한다.  
웹 브라우저가 기본적으로 가지고 있는 보안 정책이다.  
SOP(same-origin policy)는 동일한 출처에서만, 같은 곳에서 얻어지는 것만 사용해야 한다는 원칙이다.  
서로 다른 출처일 때, 서버에서 얻은 정보를 사용할 수 없게 막는다.

주의할 점은 서버에 요청이 갔고, 서버가 응답을 해줬지만 브라우저에서 동일 출처가 아니기 때문에 막는 것이다.  
생성을 하거나 업데이트를 하면 CORS에러가 뜨더라도 진행이 된 것이다.

REST API 서버에서 Headers에 'Access-Control-Allow-Origin' 속성을 추가하면 된다.  
실제로 CORS 설정을 복잡하게 할 수 있지만, \*을 이용하여 기본적으로만 설정할 것.  
cors 라이브러리를 설치하여 Express 앱에서 CORS 세팅을 한다.

```ts
app.use(cors());
```

백엔드 api 형식을 조금 수정하고 싶다거나, 스케쥴의 문제로 아직 api가 나오지 않았다면 기다리지 말고 정적인 것도 괜찮으니  
간단하게 구성해서 진행할 수도 있다. 실제로 Express를 이용해서 로컬에서 서버를 구성하면 조금 비용이 들 것 같고  
더미 데이터나 MSW를 이용하면 좋을 것 같다.

---

### CORS

같은 출처인지 다른 출처인지 구분하는 조건은 3가지 요소다.  
Scheme, Host, Port  
`https://megaptera.kr`를 예로 들면,  
Scheme은 https://
Host는 megaptera.kr  
Port는 https이기 때문에 443이다

CORS가 동작하는 방식은 세 가지의 경우가 있다.

1. Preflight Request
   1. 예비 요청과 본 요청을 나누어서 서버에 전송한다.
   2. OPTIONS 메소드를 이용하여 예비 요청을 보내게 되는데 이때 CORS 정책을 위반했는지 판단한다.
2. Simple Request
   1. 예비 요청을 보내지 않고 바로 서버에 요청을 보내는 방식이다.
   2. 특정 상황에서만 발생하고, 조건이 매우 까다롭다.
3. Credentialed Request
   1. 쿠키와 같은 인증 정보를 헤더에 포함하는 방식이다.
   2. credentials 옵션을 사용하는데, 이때 서버에서도 이에 맞는 설정을 해줘야 한다.

CORS를 해결하기 위해서는 크게 2가지 방법이 있다.

1. 먼저 서버에서 Access-Control-Allow-Origin 세팅을 해준다.  
   Node.js 기반 서버 프레임워크(Express, NestJS등)에서는 Cors 라이브러리를 이용한다.

2. 프론트단에서 프록시 서버를 둔다.
