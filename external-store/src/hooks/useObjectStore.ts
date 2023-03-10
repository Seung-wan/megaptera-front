import { useEffect } from 'react';

import ObjectStore from '../stores/ObjectStore';

import useForceUpdate from './useForceUpdate';

export default function useObjectStore<T extends ObjectStore>(store: T): T {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    store.addListener(forceUpdate);

    return () => {
      store.removeListener(forceUpdate);
    };
  }, [store, forceUpdate]);

  return store;
}
