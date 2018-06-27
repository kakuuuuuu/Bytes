import { GET_LANGUAGES,
         ADD_LANGUAGE,
         UPDATE_LANGUAGE,
         ADD_LANGUAGE_PROJECT,
         DELETE_LANGUAGE,
         DELETE_PROJECT,
         ADD_NOTE,
         DELETE_NOTE
        } from '../actions/types';

const INITIAL_STATE = []

export default function languages (state = INITIAL_STATE, action) {
  const { data } = action
  switch(action.type) {
    case GET_LANGUAGES:
      return data
    case ADD_LANGUAGE:
      return [
        ...state,
        data
      ]
    case UPDATE_LANGUAGE:
      return state.map((obj) => {
        if(obj._id === data._id){
          return data
        } else {
          return obj
        }
      })
    case ADD_LANGUAGE_PROJECT:
      return state.map((obj) => {
        if(obj._id === data.language_id){
          return {
            ...obj,
            '_projects': [
              ...obj['_projects'],
              data.project_id
            ]
          }
        } else{
          return obj
        }
      })
    case DELETE_LANGUAGE:
      return state.filter((obj) => obj._id !== data)
    case DELETE_PROJECT:
      return state.map((obj) => {
        if(obj._projects.map(project => project._id).includes(data)){
          return {
            ...obj,
            '_projects': obj._projects.filter(project => project._id !== data)
          }
        } else{
          return obj
        }
      })
    case ADD_NOTE:
      return state.map((obj) => {
        if(obj._id === data._language){
          return {
            ...obj,
            '_notes': [
              ...obj['_notes'],
              data
            ]
          }
        } else{
          return obj
        }
      })
    case DELETE_NOTE:
      return state.map((obj) => {
        if(obj._notes.map(note => note._id).includes(data)){
          return {
            ...obj,
            '_notes': obj._notes.filter(note => note._id !== data)
          }
        } else{
          return obj
        }
      })
    default:
      return state
  }
}
