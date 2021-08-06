import { createStore, combineReducers } from 'redux';
import { newMessage, allMessages } from './Reducer';

const allReducers = combineReducers({
  newMessage,
  allMessages,
});

let store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store };
