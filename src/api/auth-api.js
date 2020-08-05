import {config} from './config';

const AuthApi = {
  login: (phoneNumber, password, deviceName) =>
    config.post('/api/job-seeker/sign-in', {
      phone_number: phoneNumber,
      password,
      device_name: deviceName,
    }),

  register: (idToken, password, fullName, deviceName) =>
    config.post('/api/job-seeker/sign-up', {
      id_token: idToken,
      password,
      full_name: fullName,
      device_name: deviceName,
    }),
};

export default AuthApi;
