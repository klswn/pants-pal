import axios from 'axios';
import { URLS } from '../config/constants';
import { fetchPosition } from './position';

export const FETCH_LOCATION_START = 'FETCH_LOCATION_START';
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';
export const FETCH_LOCATION_ERROR = 'FETCH_LOCATION_ERROR';

function receiveLocation(location) {
   return {
      type: RECEIVE_LOCATION,
      title: location.title,
      woeid: location.woeid
   };
}

function fetchLocationError(error) {
   return {
      type: FETCH_LOCATION_ERROR,
      error
   };
}

// ASYNC

export function fetchLocationQuery(query) {
   return (dispatch) => {
      const url = `${URLS.SEARCH_QUERY}${query}`;

      dispatch({ type: FETCH_LOCATION_START });

      return axios.get(url).then(
         (response) => {
            const { data } = response,
               location = data[0];

            if (location) {
               dispatch(receiveLocation(location));
            } else {
               dispatch(fetchLocationError('no data'));
            }
         },
         (error) => {
            dispatch(fetchLocationError(error.message));
         }
      );
   };
}

export function fetchLocationLatLong(lat, long) {
   return (dispatch) => {
      const url = `${URLS.SEARCH_LAT_LONG}${lat},${long}`;

      dispatch({ type: FETCH_LOCATION_START });

      return axios.get(url).then(
         (response) => {
            const { data } = response,
               location = data[0];

            if (location) {
               dispatch(receiveLocation(location));
            } else {
               dispatch(fetchLocationError('no data'));
            }
         },
         (error) => {
            dispatch(fetchLocationError(error.message));
         }
      );
   };
}

export function fetchPositionAndLocation() {
   return (dispatch, getState) => {
      dispatch(fetchPosition()).then(() => {
         const { latitude, longitude } = getState().position;

         return dispatch(fetchLocationLatLong(latitude, longitude));
      });
   };
}
