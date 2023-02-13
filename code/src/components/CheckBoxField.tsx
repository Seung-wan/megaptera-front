/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef, useState } from 'react';

type CheckBoxFieldProps = {
  label: string;
};

export default function CheckBoxField({ label }: CheckBoxFieldProps) {
  const id = useRef(`checkbox-${label}`.replace(/ /g, '-').toLowerCase());

  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  const handleChange = () => {
    setInStockOnly(!inStockOnly);
  };

  return (
    <div>
      <input
        type="checkbox"
        id={id.current}
        checked={inStockOnly}
        onChange={handleChange}
      />
      <label htmlFor={id.current}>Only show products in stock</label>
    </div>
  );
}
