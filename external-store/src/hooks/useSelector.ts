import { useEffect, useRef, useState } from 'react';
import { container } from 'tsyringe';

import Store, { State } from '../stores/Store';
import useForceUpdate from './useForceUpdate';

type Selector<T> = (state: State) => T;

export default function useSelector<T>(selector: Selector<T>): T {
  const store = container.resolve(Store);

  const state = useRef(selector(store.state));

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const update = () => {
      const newState = selector(store.state);
      if (newState !== state.current) {
        forceUpdate();
        state.current = newState;
      }

      forceUpdate();
    };
    store.addListener(update);

    return () => {
      store.removeListener(update);
    };
  }, [store, forceUpdate]);

  return selector(store.state);
}
