import types from '../types';

function saveListJobs(data) {
  return {
    type: types.SAVE_LIST_JOBS,
    data: data,
  };
}

const recruitment = {
  saveListJobs,
};

export default recruitment;
