import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action){
  switch (action.type){
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    case FETCH_POST:  
      return {...state, [action.payload.data.id]: action.payload.data};
    case DELETE_POST:
      // Return a object similar to 1st argument but with the 2nd argument omitted (similar to filter)
      return _.omit(state, action.payload);
    default:
      return state;
  }
}