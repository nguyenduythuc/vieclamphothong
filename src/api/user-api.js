import {config} from './config';

const UserApi = {
  getProfile: () => config.get('/capi/me'),
};

export default UserApi;
