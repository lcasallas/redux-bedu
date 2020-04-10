import {
  GET_POSTS_USER,
  LOAD_POSTS,
  ERROR_POSTS,
  UPDATE_COMMENT,
  LOAD_COMMENTS,
  ERROR_COMMENTS,
} from '../types/publicacionesTypes';

const INITIAL_STATE = {
  publicaciones: [],
  cargando: false,
  error: '',
  com_cargando: false,
  com_error: '',
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
    case UPDATE_COMMENT:
      return {
        ...state,
        publicaciones: action.payload,
        com_cargando: false,
        com_error: '',
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
    case LOAD_COMMENTS:
      return {
        ...state,
        com_cargando: true,
      };
    case ERROR_COMMENTS:
      return {
        ...state,
        com_error: action.payload,
        com_cargando: false,
      };
    default:
      return state;
  }
};
