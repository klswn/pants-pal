import {
   FETCH_WEATHER_START,
   RECEIVE_WEATHER,
   FETCH_WEATHER_ERROR
} from '../actions/weather';

const initialState = {
   weather: {},
   isFetching: false,
   isFetched: false,
   error: ''
};

export function weather(state = initialState, action) {
   switch (action.type) {
      case FETCH_WEATHER_START:
         return {
            ...state,
            isFetching: true,
            isFetched: false
         };
      case RECEIVE_WEATHER:
         return {
            ...state,
            isFetching: false,
            isFetched: true,
            weather: action.weather,
            error: ''
         };
      case FETCH_WEATHER_ERROR:
         return {
            ...state,
            isFetching: false,
            isFetched: false,
            weather: {},
            error: action.error
         };
      default:
         return state;
   }
}
