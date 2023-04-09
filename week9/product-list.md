# 학습 키워드

## 강의 정리

### 상품 목록

1. 상품 목록 얻기
2. 상품 목록 보여주기

1번은 useFetchProducts라는 custom hook으로 구현을 하고, 2번은 Products 컴포넌트로 구현을 한다.  
ProductListPage에선 이 둘을 조합한다.

Products 컴포넌트에서 useFetchProducts hook을 불러도 되지만, page에 들어왔을 때 hook을 호출하는게 더 적합하다고 아샬님은 생각한다.  
책임을 분리한다. Products는 데이터를 받아서 뿌려주는 역할만 하도록. 이렇게 해야 테스트를 하기도 더 쉽다.  
ProductListPage에서는 hook이 called 되었는지, Products에서는 데이터가 화면에 원하는대로 뿌려졌는지만 확인하면 될 것 같다.

```tsx
// ProductListPage.tsx

import Products from '../components/product-list/Products';

export default function ProductListPage() {
  const { products } = useFetchProducts();
}
```

```tsx
// Products.tsx

import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { ProductSummary } from '../../types';

const Container = styled.div`
  ul {
    display: flex;
    flex-wrap: wrap;
  }

  li {
    width: 20%;
    padding: 1rem;
  }

  a {
    display: block;
    text-decoration: none;
  }
`;

type ProductProps = {
  products: ProductSummary[];
};

export default function Products({ products }: ProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <Container>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              <Product product={product} />
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
```

Products 컴포넌트는 처음부터 폴더에 분리하지 않았다. 우선 작성하다가, 컴포넌트가 많아지면 그때 아샬님은 분리하시는 편이다.  
사실 어떻게 해도 상관 없다. 다만 본인이 컨트롤할 수 있어야 한다.  
Product 컴포넌트를 만들어서 디테일하가 어떻게 뿌려줄지에 대해서는 위임을 한다.

```tsx
// Product.tsx

import styled from 'styled-components';

import { ProductSummary } from '../../types';

import numberFormat from '../../utils/numberFormat';

const Thumbnail = styled.img.attrs({
  alt: 'Thumbnail',
})`
  display: block;
  width: 100%;
  aspect-ratio: 1/1;
`;

type ProductProps = {
  product: ProductSummary;
};

export default function Product({ product }: ProductProps) {
  return (
    <div>
      <Thumbnail src={product.thumbnail.url} />
      <div>{product.name}</div>
      <div>{numberFormat(product.price)}원</div>
    </div>
  );
}
```

```ts
// useFetchProducts.ts

import { container } from 'tsyringe';

import { useEffectOnce } from 'usehooks-ts';

import { useStore } from 'usestore-ts';

import ProductStore from '../stores/ProductsStore';

import { ProductSummary } from '../types';

export default function useFetchProducts() {
  const store = container.resolve(ProductStore);

  const [{ products }] = useStore();

  useEffectOnce(() => {
    store.fetchProducts();
  });

  return {
    products,
  };
}
```

apiBaseUrl은 나중에는 환경 변수로 추출하게 된다. 로컬, 테스트, 라이브서버 어디에서 돌리든 구현 코드를 고칠 필요가 없이 환경 변수값만 바꿔주면 된다.  
런타임에 터지는 것을 막기 위해서 만약에 data?.products가 null, undefined이면 빈 배열을 넘겨주도록 했다.

```ts
// utils/numberFormat.ts

export default function numberFormat(value: number): string {
  return new Intl.NumberFormat().format(value);
}
```

numberFormat과 같은 util의 경우에 매개변수 네이밍을 신경쓰면 좋다. `number:number` 이런식으로 쓰면 안되고 위와 같은 경우에는 범용적인 value가 무난하다.

```ts
// stores/ProductStore.ts

@singleton()
@Store()
export default class ProductsStore {
  products: ProductSummary[] = [];

  async fetchProducts() {
    this.setProducts([]);

    const { data } = await axios.get(`${apiBaseUrl}/products`);
    const { products } = data;

    this.setProducts(products);
  }

  @Action()
  setProducts(products: ProductSummary[]) {
    this.products = products;
  }
}
```

### 카테고리 목록

헤더에 카테고리 목록을 보여줄 것

```tsx
// Header.tsx

export default function Header() {
  const { categories } = useFetchCategories();

  return (
    <Container>
      <h1>Shop</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
            {!!categories.length && (
              <ul>
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link to={`/products?categoryId=${category.id}`}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>
    </Container>
  );
}
```

NavLink 보다는 현재 위치를 찾아서 스타일링 해주는 방식이 더 낫다. querystring의 경우에 NavLink로 확인하기 어려운 것 같다.

```ts

```

```ts
// stores/CategoriesStore.ts

import axios from 'axios';

import { singleton } from 'tsyringe';

import { Store, Action } from 'usestore-ts';

import { Category } from '../types';

@singleton()
@Store()
export default class CategoriesStore {
  categories: Category[] = [];

  async fetchCategories() {
    this.setCategories([]);

    const categories = await apiService.fetchCategories();

    this.setCategories(categories);
  }

  @Action()
  setCategories(categories: Category[]) {
    this.categories = categories;
  }
}
```

```ts
// hooks/useFetchCategories.ts

import { container } from 'tsyringe';

import { useEffectOnce } from 'usehooks-ts';

import { useStore } from 'usestore-ts';

import CategoriesStore from '../stores/CategoriesStore';

export default function useFetchCategories() {
  const store = container.resolve(CategoriesStore);

  const [{ categories }] = useStore(store);

  useEffectOnce(() => {
    store.fetchCategories();
  });

  return { categories };
}
```
