import axios from 'axios';
import { URLS } from '../config/constants';
import { fetchPosition } from './position';
import { fetchLocationLatLong } from './location';

export const FETCH_WEATHER_START = 'FETCH_WEATHER_START';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR';

function receiveWeather(weather) {
   return {
      type: RECEIVE_WEATHER,
      weather
   };
}

function fetchWeatherError(error) {
   return {
      type: FETCH_WEATHER_ERROR,
      error
   };
}

// ASYNC

export function fetchWeather() {
   return (dispatch, getState) => {
      dispatch({ type: FETCH_WEATHER_START });

      dispatch(fetchPosition())
      .then(() => {
         const { latitude, longitude } = getState().position;
         return dispatch(fetchLocationLatLong(latitude, longitude));
      })
      .then(() => {
         const { woeid } = getState().location,
            url = `${URLS.LOCATION}/${woeid}`;

         return axios.get(url).then(
            (response) => {
               const weather = response.data.consolidated_weather[0];

               if (weather) {
                  dispatch(receiveWeather(weather));
               } else {
                  dispatch(fetchWeatherError('no data'));
               }
            },
            (error) => {
               dispatch(fetchWeatherError(error.message));
            }
         );
      });
   };
}
