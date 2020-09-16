import {config} from './config';

const UserApi = {
  getProfile: () => config.get('/capi/me'),

  updateProfile: (body) => config.put('/capi/me', body),

  updateAvatarProfile: (body) =>
    config.postImage('/capi/me/profile-picture', body),
};

export default UserApi;
