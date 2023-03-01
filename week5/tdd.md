# 학습 키워드

- TDD란
- Jest
- Describe - Context - It 패턴
- 단위테스트란

## 강의 정리

### TDD (Test Driven Development)

프론트엔드에서의 TDD. Jest, RTL. 테스트 주도 개발.  
테스트를 추가하고, 실패시키고, 테스트를 통과하는 코드를 짠다.  
그리고 중복을 줄인다.

구현부보다 테스트 코드를 먼저 작성한다. 자동화된 테스트를 만들기 위해 작성한다.  
구현보다 인터페이스와 스펙을 먼저 정의함으로써 개발을 진행하는 방식.

테스트 코드는 인터페이스를 작성하는 것.

```js
// 이것은 엄밀히 말하면 시그니처, 이런 것들을 모아놓은 것이 인터페이스다.
add(x, y) -> number
```

TDD라는 것은 계속해서 반복하는 것.  
일정 수준에 다다를때까지 반복을 한다. (기준 이상의 코드 퀄리티가 나올때 까지)  
켄트백은 Green을 만들기 위해 죄악을 행해도 괜찮다고 한다.

TDD Cycle

1. Red -> 실패하는 테스트 코드를 작성. 인터페이스와 스펙에 집중한다.
2. Green -> 재빨리 테스트를 통과시킨다. 올바른 방법이 아니어도 괜찮다. Stub을 활용하여 가짜로 해도 된다.
3. Refactor -> 리팩터링을 통해 코드를 올바르게 만든다. TDD에서 가장 중요한 부분이지만, 간과될 때가 많다.

처음부터 완벽한 해법을 내려고 하면 굉장히 어렵다.  
테스트를 빠르게 통과시키고 리팩토링을 한다.  
리팩토링은 동작을 바꾸지 않고 내부 설계를 바꾸는 것.  
1분 이하로 한 싸이클을 돌릴 수 있으면 좋다, 길어도 10분 이내  
1번에서 2번으로 가는 시간이 오래걸리면 1번을 너무 복잡하게 작성한 것일수 있다.  
3번을 위해 의도를 드러내고 중복을 찾아 제거하는 연습을 해야한다.  
이 과정이 익숙해야 TDD를 할 수 있다.  
도구를 쓸 줄 알아야 테스트 코드를 작성할 수 있으니 도구에 대해 알아볼 것.

### Jest

페이스북에서 만든 테스트 라이브러리  
쓸만하다 싶은 것들은 다 들어있고 사용법도 단순하다.

테스트 케이스를 정의할 때 크게 두 가지 방법을 사용한다.

1. test 함수로 개별 테스트를 나열하는 방식
2. BDD 스타일로 주체-행위 중심으로 테스트를 조직화하는 방식.

테스트 파일을 작성할 때 BDD 스타일로 하면 보통 `App.spec.ts`와 같이 spec을 많이 넣는다.

테스트 코드를 넣고, 고치고 싶을 만큼 구현부 코드를 계속 고친다, 리팩토링한다.

```ts
function add(...numbers: number[]): number {
  if (numbers.length === 0) {
    return 0;
  }
  return numbers.reduce(acc, (number) => {
    return acc + number;
  });
}

test('add', () => {
  expect(add(1, 2)).toBe(3);
});

const context = describe;

describe('add', () => {
  context('with no argument', () => {
    it('returns zero', () => {
      expect(add()).toBe(0);
    });
  });

  context('with only one number', () => {
    it('returns the same number', () => {
      expect(add(1)).toBe(1);
    });
  });

  context('with two numbers', () => {
    it('returns sum of two numbers', () => {
      expect(add(1, 2)).toBe(3);
    });
  });

  context('with three numbers', () => {
    it('returns sum of three numbers', () => {
      expect(add(1, 2, 3)).toBe(6);
    });
  });
});
```
