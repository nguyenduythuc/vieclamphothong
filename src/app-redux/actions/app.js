import types from '../types';

function saveLocation(data) {
  return {
    type: types.SAVE_APP_LOCATION,
    data: data,
  };
}

const app = {
  saveLocation,
};

export default app;
