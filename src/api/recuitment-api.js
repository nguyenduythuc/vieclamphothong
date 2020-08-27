import {config} from './config';

const RecruitmentApi = {
  getList: (queryString) =>
    config.get(
      `/capi/recruitment?filter[location]=21.312542,105.704714,10&include=educational_background,occupation,workplace,company&${queryString}`,
    ),
  getAllFilters: () => config.get('/api/filters'),
};

export default RecruitmentApi;
