# 학습 키워드

- 회원 가입

## 강의 정리

### 회원 가입

회원가입을 하게 되면 서버에서는 응답값으로 Access Token을 클라이언트에 넘겨줘야 한다.  
회원가입 Form을 SignupFormStore에서 관리한다.  
SignupFormStore를 사용하기 위해 `useSignupFormStore` Custom Hook을 만든다.  
Form은 많이 다뤄보는 게 중요하다. useInput과 같은 커스텀 훅. 제어 컴포넌트와 비제어 컴포넌트. React-Hook-Form과 Formik

회원 가입이 완료되면 메인 페이지로 보내지 않고, 회원 가입 완료 페이지로 보내준다. UX적으로 이런 접근이 더 좋아 보이기도 한다.
