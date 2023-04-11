/**
 * 볼링 경기 한 게임은 10개의 프레임(frame)으로 이루어진다.
 * 선수는 공을 굴려서(roll) 나무 핀 10개를 쓰러트려야 하는데 기회는 두 번이다.
 * 공으로 쓰러트린 핀의 수가 그 공의 투구 점수다.
 * 첫 번째 공으로 10개의 핀을 모두 쓰러트렸다면 스트라이크(strike)라고 부른다.
 * 공 두 개를 다 써서 10개의 핀을 모두 쓰러트렸다면 스페어(spare)라고 부른다.
 * 도랑(gutter)에 빠진 공은 0점이다.
 * 프레임에서 스트라이크가 나오면 점수는 10점에 그다음 투구 2회의 점수를 더한 것이다.
 * 프레임을 스페어로 처리하면 점수는 10점에 그다음 공의 투구 점수를 더한 것이다.
 * 스트라이크나 스페어가 아니면 해당 프레임 투구 2회에서 쓰러트린 핀의 개수가 점수다.
 */

/**
 * Frame
 *  score(): int
 * Roll
 *  pins: int
 * Game
 *  roll(pins: int)
 *  score(): int
 */

class Game {
  score = 0;

  roll(pins) {
    this.score = this.score + pins;
  }

  get score() {
    return this.score;
  }
}

describe('Game', () => {
  let g;

  function setup() {
    g = new Game();
  }

  beforeEach(() => {
    setup();
  });

  test('gutterGame', () => {
    for (let i = 0; i < 20; i += 1) {
      g.roll(0);
    }

    expect(0).toBe(g.score);
  });

  test('allOnes', () => {
    for (let i = 0; i < 20; i += 1) {
      g.roll(1);
    }

    expect(20).toBe(g.score);
  });
});
