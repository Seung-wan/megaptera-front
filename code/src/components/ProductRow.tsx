import Product from '../types/Product';

type ProductRowProps = { product: Product };

export default function ProductRow({ product }: ProductRowProps) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
}
