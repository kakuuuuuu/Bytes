import { GET_PROJECTS,
         ADD_PROJECT,
         UPDATE_PROJECT,
         ADD_LANGUAGE_PROJECT,
         DELETE_PROJECT,
         ADD_NOTE,
         DELETE_NOTE
        } from '../actions/types';

const INITIAL_STATE = []

export default function projects (state = INITIAL_STATE, action) {
  const { data } = action
  switch(action.type) {
    case GET_PROJECTS:
      return data
    case ADD_PROJECT:
      return [
        ...state,
        data
      ]
    case ADD_LANGUAGE_PROJECT:
      return state.map((obj) => {
        if(obj._id === data.project_id){
          return {
            ...obj,
            '_languages': [
              ...obj['_languages'],
              data.language_id
            ]
          }
        } else{
          return obj
        }
      })
    case DELETE_PROJECT:
      return state.filter((obj) => obj._id !== data)
    case ADD_NOTE:
      return state.map((obj) => {
        if(obj._id === data._project){
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
