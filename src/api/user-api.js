import {config} from './config';

const UserApi = {
  getProfile: () => config.get('/capi/me'),

  updateProfile: (body) => config.put('/capi/me', body),

  updateAvatarProfile: (body) =>
    config.putImage('/capi/me/profile-picture', body),
};

export default UserApi;
