import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const GET = 'GET_USER_QUESTIONS'
const SAVE = 'SAVE_QUESTION'

/* ------------- ACTION CREATER ---------------- */

export const get = questions => ({ type: GET, questions })
export const save = question => ({ type: SAVE, question })

/* ------------- REDUCERS ---------------- */

export default function reducer(questions = [], action) {
  switch (action.type) {
  case GET:
    return action.questions
  case SAVE:
    return [...questions, action.question]
  default:
    return questions
  }
}

/* ------------- DISPATCHERS ---------------- */

export const fetchUserQuestions = (id) => dispatch => {
  axios.get(`/api/users/${id}`)
  .then(res => dispatch(get(res.data)))
  .catch(err => console.error('Error fetchUserQuestions', err))
}

export const saveQuestion = (uId, qId, question) => dispatch => {
  axios.post(`/api/users/${uId}/question/${qId}`, question)
  .then(res => dispatch(save(res.data)))
  .catch(err => console.error('error creating review', err))
}
