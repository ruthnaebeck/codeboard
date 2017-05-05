import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const GET = 'GET_QUESTION'

/* ------------- ACTION CREATER ---------------- */

export const get = (question) => ({ type: GET, question })

/* ------------- REDUCERS ---------------- */

export default function reducer(question = {}, action) {
  switch (action.type) {
  case GET:
    return action.question
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
