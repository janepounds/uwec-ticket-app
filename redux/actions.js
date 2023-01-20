import axios from 'axios';
export const POST_TICKET = 'POST_TICKET';
export const VERIFY_TICKET = 'VERIFY_TICKET';
const API_URL = 'https://127.0.0.1:3000/verifyticket';
const PARAMS = 'page=1';
const BASE_URL = `${API_URL}`;

export const postTicket = () => {
  try {
    return async dispatch => {
      const res = await axios.get('https://application-mock-server.loca.lt/postticket');
      if (res.data) {
        dispatch({
          type: POST_TICKET,
          payload: res.data,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
  }
};


export const verifyTicket = () => {
  try {
    return async dispatch => {
      const res = await axios.get('https://application-mock-server.loca.lt/verifyticket');
      if (res.data) {
        dispatch({
          type: VERIFY_TICKET,
          payload: res.data,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
  }
};