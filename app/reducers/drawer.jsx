import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const SET_STATUS = 'SET_STATUS'

/* ------------- ACTION CREATER ---------------- */

export const set = () => ({ type: SET_STATUS })

/* ------------- REDUCERS ---------------- */

export default function reducer(state = false, action) {
  switch (action.type) {
  case SET_STATUS:
    return true
  default:
    return state
  }
}
