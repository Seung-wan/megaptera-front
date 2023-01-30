# 학습 키워드

- Bundler(번들러)
  - Parcel
- Lint(린트)
  - ESLint

## Parcel

<aside>

[**Parcel 공식문서**](https://parceljs.org/)

</aside>

### Zero Configuration

- 특별한 설정 없이 바로 사용 가능한 빌드 도구. 내부적으로 SWC를 사용해 기존 도구보다 빠르다(ES Module을 적극 활용하는 Vite도 엄청나게 빠름).
- 참고:
  - [https://github.com/ahastudio/til/tree/main/parcel](https://github.com/ahastudio/til/tree/main/parcel)
  - [https://github.com/ahastudio/til/tree/main/vite](https://github.com/ahastudio/til/tree/main/vite)

### 아래 2가지 설정은 하는 게 좋다.

- `package.json` 파일에 source 속성 추가.

```json
"source": "./index.html",
```

- parcel-reporter-static-files-copy 패키지 설치 후 `.parcelrc` 파일 작성.  
  이렇게 하면 static 폴더의 파일을 정적 파일로 Serving할 수 있다(이미지 등 Assets).

```json
{
  "extends": ["@parcel/config-default"],
  "reporters": ["...", "parcel-reporter-static-files-copy"]
}
```

### 빌드 + 정적 서버 실행

```bash
npx parcel build

npx servor ./dist
```

- [servor](https://github.com/lukejacksonn/servor)

## ESLint

- 린트 또는 린터
- ESLint가 TSLint를 흡수했다.
- 스스로의 rules 만들기.

<aside>

[**ESLint 공식문서**](https://eslint.org/)

- [린트](<https://ko.wikipedia.org/wiki/린트_(소프트웨어)>)
- [정적 프로그램 분석](https://ko.wikipedia.org/wiki/정적_프로그램_분석)
- [Coding_conventions](https://en.wikipedia.org/wiki/Coding_conventions)

</aside>

무엇을 위해서?

- 스타일 통일
- 잠재적 문제 발견
- 베스트 프랙티스 추천 → 최신 트렌드를 학습하는데 활용할 수 있다.

[VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

`.vscode/settings.json` 파일을 추가해 JS/TS 파일을 저장할 때마다 ESLint를 실행하고 문제점을 고치게 설정할 수 있다.

```json
{
  "editor.rulers": [80],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "trailing-spaces.trimOnSave": true
}
```

아샬이 쓰는 VS Code 기본 세팅:

- [VS Code 기본 세팅](https://github.com/ahastudio/CodingLife/blob/main/20211008/react/.vscode/settings.json)
- [Trailing Spaces](https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces)

### StyleLint & Prettier

- 추가로 적용하기
