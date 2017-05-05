import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const GET = 'GET_CATEGORIES'

/* ------------- ACTION CREATER ---------------- */

export const get = (categories) => ({ type: GET, categories })

/* ------------- REDUCERS ---------------- */

export default function reducer(categories = [], action) {
  switch (action.type) {
  case GET:
    return action.categories
  default:
    return categories
  }
}

/* ------------- DISPATCHERS ---------------- */

export const fetchCategories = () => dispatch => {
  axios.get('/api/categories')
  .then(res => {
    dispatch(get(res.data))
  })
  .catch(err => console.error('Error fetchCategories', err))
}
