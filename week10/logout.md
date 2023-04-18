# 학습 키워드

- Access Token 확인
- 로그아웃

## 강의 정리

### Access Token 확인

GET /users/me API를 사용하여 로그인한 회원 정보를 얻는다.  
Access Token을 확인하여 응답값을 준다.

`useCheckAccessToken` 이라는 Custom Hook을 만든다. async/await으로 비동기를 처리하는 경우에는 try-catch 구문으로 에러 핸들링을 해줘야 한다.  
axios에서는 응답 코드가 200번대가 아니면, catch 구문을 탄다.  
토큰을 체크하는 것은 사이트를 접속할 때 마다 실행해줘야 하는데 이러한 장소는 `Layout` 컴포넌트다. Access Token이 유효하지 않으면 localStorage의 Access Token값을 날려준다.

로그아웃을 할 때도 로그아웃 API를 호출해준다. 현재 사용하고 있던 Access Token 자체를 만료시켜버린다.  
이 과정에서 localStorage에서도 제거해주는데, 만약 Access Token을 복사해놨다가 다시 localStorage에 임의로 넣고 서버에 요청을 보낸다고 해도, 로그아웃 API를 실행했기 때문에 유효하지 않다.
