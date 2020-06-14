import {GET_STAFF_COUNT} from '../types/staff'

const initialState = {
  staff: [],
  onlineStaff: []
}

export const staffReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_STAFF_COUNT:
      return state.staff.length

    default:
      return state
  }
}
