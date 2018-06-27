import * as API from '../utils/api'
import cookie from 'react-cookie';
import {
  AUTH_USER,
  LOGOUT_USER,
  ERROR_USER,
  GET_LANGUAGES,
  ADD_LANGUAGE,
  UPDATE_LANGUAGE,
  DELETE_LANGUAGE,
  GET_PROJECTS,
  ADD_PROJECT,
  ADD_LANGUAGE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  ADD_NOTE,
  DELETE_NOTE
} from './types';


export const registerUser = (data) => dispatch => (
  API.registerUser(data)
    .then(response => {
      if(response.status !== 200){
        dispatch(errorUser({ status: response.status, error: response.statusText }))
      }
      return response.json()
    }).then(response => {
      if(response.success !== false){
        cookie.save('token', response.token)
        dispatch(receiveUser(response))
        dispatch(getLanguages(response.user._id))
        dispatch(getProjects(response.user._id))
        return {status: true, msg: ''}
      }
      return {status: false, msg: response.msg}
    })
)

export const loginUser = (data) => dispatch => (
  API.loginUser(data)
    .then(response => {
      if(response.status !== 200){
        dispatch(errorUser({ status: response.status, error: response.statusText }))
      }
      return response.json()
    }).then(response => {
      if(response.success !== false){
        cookie.save('token', response.token)
        dispatch(receiveUser(response))
        dispatch(getLanguages(response.user._id))
        dispatch(getProjects(response.user._id))
        return {status: true, msg: ''}
      }else{
        return {status: false, msg: "Email or Password are incorrect."}
      }
    })
)

export const receiveUser = data => ({
  type: AUTH_USER,
  data
})

export const logoutUser = () => ({
  type: LOGOUT_USER,
})

export const errorUser = (data) => ({
  type: ERROR_USER,
  data
})

export const getLanguages = (id) => dispatch => (
  API.getLanguages(id, cookie.load('token'))
    .then(response => response.json())
    .then(response => {
      if(response.success !== false){
        console.log(response)
        dispatch(receiveLanguages(response.languages))
      }
    })
)

export const receiveLanguages = data => ({
  type: GET_LANGUAGES,
  data
})

export const addLanguage = (data) => dispatch => (
  API.addLanguage(data, cookie.load('token'))
    .then(response => response.json())
    .then(response => {
      if(response.success !== false){
        dispatch(receiveNewLanguage(response.language))
      }
    })
)

export const receiveNewLanguage = data => ({
  type: ADD_LANGUAGE,
  data
})

export const updateLanguage = (data) => dispatch => (
  API.updateLanguage(data, cookie.load('token'))
    .then(response => response.json())
    .then(response => {
      if(response.success !== false){
        dispatch(receiveUpdateLanguage(response.language))
      }
    })
)

export const receiveUpdateLanguage = data => ({
  type: UPDATE_LANGUAGE,
  data
})

export const deleteLanguage = (id) => dispatch => (
  API.deleteLanguage(id, cookie.load('token'))
    .then(response => response.json())
    .then(response => {
      if(response.success !== false){
        dispatch(receiveDeleteLanguage(id))
      }
    })
)

export const receiveDeleteLanguage = data => ({
  type: DELETE_LANGUAGE,
  data
})


export const getProjects = (id) => dispatch => (
  API.getProjects(id, cookie.load('token'))
    .then(response => response.json())
    .then(response => {
      if(response.success !== false){
        console.log(response.projects)
        dispatch(receiveProjects(response.projects))
      }
    })
)

export const receiveProjects = data => ({
  type: GET_PROJECTS,
  data
})

export const addProject = (data) => dispatch => (
  API.addProject(data, cookie.load('token'))
    .then(response => response.json())
    .then(response => {
      if(response.success !== false){
        dispatch(receiveNewProject(response.project))
      }
    })
)

export const receiveNewProject = data => ({
  type: ADD_PROJECT,
  data
})

export const addLanguageProject = (data) => dispatch => (
  API.addLanguageToProject(data, cookie.load('token'))
    .then(response => response.json())
    .then(response => {
      if(response.success !== false){
        dispatch(receiveLanguageProject(data))
      }
    })
)

export const receiveLanguageProject = data => ({
  type: ADD_LANGUAGE_PROJECT,
  data
})

export const deleteProject = (id) => dispatch => (
  API.deleteProject(id, cookie.load('token'))
    .then(response => response.json())
    .then(response => {
      if(response.success !== false){
        dispatch(receiveDeleteProject(id))
      }
    })
)

export const receiveDeleteProject = data => ({
  type: DELETE_PROJECT,
  data
})

export const addNote = (data) => dispatch => (
  API.addNote(data, cookie.load('token'))
    .then(response => response.json())
    .then(response => {
      if(response.success !== false){
        dispatch(receiveNewNote(response.note))
      }
    })
)

export const receiveNewNote = data => ({
  type: ADD_NOTE,
  data
})

export const deleteNote = (id) => dispatch => (
  API.deleteNote(id, cookie.load('token'))
    .then(response => response.json())
    .then(response => {
      if(response.success !== false){
        dispatch(receiveDeleteNote(id))
      }
    })
)

export const receiveDeleteNote = data => ({
  type: DELETE_NOTE,
  data
})
