# 학습 키워드

- className
- 의미있는 마크업

## 강의 정리

### Basic: Class

일반적으로 HTML에 스타일링을 적용할 때는 class를 활용한다. React에서는 class가 예약어이기 때문에 className으로 사용한다.  
id는 HTML 문서에 1개만 들어가야 한다, 중복이 되면 웹 표준을 지키지 못한 것이다.  
css에서 쓰이는 class는 객체 지향에서와 비슷하게 카테고리, 그룹을 의미한다. 하지만 class는 그 자체로서의 뉘앙스가 있다. 

styling을 하는 방법이 여러가지가 있지만, tailwind 방식의 class를 나열하는 방식은 의미있는 웹표준, 마크업 관점에서는 좋지 않다. menu라는 태그라고만 알면 되는데, font-lg, mt-4, text-white와 같이 style이 나열되기 때문이다. 또한 HTML에 CSS가 분리되어 있지 않는 느낌이다.

tailwind creator의 트윗을 보니 전통적인 CSS 접근 방식은 UI 변경을 위해 2개의 파일을 변경해야 하는데, tailwind는 하나의 HTML 파일만 변경하면 된다는 것을 보고 다시 생각해볼 수 있었다.  
[tailwind의 관심사분리에 대한 creator의 트윗](https://twitter.com/adamwathan/status/1137406799420821506)

### Basic: Inline Style

style 속성을 활용한다. TypeScript 덕분에 자동완성, 타입 검사가 가능하다.  
실제로 사용한다면 경우에 따라서 useMemo를 활용하여 리렌더링을 방지해야할 수도 있을 것 같다.
