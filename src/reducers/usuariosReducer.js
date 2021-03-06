import { GET_USERS, LOAD_USERS, ERROR_USERS } from '../types/usuariosTypes';
const INITIAL_STATE = {
  usuarios: [],
  cargando: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        usuarios: action.payload,
        cargando: false,
        error: '',
      };
    case LOAD_USERS:
      return {
        ...state,
        cargando: true,
      };
    case ERROR_USERS:
      return {
        ...state,
        error: action.payload,
        cargando: false,
      };
    default:
      return state;
  }
};
