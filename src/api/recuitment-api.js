import {config} from './config';

const RecruitmentApi = {
  getList: (queryString) => config.get(`/capi/recruitment?${queryString}`),

  getAllFilters: () => config.get('/api/filters'),

  getDetailRecruitment: (id) => config.get(`/capi/recruitment/${id}`),

  makeRecuitmentSeen: (id) =>
    config.post('/capi/recruitment-seen', {recruitment_id: id}),

  makeRecuitmentApplied: (id) =>
    config.post('/capi/applies', {recruitment_id: id}),
};

export default RecruitmentApi;
