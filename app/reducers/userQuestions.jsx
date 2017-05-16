import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const GET = 'GET_USER_QUESTIONS'

/* ------------- ACTION CREATER ---------------- */

export const get = questions => ({ type: GET, questions })

/* ------------- REDUCERS ---------------- */

export default function reducer(questions = [], action) {
  switch (action.type) {
  case GET:
    return action.questions
  default:
    return questions
  }
}

/* ------------- DISPATCHERS ---------------- */

export const fetchUserQuestions = (id, userQuestions) => dispatch => {
  axios.get(`/api/users/${id}`)
  .then(res => {
    dispatch(get(res.data))
    if (userQuestions) userQuestions(res.data)
  })
  .catch(err => console.error('Error fetchUserQuestions', err))
}
