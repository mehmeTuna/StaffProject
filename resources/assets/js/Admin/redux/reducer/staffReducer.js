<<<<<<< Updated upstream
import {GET_STAFF_COUNT} from '../types/staff'

const initialState = {
  staff: [],
  onlineStaff: []
=======
import {
  GET_STAFF_COUNT,
  GET_STAFF_DEFAULT_LIST,
  STAFF_LOADING,
  STAFF_PAY_LOADING,
  STAFF_GET_DATA,
  PROFILE_LOADING
} from '../types/staff'

const initialState = {
  staff: [],
  staffProfile: [],
  staffProfileLoading: false,
  loading: false,
  payDataLoading: false
>>>>>>> Stashed changes
}

export const staffReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_STAFF_COUNT:
      return state.staff.length
<<<<<<< Updated upstream

=======
    case STAFF_LOADING:
      return Object.assign({}, state, {loading: action.payload.loading})
    case STAFF_PAY_LOADING:
      return Object.assign({}, state, {payDataLoading: action.payload.loading})
    case GET_STAFF_DEFAULT_LIST:
      return Object.assign({}, state, {staff: action.payload.data})
    case STAFF_GET_DATA:
      return Object.assign({}, state, {staffProfile: action.payload})
    case PROFILE_LOADING:
      return Object.assign({}, state, {
        staffProfileLoading: action.payload.loading
      })
>>>>>>> Stashed changes
    default:
      return state
  }
}
