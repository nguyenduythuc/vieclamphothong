import {config} from './config';

const AuthApi = {
  login: (phoneNumber, password, deviceName) =>
    config.post('/capi/sign-in', {
      phone_number: phoneNumber,
      password,
      device_name: deviceName,
    }),

  register: (idToken, password, fullName, deviceName) =>
    config.post('/capi/sign-up', {
      id_token: idToken,
      password,
      full_name: fullName,
      device_name: deviceName,
    }),

  forgotPassword: (idToken, password) =>
    config.put('/capi/forgot-password', {id_token: idToken, password}),
};

export default AuthApi;
