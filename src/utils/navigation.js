import {CommonActions} from '@react-navigation/native';

export function reset(navigationData, index) {
  CommonActions.reset({
    index,
    routes: [navigationData],
  });
}
