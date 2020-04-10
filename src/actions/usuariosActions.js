import axios from 'axios';
import { GET_USERS, LOAD_USERS, ERROR_USERS } from '../types/usuariosTypes';
export const listaUsuarios = () => async (dispatch) => {
  dispatch({
    type: LOAD_USERS,
  });
  try {
    const respuesta = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    dispatch({
      type: GET_USERS,
      payload: respuesta.data,
    });
  } catch (error) {
    console.error('[error]', error.message);
    dispatch({
      type: ERROR_USERS,
      payload: '[Error] Informacion de usuario no disponible!',
    });
  }
};
