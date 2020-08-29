import {config} from './config';

const RecruitmentApi = {
  getList: (queryString) => config.get(`/capi/recruitment?${queryString}`),

  getAllFilters: () => config.get('/api/filters'),

  getDetailRecruitment: (id) => config.get(`/capi/recruitment/${id}`),
};

export default RecruitmentApi;
