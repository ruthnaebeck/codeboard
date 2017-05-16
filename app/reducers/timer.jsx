import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const START_TIMER = 'START_TIMER'
const STOP_TIMER = 'STOP_TIMER'

/* ------------- ACTION CREATER ---------------- */

export const startTimer = () => ({ type: START_TIMER })
export const stopTimer = () => ({ type: STOP_TIMER })

/* ------------- REDUCERS ---------------- */

export default function reducer(state = false, action) {
  switch (action.type) {
  case START_TIMER:
    return true
  case STOP_TIMER:
    return false
  default:
    return state
  }
}
