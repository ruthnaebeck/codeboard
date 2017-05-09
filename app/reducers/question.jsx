import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const GET = 'GET_QUESTION'
const SET = 'SET_ID'

/* ------------- ACTION CREATER ---------------- */

export const get = (question) => ({ type: GET, question })
export const setId = (id) => ({ type: SET, id })

/* ------------- REDUCERS ---------------- */

export default function reducer(question = {}, action) {
  switch (action.type) {
  case GET:
    return action.question
  case SET:
    return action.id
  default:
    return question
  }
}

/* ------------- DISPATCHERS ---------------- */

export const fetchQuestion = (id) => dispatch => {
  axios.get(`/api/question/${id}`)
  .then(res => {
    dispatch(get(res.data))
  })
  .catch(err => console.error('Error fetchQuestion', err))
}
