import React from 'react'

const actions = {
  STAFF_GET_ITEMS: 'STAFF_GET_ITEMS',
  STAFF_CREATE: 'STAFF_CREATE'
}

const staffReducer = (state = {staffList: []}, action) => {
  switch (action.type) {
    case actions.STAFF_GET_ITEMS:
      return {staffList: [{username: 'mehmet'}, {username: 'tuna'}]}

    default:
      return state
  }
}

const staffGetItems = () => {
  return {
    type: actions.STAFF_GET_ITEMS
  }
}

const staffCreate = item => {
  return {
    type: actions.STAFF_CREATE,
    item: item
  }
}

export default staffReducer
export {staffGetItems, staffCreate}
