/* eslint-disable jsx-a11y/label-has-associated-control */
export default function SearchBar() {
  return (
    <div className="search-bar">
      <div>
        <input type="text" placeholder="Search..." />
      </div>
      <div>
        <input type="checkbox" id="only-stock" />
        <label htmlFor="only-stock">Only show products in stock</label>
      </div>
    </div>
  );
}
