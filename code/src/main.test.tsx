function add(x: number, y: number): number {
  return x + y;
}

const context = describe;

describe('add 함수는', () => {
  context('두 개의 양수가 주어졌을 때', () => {
    it('두 숫자의 합을 돌려준다.', () => {
      expect(add(1, 2)).toBe(3);
    });
  });

  context('하나의 양수와 음수가 주어지면', () => {
    it('항상 하나의 양수보다 작은 값을 돌려준다', () => {
      expect(add(1, -2)).toBeLessThan(1);
    });
  });
});
