import { useCallback, useState } from 'react';

export default function useForceUpdate() {
  const [state, setState] = useState(0);

  return useCallback(() => {
    setState((prev) => prev + 1);
  }, []);
}
