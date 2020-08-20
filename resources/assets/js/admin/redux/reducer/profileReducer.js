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

const initialState = {
  username: '',
  profileImg: '',
  address: '',
  country: '',
  currencySymbol: '',
  currencySymbolUtf8: '',
  email: '',
  name: '',
  phone: '',
  webPage: '',
  lastValidity: '',
  packageTime: '',
  packageName: '',
  packagePrice: ''
}

export const profileReducer = function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      const {
        address,
        businessName,
        country,
        data,
        email,
        image,
        name,
        phone,
        username,
        webPage,
        packageTime,
        plan_detail
      } = action.payload.data

      return Object.assign({}, state, {
        username: businessName,
        profileImg: image === null || image === '' ? {url: null} : {url: image},
        address: address,
        country: country,
        currencySymbol: data.currencySymbol,
        currencySymbolUtf8: data.currencySymbolUtf8,
        email: email,
        name: name,
        phone: phone,
        webPage: webPage,
        lastValidity: packageTime,
        packageTime: packageTime,
        packageName: plan_detail.name,
        packagePrice: plan_detail.price
      })
    case GET_PROFILE:
      return state
    case UPDATE_PROFILE_IMG:
      return Object.assign({}, state, {profileImg: {url: action.payload}})
    case UPDATE_PROFILE_USERNAME:
      return Object.assign({}, state, {
        username: action.payload
      })
    case UPDATE_PROFILE_ADDRESS:
      return Object.assign({}, state, {
        address: action.payload
      })
    case UPDATE_PROFILE_EMAIL:
      return Object.assign({}, state, {
        email: action.payload
      })
    case UPDATE_PROFILE_WEBPAGE:
      return Object.assign({}, state, {
        webPAge: action.payload
      })
    case UPDATE_PROFILE_PHONE:
      return Object.assign({}, state, {
        phone: action.payload
      })
    default:
      return state
  }
}
