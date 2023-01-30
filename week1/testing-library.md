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
