import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const SET_STATUS = 'SET_STATUS'
const CLOSE = 'CLOSE_DRAWER'

/* ------------- ACTION CREATER ---------------- */

export const set = () => ({ type: SET_STATUS })
export const close = () => ({ type: CLOSE })

/* ------------- REDUCERS ---------------- */

export default function reducer(state = false, action) {
  switch (action.type) {
  case SET_STATUS:
    return true
  case CLOSE:
    return false
  default:
    return state
  }
}
