import {config} from './config';

const RecruitmentApi = {
  getList: (queryString) => config.get(`/capi/recruitment?${queryString}`),

  getAllFilters: () => config.get('/api/filters'),

  getAllStatusApplied: () => config.get('/api/apply-status'),

  getDetailRecruitment: (id) => config.get(`/capi/recruitment/${id}`),

  makeRecuitmentSeen: (id) =>
    config.post('/capi/recruitment-seen', {recruitment_id: id}),

  makeRecuitmentApplied: (id) =>
    config.post('/capi/applies', {recruitment_id: id}),

  makeRecuitmentSaved: (id) =>
    config.post('/capi/recruitment-save', {recruitment_id: id}),

  getListApplied: (location, param) =>
    config.get(
      `/capi/applies?include=user,recruitment,recruitment.company,recruitment.educationalBackground,recruitment.occupation,recruitment.workplace&${location}${param}`,
    ),
  getListSaved: (location) =>
    config.get(
      `/capi/recruitment-save?include=user,recruitment,recruitment.company,recruitment.educationalBackground,recruitment.occupation,recruitment.workplace&${location}`,
    ),

  deleteSavedRecruitment: (id) => config.delete(`/capi/recruitment-save/${id}`),

  deleteAppliedRecruitment: (id) => config.delete(`/capi/applies/${id}`),

  getAllInvitation: (filter) => config.delete(`/capi/invitations?${filter}`),

  getInvitationDetails: (id) => config.delete(`/capi/invitations/${id}`),

  updatePassword: (body) => config.put('/capi/me/change-password', body),
};

export default RecruitmentApi;
