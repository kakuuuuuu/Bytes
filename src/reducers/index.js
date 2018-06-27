import { combineReducers } from 'redux';
import user from './user_reducer';
import languages from './language_reducer'
import projects from './project_reducer'

const rootReducer = combineReducers({
  user,
  languages,
  projects,
});

export default rootReducer;
