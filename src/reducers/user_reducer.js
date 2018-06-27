import { AUTH_USER,
         LOGOUT_USER,
         ERROR_USER
        } from '../actions/types';

const INITIAL_STATE = { data: {}, message:'', authenticated: false}

export default function user (state = INITIAL_STATE, action) {
  const { data } = action
  switch(action.type) {
    case AUTH_USER:
      if(data.success === true){
        return {
          data: data.user,
          message: '',
          authenticated: true
        }
      } else {
        return {
          ...state,
          message: data.msg
        }
      }
    case LOGOUT_USER:
      return INITIAL_STATE
    case ERROR_USER:
      return {
        ...state,
        message: data.status + " " + data.error
      }
    default:
      return state
  }
}
