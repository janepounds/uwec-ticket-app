import {POST_TICKET} from './actions';
const initialState = {
  tickets: [],
  favorites: [],
};
function ticketsReducer(state = initialState, action) {
  switch (action.type) {
    case POST_TICKET:
      return {...state, tickets: action.payload};
    default:
      return state;
  }
}
export default ticketsReducer;