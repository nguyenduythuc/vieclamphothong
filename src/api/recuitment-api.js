import {config} from './config';

const RecruitmentApi = {
  getList: (queryString) => config.get(`/capi/recruitment?${queryString}`),

  getAllFilters: () => config.get('/api/filters'),

  getDetailRecruitment: (id) => config.get(`/capi/recruitment/${id}`),

  makeRecuitmentSeen: (id) =>
    config.post('/capi/recruitment-seen', {recruitment_id: id}),

  makeRecuitmentApplied: (id) =>
    config.post('/capi/applies', {recruitment_id: id}),

  makeRecuitmentSaved: (id) =>
    config.post('/capi/recruitment-save', {recruitment_id: id}),

  getListApplied: (location) =>
    config.get(
      `/capi/applies?include=user,recruitment,recruitment.company,recruitment.educationalBackground,recruitment.occupation,recruitment.workplace&${location}`,
    ),
  getListSaved: (location) =>
    config.get(
      `/capi/recruitment-save?include=user,recruitment,recruitment.company,recruitment.educationalBackground,recruitment.occupation,recruitment.workplace&${location}`,
    ),

  deleteSavedRecruitment: (id) => config.delete(`/capi/recruitment-save/${id}`),

  deleteAppliedRecruitment: (id) => config.delete(`/capi/applies/${id}`),
};

export default RecruitmentApi;
