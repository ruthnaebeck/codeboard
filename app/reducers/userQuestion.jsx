import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const GET = 'GET_USER_QUESTION'
const SAVE = 'SAVE_QUESTION'
const RESET = 'RESET_QUESTION'

/* ------------- ACTION CREATER ---------------- */

export const get = question => ({ type: GET, question })
export const save = question => ({ type: SAVE, question })
export const resetQuestion = () => ({ type: RESET })

/* ------------- REDUCERS ---------------- */

export default function reducer(question = null, action) {
  switch (action.type) {
  case GET:
    return action.question
  case SAVE:
    return action.question
  case RESET:
    return null
  default:
    return question
  }
}

/* ------------- DISPATCHERS ---------------- */

export const fetchUserQuestion = (id) => dispatch => {
  axios.get(`/api/question/${id}/user`)
  .then(res => dispatch(get(res.data)))
  .catch(err => console.error('Error fetchUserQuestion', err))
}

export const saveQuestion = (uId, qId, question) => dispatch => {
  axios.post(`/api/users/${uId}/question/${qId}`, question)
  .then(res => dispatch(save(res.data)))
  .catch(err => console.error('error creating review', err))
}
