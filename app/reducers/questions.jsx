import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const GET = 'GET_QUESTIONS'

/* ------------- ACTION CREATER ---------------- */

export const get = (questions) => ({ type: GET, questions })

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

export const fetchQuestions = () => dispatch => {
  axios.get('/api/questions')
  .then(res => {
    dispatch(get(res.data))
  })
  .catch(err => console.error('Error fetchQuestions', err))
}
