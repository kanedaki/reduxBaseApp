import { post } from 'core/api'
import { get, del } from 'resources/users'
import { setUIElement, deleteUIElements } from 'modules/ui'
import { replace } from 'modules/entities'
import { commAttempt, commError, commSuccess } from 'modules/communication'
import { DOMAIN, ENDPOINT, getUserList } from './'

import { setPageNumber } from 'modules/pagination'

export function fetchUsers(pageNumber = 0) {
  return (dispatch, getState) => {
    dispatch(setPageNumber(DOMAIN, pageNumber))
    return get(dispatch, getState)
  }
}

export function deleteUser(email) {
  return (dispatch, getState) => {
    dispatch(commAttempt(DOMAIN))
    return del(dispatch, getState, { email })
    .then(() => {
      const users = getUserList(getState()).reduce(
        (acc, u) => u.email === email ? acc : Object.assign(acc, { [u.id]: u })
      , {})
      dispatch(replace({ users }))
    })
  }
}

export function createUser(data) {
  return dispatch => {
    dispatch(commAttempt(DOMAIN))
    return post(`${ENDPOINT}/create`, data)
    .then(() => {
      dispatch(commSuccess(DOMAIN))
      dispatch(setUIElement('myAccount', 'user', true))
      setTimeout(() => dispatch(deleteUIElements('myAccount', ['user'])), 3000)
    }, err => dispatch(commError(DOMAIN, err)))
  }
}

export function updateUser(data) {
  return dispatch => {
    dispatch(commAttempt(DOMAIN))
    return post(`${ENDPOINT}/update`, data)
    .then(() => {
      dispatch(commSuccess(DOMAIN))
      dispatch(setUIElement('myAccount', 'user', true))
      setTimeout(() => dispatch(deleteUIElements('myAccount', ['user'])), 3000)
    }, err => dispatch(commError(DOMAIN, err)))
  }
}
