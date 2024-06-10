import { apiDelete, apiGet, apiPost } from "../../api/requestapi";
import { DELETE_ORDER, GET_SINGLE_ORDER, LOGIN_API, ORDER_API_ADMIN, ORDER_API_USER, UPDATE_ORDER_STATUS } from "../../config/urls";
import { saveOrderData } from "../reducers/order";

import store from "../store";
import types from "../types";

const { dispatch } = store;


export const getOrderData = () => {
    return new Promise((resolve, reject) => {
      apiGet(ORDER_API_ADMIN).then((res) => {
        //  console.log("get Orders", res)
        if (!!res) {
            // console.log("data save order")
            dispatch(saveOrderData(res))
            resolve(res)
        } else {
          resolve(res)
        }
      }).catch((error) => {
        reject(error)
      })
    })
    // dispatch(saveUserData(data));
  };
  export const getSingleUserOrderData = (id) => {
    return new Promise((resolve, reject) => {
      apiGet(ORDER_API_USER+id).then((res) => {
        //  console.log("get Orders", res)
        if (!!res) {
            
           // dispatch(saveOrderData(res))
            resolve(res)
        } else {
          resolve(res)
        }
      }).catch((error) => {
        reject(error)
      })
    })
    // dispatch(saveUserData(data));
  };
export const getSingleOrderData = (id) => {
    return new Promise((resolve, reject) => {
      apiGet(GET_SINGLE_ORDER+id).then((res) => {
        //  console.log("get Orders", res)
        if (!!res) {
            
           // dispatch(saveOrderData(res))
            resolve(res)
        } else {
          resolve(res)
        }
      }).catch((error) => {
        reject(error)
      })
    })
    // dispatch(saveUserData(data));
  };
export const updateOrderStatus = (id,data) => {
    return new Promise((resolve, reject) => {
      apiPost(UPDATE_ORDER_STATUS+id,data).then((res) => {
        //  console.log("order status updated", res)
        if (!!res) {
            // console.log("data save order")
           // dispatch(saveOrderData(res))
            resolve(res)
        } else {
          resolve(res)
        }
      }).catch((error) => {
        reject(error)
      })
    })
    // dispatch(saveUserData(data));
  };
export const deleteOrder = (id) => {
    return new Promise((resolve, reject) => {
      apiDelete(DELETE_ORDER+id).then((res) => {
          console.log("order status updated", res)
        if (!!res) {
            // console.log("data save order")
           // dispatch(saveOrderData(res))
            resolve(res)
        } else {
          resolve(res)
        }
      }).catch((error) => {
        reject(error)
      })
    })
    // dispatch(saveUserData(data));
  };