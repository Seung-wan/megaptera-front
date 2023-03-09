import useCounterStore from '../hooks/useCounterStore';

export default function CounterControl() {
  const store = useCounterStore();

  const handleClickIncrease = () => {
    store.count = store.count + 1;
    store.publish();
  };

  const handleClickDecrease = () => {
    store.count = store.count - 1;
    store.publish();
  };

  return (
    <div>
      <p>{store.count}</p>
      <button type="button" onClick={handleClickIncrease}>
        Increase
      </button>

      <button type="button" onClick={handleClickDecrease}>
        Decrease
      </button>
    </div>
  );
}
