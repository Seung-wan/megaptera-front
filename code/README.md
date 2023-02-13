# frontend-survival-week01

프론트엔드 생존코스 1주차 과제

## React + TypeScript + Jest + Eslint + Parcel 개발 환경 세팅

### 1. 터미널에서 작업할 폴더를 준비합니다

```bash
mkdir my-app
cd my-app
```

### 2. 본인이 사용하는 편집기를 실행합니다

```bash
# VSCode
code .

# Webstorm
webstorm .
```

### 3. npm 패키지를 준비합니다

```bash
npm init -y
```

### 4. gitignore 파일을 작성한다

VSCode를 사용하고 있다면, command(alt) + shift + p를 누르고 `add gitignore`를  
검색하면 언어에 맞는 .gitignore 파일을 생성할 수 있다.

직접 세팅하려면 아래와 같이 파일을 생성하고 파일 및 폴더를 추가한다.

node_modules, .env 파일등 원격 저장소에 올라가면 안되는 것들을 작성해준다.

```bash
touch .gitignore
```

### 5. TypeScript를 설치합니다

개발 환경에서만 사용되는 것들은 -D 옵션을 붙여 설치하게 됩니다.  
해당 패키지는 package.json의 devDependencies 내부로 들어가게 됩니다.

```bash
npm i -D typescript
```

TypeScript를 컴파일하는데 필요한 tsconfig.json파일을 생성합니다.

```bash
npx tsc --init
```

기본적으로 세팅된 tsconfig.json 옵션을 사용하고,  
.tsx 파일을 사용하기 위해 jsx 옵션만 설정해줍니다.

```ts
  "jsx": "react-jsx" /* Specify what JSX code is generated. */,
```

### 6. ESLint를 설치합니다

VSCode Extension에서 ESLint도 같이 설치해줍니다.

```bash
npm i -D eslint
```

설치가 완료되면 eslint 옵션을 세팅하기 위해 아래 명령어를 입력합니다.

```bash
npx eslint --init

You can also run this command directly using 'npm init @eslint/config'.

# 화살표의 옵션을 선택합니다.
? How would you like to use ESLint? …
  To check syntax only
  To check syntax and find problems
❯ To check syntax, find problems, and enforce code style

? What type of modules does your project use? …
❯ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these

? Which framework does your project use? …
❯ React
  Vue.js
  None of these

# yes 선택
? Does your project use TypeScript? › No / Yes

? Where does your code run? …  (Press <space> to select,
<a> to toggle all, <i> to invert selection)
✔ Browser
  Node

? How would you like to define a style for your project? …
❯ Use a popular style guide
  Answer questions about your style

# Airbnb 가이드 선택
? Which style guide do you want to follow? …
❯ Airbnb: https://github.com/airbnb/javascript
  Standard: https://github.com/standard/standard
  Google: https://github.com/google/eslint-config-google
  XO: https://github.com/xojs/eslint-config-xo

? What format do you want your config file to be in? …
❯ JavaScript
  YAML
  JSON


Checking peerDependencies of eslint-config-airbnb@latest
The config that you have selected requires the following dependencies:

eslint-plugin-react@^7.28.0 @typescript-eslint/eslint-plugin@latest
eslint-config-airbnb@latest eslint@^7.32.0 || ^8.2.0
eslint-plugin-import@^2.25.3 eslint-plugin-jsx-a11y@^6.5.1
eslint-plugin-react-hooks@^4.3.0 @typescript-eslint/parser@latest

# Yes 선택
? Would you like to install them now with npm? › No / Yes
```

추후에 Jest를 설치할 것이기 때문에 미리 .eslintrc.js 파일에 jest 관련 설정을 추가해줍니다.

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    // jest 추가
    jest: true,
  },

  ...

}
```

.eslintignore 파일을 생성하고 아래와 같이 작성해줍니다.  
해당 파일에 작성된 파일은 린트룰을 무시하게 됩니다.

```text
/node_modules/
/dist/
/.parcel-cache/
```

### 7. 리액트를 설치합니다

```bash
npm i react react-dom
npm i -D @types/react @types/react-dom
```

### 8. 테스팅 도구(Jest)를 설치합니다

```bash
npm i -D jest @types/jest @swc/core @swc/jest \
    jest-environment-jsdom \
    @testing-library/react @testing-library/jest-dom
```

jest.config.js 파일을 작성해 테스트에서 SWC와 TypeScript를 사용할 수 있게 합니다.

```bash
touch jest.config.js
```

jest.config.js 파일 안에 아래의 설정을 추가해줍니다.

```text
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            jsx: true,
            decorators: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
};

```

### 9. Parcel을 설치합니다

```bash
npm i -D parcel
```

### 10. package.json의 scripts를 아래와 같이 수정합니다

start: 개발환경에서 808 포트로 서버를 시작합니다.  
build: 프로젝트 코드를 빌드합니다.  
check: 컴파일 결과를 뱉지 않고 타입만 체크합니다.  
lint: .js, .jsx, .ts, .tsx 확장자를 가진 파일에 ESLint를 실행합니다.  
test: jest를 이용한 test를 실행합니다.
coverage: 테스트 커버리지를 확인합니다.
watch:test: 테스트 파일을 수정할 때 마다 jest를 실행합니다.

```json
"scripts": {
  "start": "parcel --port 8080",
  "build": "parcel build",
  "check": "tsc --noEmit",
  "lint": "eslint --fix --ext .js,.jsx,.ts,.tsx .",
  "test": "jest",
  "coverage": "jest --coverage --coverage-reporters html",
  "watch:test": "jest --watchAll"
},
```

### 11. 프로젝트 파일 구성

프로젝트 root 폴더에 index.html 파일을 생성하고, 임의의 내용을 작성합니다.

```bash
touch index.html
```

```html
<!-- index.html -->
This is .html file!!!
```

서버를 시작하기 전에 package.json에 entry가 되는 html 파일의 경로를 추가해줍니다.

```json
{
  "name": "react-boilerplate",
  "version": "0.1.0",
  "description": "React-TypeScript-Jest-Eslint-Parcel",
  "source": "index.html",

  ...

}
```

`npm run start` 명령어를 터미널에 입력하고 브라우저에 주소창에 localhost:8080을 입력하면  
`This is .html file!!!` 라는 텍스트를 확인할 수 있습니다.

index.html 파일을 아래와 같이 다시 작성합니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React BoilerPlate</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

eslint-config-airbnb-typescript를 설치해줍니다.

```bash
npm i -D eslint-config-airbnb-typescript
```

.eslintrc.js 파일에도 rule을 추가해주겠습니다.

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    curly: 'error',
    'no-trailing-spaces': 'error',
    'brace-style': 'error',
    'no-multi-spaces': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'no-whitespace-before-property': 'error',
    'func-call-spacing': 'error',
    'space-before-blocks': 'error',
    'keyword-spacing': ['error', { before: true, after: true }],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last'],
    'comma-dangle': ['error', 'always-multiline'],
    'space-in-parens': ['error', 'never'],
    'block-spacing': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'key-spacing': ['error', { mode: 'strict' }],
    'arrow-spacing': ['error', { before: true, after: true }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          '**/*.test.jsx',
          '**/*.test.ts',
          '**/*.test.tsx',
        ],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
  },
};
```

이제 리액트 파일을 작성해봅니다.

```bash
mkdir src
touch src/main.tsx
```

index.html 파일에 script를 추가하여 main.tsx 파일을 불러와줍니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React BoilerPlate</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./src/main.tsx"></script>
  </body>
</html>
```

main.tsx 파일을 아래와 같이 작성합니다.

```tsx
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

function main() {
  const element = document.getElementById('root');

  if (!element) {
    return;
  }

  const root = ReactDOM.createRoot(element);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

main();
```

브라우저를 확인하면 `Hello, World`라는 텍스트를 확인할 수 있습니다.

마지막으로 이미지와 같은 정적 파일을 제공하기 위해  
parcel-reporter-static-files-copy 패키지를 설치합니다.

```bash
npm i -D parcel-reporter-static-files-copy
```

그리고 .parcelrc 파일을 만들어 아래와 같이 설정해줍니다.

```json
{
  "extends": ["@parcel/config-default"],
  "reporters": ["...", "parcel-reporter-static-files-copy"]
}
```

`static` 폴더를 생성해주고 내부에 정적 파일들을 위치시킵니다.

```bash
mkdir static
mkdir static/images
mv ~/Downloads/desk.png static/images/desk.png
```

사용하는 코드에서는 static 경로 아래부터 바로 사용할 수 있습니다.

```tsx
<img src="images/desk.jpg" alt="desk" width="200" />
```

마지막으로 .vscode/settings.json 파일을 추가해 JS/TS 파일을 저장할 때마다  
ESLint를 실행하고 문제점을 고치게 설정합니다.

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

처음부터 시작해서 하나하나 설치를 해가면서 드디어 React를 브라우저에 띄우게 되었습니다.
