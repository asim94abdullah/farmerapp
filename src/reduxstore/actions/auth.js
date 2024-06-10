import {apiPost} from '../../api/requestapi';
import {LOGIN_API} from '../../config/urls';
import {storeData} from '../../utils/helperFunctions';
import {saveUserData} from '../reducers/auth';
import store from '../store';
import types from '../types';

const {dispatch} = store;

export const userLogin = data => {
  return new Promise((resolve, reject) => {
    apiPost(LOGIN_API, data)
      .then(res => {
        console.log('get res+++', res);
        if (res?.status === 'resolve') {
          storeData('userData', res?.data)
            .then(value => {
              console.log('im here', value);
              dispatch(saveUserData(res.data));
              resolve({status: 'resolve', res: res.data});
            })
            .catch(error => {
              reject({status: 'reject', res: error});
            });
        } else {
          resolve({status: 'reject', res: res.data});
        }
      })
      .catch(error => {
        reject({status: 'reject', res: error});
      });
  });
  // dispatch(saveUserData(data));
};

export function logout() {
  dispatch({type: types.CLEAR_REDUX_STATE});
}
