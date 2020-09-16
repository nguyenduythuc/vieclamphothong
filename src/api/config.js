import qs from 'querystringify';
import {navigationNative} from '../app';
import {actions, configStore} from '../app-redux';
import { reset } from '../utils/navigation';

const {store} = configStore();

const baseUrl = 'https://app.s-job.vn';
// const navigation = useNavigation();

let HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-client-app-code': 'timviecphothong',
  'Access-Control-Allow-Origin': '*',
};

const onResponse = async (request, result) => {
  // console.log(request, result.text())
  try {
    const body = await result.text();
    const newBody = JSON.parse(body);
    // Response is json but not a successful response
    if (result.status < 200 || result.status > 299) {
      const exception = {
        exception: newBody,
        type: 'object',
      };
      if (result.status === 401) {
        store.dispatch(actions.user.saveUser({}));
        setToken('');
        navigationNative.current?.reset({index: 0, routes: [{name: 'Login'}]});
      }
      throw exception;
    }

    // SUCCESS: Return valid response
    return newBody;
  } catch (e) {
    if (e?.type === 'object') {
      throw e;
    }
    // console.log(result.status, result._bodyText); // uncomment this line if unexpected error occured
    // SUCCESS: when response is {} and status 200 but parsing JSON failed. Still is success response
    if (result.status > 199 && result.status < 300) {
      return result;
    }
    // if (result.status === 401) {
    //   return result;
    // }
    // // FAILED: Throw unknown exceptions
    const exception = {
      exception: result,
      type: 'raw',
    };
    throw exception;
  }
};

const config = {
  post: (endpoint: string, params: Object) => {
    const url = baseUrl + endpoint;
    const options = {
      method: 'POST',
      body: JSON.stringify(params),
      headers: HEADERS,
    };
    const request = {
      url,
      options,
    };

    return fetch(url, options).then((result) => onResponse(request, result));
  },

  get: (endpoint: string, params: Object = {}) => {
    const url = `${baseUrl}${endpoint}${qs.stringify(params, true)}`;
    const options = {
      method: 'GET',
      headers: HEADERS,
    };
    const request = {
      url,
      options,
    };
    return fetch(url, options).then((result) => onResponse(request, result));
  },

  put: (endpoint: string, params: Object) => {
    const url = baseUrl + endpoint;
    const options = {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(params),
    };
    const request = {
      url,
      options,
    };
    return fetch(url, options).then((result) => onResponse(request, result));
  },
  postImage: (endpoint: string, params: Object) => {
    const url = baseUrl + endpoint;
    const options = {
      method: 'POST',
      headers: {...HEADERS, 'Content-Type': 'multipart/form-data;'},
      body: params,
    };
    const request = {
      url,
      options,
    };
    return fetch(url, options).then((result) => onResponse(request, result));
  },

  delete: (endpoint: string, params: Object) => {
    const url = `${baseUrl}${endpoint}${qs.stringify(params, true)}`;
    const options = {
      method: 'DELETE',
      headers: HEADERS,
    };
    const request = {
      url,
      options,
    };
    return fetch(url, options).then((result) => onResponse(request, result));
  },
};

const setToken = (_token: string) => {
  HEADERS = {
    ...HEADERS,
    Authorization: `Bearer ${_token}`,
  };
};

export {config, setToken};
