# 학습 키워드

- 어드민 개발

## 강의 정리

### 어드민 페이지 기능

실제로 쇼핑몰을 관리하는 어드민은 더욱 많은 기능들이 필요하지만, 아래 내용에 대해 다룰 것.

- 로그인
- 로그아웃
- 회원 관리
- 카테고리 관리
- 상품 관리
- 주문 관리

어드민 홈(/) 화면에서는 대시보드등 상의를 해서 내용을 넣으면 좋다.  
쇼핑몰 만들다보면 실제로 제일 복잡한 것이 주문이다.  
CS 문의를 해결할 때 주문 상태 변경을 많이 하게 된다. 배송지 수정, 송장 번호 입력 등 잘 다룰 수 있게 만들어야 한다.

상태 관리를 프론트에서 하지 말고, 백엔드에서 하자. 백엔드에 비중을 더 많이 두는 방식으로 어드민을 구현할 것.

react-hook-form을 사용할 것. 제어 컴포넌트와 비제어 컴포넌트 모두 지원한다.