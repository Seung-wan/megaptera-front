# 학습 키워드

- 로그인

## 강의 정리

### 로그인

로그인과 같은 처리가 웹 서비스에서 필요한 이유는 사용자를 구분하기 위해서. 쇼핑몰의 경우에는 장바구니, 주문 목록등을 개별적으로 제공하기 위해서 사용한다.  
로그인이라는 것은 사용자의 username, password를 이용해서 인증하는 방식이다. username은 unique한 것을 나타내고 password는 그래서 그 unique한 것의 주인이라는 것을 나타낸다. http는 stateless하기 때문에 로그인에 성공해도, 다음 요청시에는 로그인을 해서 인증이 되었다는 것을 증명할 수 없다. 그렇게 되면 페이지를 이동할 때 마다 로그인을 해야하는 문제가 생길수도 있다. 따라서 로그인을 통해 최초로 인증이 되고 나면, 그 후에는 AccessToken이라는 것을 http 요청에 사용하여 인증 된 상태라는 것을 증명한다. 보통 JWT를 많이 사용한다.

로그인을 구현하는 방식에는 무엇이 있는가?  
jwt, session, OAuth 2.0 등의 방식에 대해 각각 정확하게 정리하기.

- 토큰 방식
- 세션 방식

LoginPage에서는 AccessToken이 들어오면, 로그인에 성공하게 되면 /으로 redirection한다.

useAccessToken 훅과 useLoginFormStore 훅이 핵심이다.

원래는 Login Form은 validation 처리를 디테일하게 해주면 좋다.  
기본적으로 이메일은 정규표현식으로 검증한다.

로그인 페이지에서 이메일을 입력했다가, 다른 페이지로 갔다가 다시 로그인 페이지로 넘어왔을 때 기존에 입력했던 값이 남아있으면 안되기 때문에  
useEffect에서 컴포넌트가 마운트되었을때 store를 초기화해준다.

로그인에 성공해서 다른 페이지로 redirect 시켜줄 때도 store를 초기화해준다.  
만약 store를 초기화해주지 않고 다시 로그인 페이지에 들어오게 되면 리액트 컴포넌트의 실행 순서에 따라서 로그인 했을때의 데이터가 잠깐 남아있을 것 같다.

JWT를 store와 localStorage에 함께 관리한다.

서비스에서는 로그인 성공 유무에 따라서 바뀌어야 하는 View가 있다.  
로그인이 되어 있으면 Cart, Logout 텍스트를, 로그인이 되어있지 않으면 Login 텍스트를 보여준다.
