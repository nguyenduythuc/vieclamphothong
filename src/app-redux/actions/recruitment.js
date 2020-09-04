import types from '../types';

function saveListJobs(data) {
  return {
    type: types.SAVE_LIST_JOBS,
    data: data,
  };
}

function saveListFilters(data) {
  return {
    type: types.SAVE_LIST_FILTERS,
    data: data,
  };
}

function saveListStatusApplied(data) {
  return {
    type: types.SAVE_LIST_STATUS_APPLIED,
    data: data,
  };
}

function saveDetailRecruitment(data) {
  return {
    type: types.SAVE_DETAIL_RECUITMENT,
    data: data,
  };
}

const recruitment = {
  saveListJobs,
  saveListFilters,
  saveDetailRecruitment,
  saveListStatusApplied,
};

export default recruitment;
