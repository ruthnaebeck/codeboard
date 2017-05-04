import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const GET = 'GET_DIFFICULTIES'

/* ------------- ACTION CREATER ---------------- */

export const get = (difficulties) => ({ type: GET, difficulties })

/* ------------- REDUCERS ---------------- */

export default function reducer(difficulties = [], action) {
  switch (action.type) {
  case GET:
    return action.difficulties
  default:
    return difficulties
  }
}

/* ------------- DISPATCHERS ---------------- */

export const fetchDifficulties = () => dispatch => {
  axios.get('/api/difficulties')
  .then(res => {
    dispatch(get(res.data))
  })
  .catch(err => console.error('Error fetchDifficulties', err))
}
