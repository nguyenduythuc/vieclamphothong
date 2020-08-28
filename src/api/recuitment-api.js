import {config} from './config';

const RecruitmentApi = {
  getList: (queryString) => config.get(`/capi/recruitment?${queryString}`),

  getAllFilters: () => config.get('/api/filters'),
};

export default RecruitmentApi;
