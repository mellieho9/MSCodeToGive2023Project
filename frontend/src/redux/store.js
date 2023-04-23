import { createStore } from 'redux';
import orderReducer from './reducers';

const store = createStore(orderReducer);

export default store;
