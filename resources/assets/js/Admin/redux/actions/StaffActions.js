import axios from 'axios'

<<<<<<< Updated upstream
import {GET_STAFF_COUNT} from '../types/staff'
=======
import {
  STAFF_PAY,
  GET_STAFF_DEFAULT_LIST,
  STAFF_LOADING,
  STAFF_PAY_LOADING,
  STAFF_DETAIL,
  STAFF_GET_DATA,
  PROFILE_LOADING
} from '../types/staff'

const getStaffDefaultList = (state, data) => ({
  type: GET_STAFF_DEFAULT_LIST,
  payload: data
})

const staffLoading = (state, data) => ({
  type: STAFF_LOADING,
  payload: data
})

const staffPayData = (state, data) => ({
  type: STAFF_PAY,
  payload: data
})

const staffPayLoading = (state, data) => ({
  type: STAFF_PAY_LOADING,
  payload: data
})

const staffProfileData = (state, data) => ({
  type: STAFF_GET_DATA,
  payload: data
})

const staffProfileLoading = (state, data) => ({
  type: PROFILE_LOADING,
  payload: data
})

const getStaffDefaultListAction = () => {
  return (dispatch, getState) => {
    dispatch(staffLoading(getState(), {loading: true}))
    axios.get('/v1/staff/list').then(res => {
      dispatch(getStaffDefaultList(getState(), res.data))
      dispatch(staffLoading(getState(), {loading: false}))
    })
  }
}

const staffPay = (id, pay) => {
  return (dispatch, getState) => {
    dispatch(staffPayLoading(getState, {loading: true}))
    axios
      .post('/v1/staff/pay', {
        id: id,
        pay: pay
      })
      .then(res => {
        dispatch(staffPayData(getState(), res.data))
        dispatch(staffPayLoading(getState, {loading: false}))
      })
  }
}

const getStaffProfileData = id => {
  return (dispatch, getState) => {
    dispatch(staffProfileLoading(getState, {loading: true}))
    axios
      .post('/v1/staff/profile', {
        id: id
      })
      .then(res => {
        dispatch(staffProfileData(getState(), res.data.data))
        dispatch(staffProfileLoading(getState, {loading: false}))
      })
  }
}

export {getStaffDefaultListAction, staffPay, getStaffProfileData}
>>>>>>> Stashed changes
