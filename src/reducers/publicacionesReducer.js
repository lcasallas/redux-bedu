import {
  GET_POSTS_USER,
  LOAD_POSTS,
  ERROR_POSTS,
} from '../types/publicacionesTypes';

const INITIAL_STATE = {
  publicaciones: [],
  cargando: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POSTS_USER:
      return {
        ...state,
        publicaciones: action.payload,
        cargando: false,
        error: '',
      };
    case LOAD_POSTS:
      return {
        ...state,
        cargando: true,
      };
    case ERROR_POSTS:
      return {
        ...state,
        error: action.payload,
        cargando: false,
      };
    default:
      return state;
  }
};
