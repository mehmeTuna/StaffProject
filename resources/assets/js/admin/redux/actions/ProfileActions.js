import React from 'react'
import axios from 'axios'

import {
  GET_PROFILE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_IMG,
  UPDATE_PROFILE_USERNAME,
  UPDATE_PROFILE_ADDRESS,
  UPDATE_PROFILE_EMAIL,
  UPDATE_PROFILE_WEBPAGE,
  UPDATE_PROFILE_PHONE
} from '../types/profile'

const updateProfileData = (state, data) => ({
  type: UPDATE_PROFILE,
  payload: data
})

const updateProfileUsername = (state, data) => ({
  type: UPDATE_PROFILE_USERNAME,
  payload: data
})

const updateProfileAddress = (state, data) => ({
  type: UPDATE_PROFILE_ADDRESS,
  payload: data
})

const updateProfileEmail = (state, data) => ({
  type: UPDATE_PROFILE_EMAIL,
  payload: data
})

const updateProfileWebpage = (state, data) => ({
  type: UPDATE_PROFILE_WEBPAGE,
  payload: data
})

const updateProfilePhone = (state, data) => ({
  type: UPDATE_PROFILE_PHONE,
  payload: data
})

const getProfile = state => ({
  type: GET_PROFILE
})

const businessProfileUpdateImgAction = (state, data) => ({
  type: UPDATE_PROFILE_IMG,
  payload: data.data.profileImg
})

const getBusinessProfileData = () => {
  return (dispatch, getState) => {
    axios.get('/v1/business/data').then(res => {
      dispatch(updateProfileData(getState(), res.data))
    })
  }
}

const businessData = () => {
  return dispatch => {
    dispatch(getProfile())
  }
}

const businessProfileUpdateImg = data => {
  return (dispatch, getState) => {
    let formData = new FormData()
    formData.append('img', data.file)
    formData.append('type', 'img')
    axios.post('/business/update', formData).then(res => {
      dispatch(businessProfileUpdateImgAction(getState(), res.data))
    })
  }
}

const businessProfileUpdateUsername = data => {
  return (dispatch, getState) => {
    axios
      .post('/business/update', {
        name: data
      })
      .then(res => {
        dispatch(updateProfileUsername(getState(), data))
      })
  }
}

const businessProfileUpdateAddress = data => {
  return (dispatch, getState) => {
    axios
      .post('/business/update', {
        address: data
      })
      .then(res => {
        dispatch(updateProfileAddress(getState(), data))
      })
  }
}

const businessProfileUpdateEmail = data => {
  return (dispatch, getState) => {
    axios
      .post('/business/update', {
        email: data
      })
      .then(res => {
        dispatch(updateProfileEmail(getState(), data))
      })
  }
}

const businessProfileUpdateWebpage = data => {
  return (dispatch, getState) => {
    axios
      .post('/business/update', {
        webpage: data
      })
      .then(res => {
        dispatch(updateProfileWebpage(getState(), data))
      })
  }
}

const businessProfileUpdatePhone = data => {
  return (dispatch, getState) => {
    axios
      .post('/business/update', {
        phone: data
      })
      .then(res => {
        dispatch(updateProfilePhone(getState(), data))
      })
  }
}

export {
  getBusinessProfileData,
  businessData,
  businessProfileUpdateImg,
  businessProfileUpdateUsername,
  businessProfileUpdateAddress,
  businessProfileUpdateEmail,
  businessProfileUpdateWebpage,
  businessProfileUpdatePhone
}
