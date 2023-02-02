## 학습 키워드

- Jest
- Describe-Context-It 패턴
- React Testing Library

## Jest

<aside>

🚀 [**Jest 공식문서**](https://jestjs.io/)

거의 모든 것을 갖춘 테스팅 도구.

Mocha와 Chai처럼 RSpec의 describe-it을 지원하고(describe-context-it), expect로 단언(assertion)할 수 있다. Mocking도 다양한 레벨에서 쉽게 사용할 수 있다.

</aside>

- [BETTER SPECS](https://www.betterspecs.org/) → RSpec 베스트 프랙티스 모음. 그대로 쓸 수는 없지만, 참고하자.
- [Ginkgo - Go 언어 개발자를 위한 BDD 테스팅 프레임워크](https://youtu.be/gfTsSBRvdqI) (Go 언어 사례)
- [JUnit5로 계층 구조의 테스트 코드 작성하기](https://johngrib.github.io/wiki/junit5-nested/) \*\*\*\*(Java 언어 사례)
- [Let’s RSpec](https://github.com/ahastudio/til/blob/main/ruby/20161206-rspec-let.md) → Jest는 RSpec의 let 같은 걸 지원하지 않기 때문에, 핵심 아이디어를 가져와서 적당한 수준에서 잘 써야 한다.

- [Given-When-Then](https://www.notion.so/Given-When-Then-a5c37e9ad60b44f28cab5a2e5d784c98)

### 기본적인 테스트 코드

- 테스트 코드의 변화를 계속 반영하려면,
- npx jest --watchAll
- 테스트를 먼저 짜고 구현부를 만든다 -> TDD (Test Driven Development)

```ts
function add(x: number, y: number): number {
  return x + y;
}

test('add', () => {
  expect(add(1, 2)).toBe(3);
});
```

### BDD 스타일의 테스트 코드

- 표현력이 좋아지고, 고민할 기회를 제공해준다.
- 행동을 묘사한다.

```ts
describe('add', () => {
  it('returns sum of two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});
```

### context 사용하기 (D-C-I Pattern)

```ts
const context = describe;

describe('add 함수는', () => {
  context('두 개의 양수가 주어졌을 때', () => {
    it('두 숫자의 합을 돌려준다.', () => {
      expect(add(1, 2)).toBe(3);
    });
  });
});
```

- npx jest --verbose
  - 테스트 코드의 설명이 조금 더 자세하게 나온다

## React Testing Library

<aside>

- [**React Testing Library 공식문서**](https://testing-library.com/docs/react-testing-library/intro)

- [**jest-dom**](https://testing-library.com/docs/ecosystem-jest-dom/)

</aside>

UI 테스트에 특화된 라이브러리. 거의 E2E Test(PlayWright, Cypress)처럼 쓸 수 있다.

단, “F/E 테스트 = only React 컴포넌트 테스트”가 되는 상황은 최대한 피하는 게 좋다. 본질에 집중하지 못하고 너무 많은 테스트 코드를 작성할 위험이 있다. 유지보수를 돕기 위해 테스트 코드를 작성하는데, 테스트 코드를 잘못 작성하면 오히려 유지보수를 저해할 수 있다.

참고 영상:

- [프론트엔드(Front-end)도 테스트해야 하나요?](https://youtu.be/-kUmsKRmOnA)
- [Mocking 때문에 테스트 코드를 작성하기 어렵나요](https://youtu.be/RoQtNLl-Wko)

### 간단한 테스트 코드

```tsx
test('Greeting', () => {
  render(<Greeting name="world" />);

  screen.getByText('Hello, world!');

  screen.getByText(/Hello/);

  expect(sceen.queryByText(/Hi/)).not.toBeInTheDocument();
});
```

---

## 코딩을 하기 전에 해야 할 일

- 요구사항을 명확히 하는 것
  - 더하기를 만들 것인지, 곱하기를 만들 것인지
  - input으로는 시간을 받을 것인지, 분을 받을 것인지
- 명세를 명확하게 하기
  - 예제를 만든다.
  - 버그란 명세에 적힌대로 작동하지 않는 것, 명세에 정의되지 않은 것도 버그라고 볼 수 있다.
    - 버그를 잡기 제일 좋은 시점은 코딩을 하기 전, 명세를 보고 빠진 부분이 있는지 확인
- 명세를 따라 설계를 한다.
  - 아주 간단히 여러 단계로 쪼개기
  - 코딩을 하면서 배우게 된다. 설계가 맞았는지 틀렸는지.
  - 설계를 개선하게 된다, 개선된 설계에 따라 다시 코딩을 한다.

어떤 문제를 해결하려고 했었는지 요구사항을 명확하게 하는 것이 가장 중요하다. 요구사항 명세를 테스트 코드로 미리 작성해 놓으면 테스트 코드를 통과시키기만 하면 된다. 그리고 개선한다.  
무엇을 만들려고 하는지를 알고 그것에 필요한 것을 결정하고 이루어 지도록 만들기. 만드는 과정에서 여러가지 피드백을 얻는다. 여기서 배우는 것이다. 무엇이 잘못되었는지 찾아서 고치면 된다.  
**끊임없이 만드는 과정속에서 배우면 된다.**

---

## 내가 한 일 증명하기

내가 할 일을 남이 하게 만들지 말자. **테스트 코드**를 작성하자.  
팀마다 커버리지의 기준은 다르지만 테스트 커버리지 100%를 유지하면 정말 강력하다.  
내 일은 내가 완료하자.

---

## Ginkgo - Go 언어 개발자를 위한 BDD 테스팅 프레임워크

Ginkgo: Go언어용 BDD 테스팅 프레임워크  
BDD는 TDD의 한 갈래다.  
TDD는 Test First  
켄트백은 스텝 3개로 설명한다 (Red, Green, Refactor)
실패하는 테스트를 만드는 것을 어려워한다, 뭘 작성해야 할지 모르겠다.
버그란 무엇인가?

1945년 9월 9일 그레이스 호퍼(미국의 컴퓨터 과학자이자 미국 역사상 최초의 여성 해독 제독)가 하버드대학교에서 Mark2가 오작동하는 것을 발견, 컴퓨터 회로에 나방이 있었음

사람들은 누구나 실수를 한다, 어떻게 하면 버그를 줄일 수 있을까?
기계어로 프로그래밍을 해서 그렇다. 사람의 말처럼 개발을 하면 어떨까. 사람의 언어처럼 되어있는 것을 기계어로 바꾸는 것, 컴파일러 그래서 나온 것이 코볼(COBOL)이다. 코볼의 어머니.

소프트웨어에서 버그를 설명하는 말중에 하나를 꼽자면 기대하지 않은 것.
게임에서 점프를 눌렀는데 캐릭터가 자살한다면?

스펙, 사양은 명획히 하는게 소프트웨어에서 매우 중요하다.
소프트웨어가 스펙, 사양에 맞게 동작하는지 확인하는 것이 테스트하는 것.

테스트 코드를 작성하는 법은 우리 사양에 맞는지 맞지 않는지 작성하는 것.

- 점프 키를 누르면 점프를 해야 한다.

기능 목록을 만들면서 이것을 구현하면 된다.
기능이란 소프트웨어가 어떻게 동작하느냐, 행위

Behavior First, 행위를 먼저 작성하면 된다.
계산기에서 1 누르고 + 누르고 2 누르고 = 누르면 3이 나온다, 사양을 미리 정의해 놓는다.
사실은 TDD랑 같다, TDD라고 하면 대부분의 사람들은 잘 모른다. 표현을 바꿔서 이해를 돕는다.

Describe 'JUMP'

- It should push the hero off the floor
- It should put the hero in the air for 10 seconds

점프는 단순한데, 어떤 기능은 상황에 따라 굉장히 다르게 작동할 수 있다.

Describe 'ATTACK'

- Context 'without a weapon' It should do 1 point of damage
- Context 'with a sword' it should do 10 points of damage

D-C-I 패턴을 이용하여 테스트 코드를 작성하기  
테스트 코드의 의도가 더욱 명확히 드러난다.

describe 1개에 여러개의 context, 그 안의 결과를 표현하는 it

---

## TDD on Spring ~ 봄에는 TDD ~

TDD, 번역하면 테스트 주도 개발  
켄트백 - TDD by Example, TDD의 선구자다.  
OOP에서의 pattern을 제시했다.

실제로 개발을 하면서 어떤 문제들이 있을 때 해결 방법을 모아놓은 것이 XP(익스트림 프로그래밍)  
몇가지 Practices들이 나온다.

Test First Programming, 어떻게 하는가?  
일단 실패를 시킨다.  
다음엔 해결을 한다.  
그리고 개선을 한다.

개발자는 Problem Solving, 문제를 해결한다.  
일정한 Goal이 있다.

- 진짜로 해냈나?
- 어떻게 알 수 있나?

어떻게 하면 진짜로 했는지 알 수 있나?

- 증거가 있어야 한다.
  - 진짜로 다 헀어요?
  - 문제 없는거죠?

하루를 작업해서 만들어낸 코드지만, 문제가 있으면 100일 동안 삽질을 하게 된다.
이틀 작업을 하더라도 나중에 삽질을 하지 않는다면 훨씬 낫지 않을까?

개발을 진행하고 서비스를 런칭하기 전에 확인해보니 버그가 너무 많다.  
차라리 다시 만드는게 더 빠를 것 같아 다시 만든적도 있다.  
이런 것을 기술부채라고 한다.

목표를 어떻게 세우면 좋나? SMART하게 세울 것.

1. Specific (구체적)
2. Measurable (측정 가능)
3. Attainable (달성 가능)
4. Realistic (현실적)
5. Timely (기간)

목표를 쓰기, 이 목표들을 잘게 나눠서 목록으로 만들기. 그리고 하나씩 실행하기(CHECK LIST)

목표란, 지금은 안되는 것 -> 실패를 의미한다.  
기를쓰고 어떻게 해서든 되게 해야 한다. 일단 되게 하라.

아무렇게가 아니라 제대로 작동하도록 한다.  
방법이 아니라 올바른 결과가 중요하다.
해결이 된 다음에는 그대로 깔끔하게 고쳐라.
작동하기 위해 비열한 방법을 썼기 때문에

개선을 할 때 중요한 것은 버그를 만들어 내면 안된다.  
그대로 개선을 하는 것 -> 이전에 만들었던 테스트를 통과하는 것  
언제나 항상 제대로 작동하도록 하는것이 핵심이 된다.

테스트 코드를 먼저 짜야 문제가 안생긴다.  
기술 부채에 대해서도 대응할 수 있다.

~ 08:24
