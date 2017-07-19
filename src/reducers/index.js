import { combineReducers } from 'redux';
import { location } from './location';
import { position } from './position';
import { weather } from './weather';

const rootReducer = combineReducers({
   location,
   position,
   weather
});

export default rootReducer;
