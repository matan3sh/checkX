import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import checklistReducer from './checklist/checklistReducer';
import alertReducer from './alert/alertReducer';
import authReducer from './auth/authReducer';

const rootReducer = combineReducers({
  checklistApp: checklistReducer,
  alert: alertReducer,
  auth: authReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
