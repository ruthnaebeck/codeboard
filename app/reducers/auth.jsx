import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const AUTHENTICATED = 'AUTHENTICATED'
const UPDATED_ACCOUNT = 'UPDATED_ACCOUNT'

/* ------------- ACTION CREATER ---------------- */

export const authenticated = user => ({ type: AUTHENTICATED, user })

export const updatedAccount = user => ({type: UPDATED_ACCOUNT, user})

/* ------------- REDUCERS ---------------- */

export default function reducer(state=null, action) {
  switch (action.type) {
  case AUTHENTICATED:
    return action.user
  case UPDATED_ACCOUNT:
    return action.user
  default:
    return state
  }
}

/* ------------- DISPATCHERS ---------------- */

export const login = (username, password, success, fail) =>
  dispatch => {
    axios.post('/api/auth/login/local', {username, password})
    .then(() => {
      dispatch(whoami())
      success()
    })
    .catch(() => {
      dispatch(whoami())
      fail()
    })
  }

export const updateAccount = (id, name, email) =>
  dispatch =>
    axios.put(`/api/users/${id}`, {name, email})
    .then(res => dispatch(updatedAccount(res.data)))
      .catch(console.error)

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch => {
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        return dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))
  }
