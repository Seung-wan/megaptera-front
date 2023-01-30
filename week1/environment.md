# 학습 키워드

- Node.js
- NPM(Node Package Manager)
  - package.json / package-lock.json
  - node_modules
  - npx
- ES Modules vs CommonJS

## 강의 정리

### 개발환경 세팅

Node.js로 개발을 한다. toolchain이라고 부르는 개발 환경, 도구들의 모음을 Node.js로 쓴다.  
Deno를 사용하면 훨씬 간단하지만, 대부분의 서비스들은 Node.js로 구축되어 있기 때문에  
Node.js 기반으로 세팅을 할 것.
하지만 Node.js를 통한 개발 환경 세팅은 생각보다 까다롭다.

어려운 이유는 도구가 계속 변화하기 때문이다. 새로운 도구가 나오면 그곳으로 쏠리고 계속 변화한다. 여기에서는 전체적인 흐름을 다룬다 새로운 도구가 나오면 이렇게 써봐야지, 이런건 이러한 문제를 해결하려고 나왔구나 등의 접근을 해보는 것이 좋다.
지금의 세팅도 나중에는 조금씩 달라질 것이다. 바뀐 부분이 있으면 문서를 찾아서 업데이트 하면 되고 새로운 도구를 선택할 수도 있다.

### JavaScript 개발 환경 (Node.js) 세팅

사실 Node.js 세팅이다
nvm을 쓰다가 최근에는 fnm을 쓴다. nvm보다 빠르다  
(volta를 원래 사용했었는데 fnm도 확인하기)  
node.js 페이지에서 버전을 확인할 수 있다.

공식문서는 영어가 업데이트라던가 조금은 더 빠를 수 있다.  
개인적으로는 영어로 보는 것을 좋아한다.

LTS (Long Term Support)

노드 버전 앞이 홀수인 것은 최신버전, 짝수인 것은 LTS 버전

### TypeScript + React + Jest + ESLint + Parcel(번들러, 빌드 도구, 만능 도구) 개발 환경 세팅

작업 폴더 준비

- mkdir my-all
- cd my-app

편집기(VSCode) 열기

- code .

npm 패키지 준비

- npm init -y
- name은 kebab-case
- version은 semantic versioning

.gitignore 세팅

- touch .gitignore
- node_modules/
- dist/
- github/gitignore 혹은 vscode에서 .gitignore을 생성하면 편리하다.

타입스크립트 설정

- npm i -D typescript
  - -D 옵션은 package.json의 devDependencies에 설치된다.
  - 개발 환경에서만 사용되는 툴
  - 과거에는 npm i --save-dev
- npx tsc --init
  - node_modules/.bin/tsc --init 명령어와 같다.
  - npx는 node_modules에 해당하는 패키지가 설치되어 있으면 찾아서 실행하고, 만약 설치되어 있지 않더라도 npm 패키지들을 캐시하는 곳에 다운로드를 받아서 설치하지 않아도 사용할 수 있도록 해준다.
    - macOS의 경우에 ~/.npm/\_npx 에 존재한다.
  - "jsx" : "react-jsx" 설정을 맞춰준다.

ESLint 설정

- npm i -D eslint
- npx eslint --init
- env에 jest:true를 미리 잡아줄 것.
- .eslintignore 작ㅎ

리액트 설치

- npm i react react-dom
- npm i -D @types/react @types/react-dom

테스팅 도구 설치

- npm i -D jest @types/jest @swc/core @swc/jest \
   jest-environment-jsdom \
   @testing-library/react @testing-library/jest-dom

jest.config.js 설정

- 성능을 위해 테스트에서 SWC를 사용할 수 있도록 세팅

Parcel 설치

- npm i -D parcel
- package.json scripts 수정
