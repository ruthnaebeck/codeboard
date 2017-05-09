import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const GET_USER_QUESTIONS = 'GET_USER_QUESTIONS'

/* ------------- ACTION CREATER ---------------- */

export const get = (userId) => ({ type: GET_USER_QUESTIONS, questions })
// where the questions are coming from?

/* ------------- REDUCERS ---------------- */

export default function reducer(questions = [], action) {
  switch (action.type) {
  case GET_USER_QUESTIONS:
    return action.questions
  default:
    return questions
  }
}

/* ------------- DISPATCHERS ---------------- */

export const fetchUserQuestions = (id) => dispatch => {
  axios.get(`/api/users/${id}`)
  .then(res => {
    dispatch(get(res.data))
  })
  .catch(err => console.error('Error fetchUserQuestions', err))
}
