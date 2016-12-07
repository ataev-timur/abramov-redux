import { createStore } from 'redux';
import { loadState, saveState } from '../modules/localStorage';
import reducers from '../reducers';
const persistedState = loadState();

const store = createStore(reducers, persistedState);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;
