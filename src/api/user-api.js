import {config} from './config';

const UserApi = {
  getProfile: () => config.get('/capi/me'),

  updateProfile: (body) => config.put('/capi/me', body),
};

export default UserApi;
