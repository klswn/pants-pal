export const FETCH_POSITION_START = 'FETCH_POSITION_START';
export const RECEIVE_POSITION = 'RECEIVE_POSITION';
export const FETCH_POSITION_ERROR = 'FETCH_POSITION_ERROR';

function receivePosition(position) {
   return {
      type: RECEIVE_POSITION,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
   };
}

function fetchPositionError(error) {
   return {
      type: FETCH_POSITION_ERROR,
      error
   };
}

// ASYNC

export function fetchPosition() {
   return (dispatch) => {
      dispatch({ type: FETCH_POSITION_START });

      if (navigator) {
         return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
               (position) => {
                  resolve(dispatch(receivePosition(position)));
               },
               (error) => {
                  reject(dispatch(fetchPositionError(error)));
               }
            )
         });
      } else {
         dispatch({ type: FETCH_POSITION_ERROR });
      }
   };
}
