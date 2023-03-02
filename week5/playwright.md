# 학습 키워드

- E2E(End to End) Test
- Headless Chrome
- Puppeteer
- Playwright
- CodeceptJS

## 강의 정리

### Playwright

웹 브라우저 기반 E2E 테스트 자동화 도구.  
Cypress도 많이 사용하는 것 같다.

Headless Chrome을 기반으로 한 Puppeteer를 계승하면서, 더 많은 웹 브라우저를 지원한다.

Playwright 패키지 설치

```bash
npm i -D @playwright/test eslint-plugin-playwright
```

playwright.config.ts

```ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	testDir: './tests',
	retries: 0,
	use: {
		baseURL: 'http://localhost:8080',
		headless: !!process.env.CI,
		screenshot: 'only-on-failure',
	},
};

export default config;
```

tests/.eslintrc.js

```js
module.exports = {
	env: {
		jest: false,
	},
	extends: ['plugin:playwright/playwright-test'],
	rules: {
		'import/no-extraneous-dependencies': 'off',
	},
};
```

tests/home.spec.ts

```ts
import { test, expect } from '@playwright/test';

test('Filter products', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByText('Apple')).toBeVisible();

	const searchInput = page.getByLabel('Search');

	await searchInput.fill('a');

	await expect(page.getByText('Apple')).toBeVisible();

	await searchInput.fill('aa');

	await expect(page.getByText('Apple')).toBeHidden();
});

test('Click the “Increase” button', async ({ page }) => {
	await page.goto('/');

	const count = 13;

	await Promise.all((
		[...Array(count)].map(async () => {
			await page.getByText('Increase').click();
		})
	));

	await expect(page.getByText(`${count}`)).toBeVisible();
});
```

테스트 실행

```bash
npx playwright test
```

test-results는 .gitignore에 추가

```
/test-results/
```
