import {
  GET_TAREAS,
  LOAD_TAREAS,
  ERROR_TAREAS,
  CHANGE_USERID_TAREAS,
  CHANAGE_TITULO_TAREAS,
  SAVE_TAREAS,
  UPDATE_TAREA,
  CLEAN_FORM,
} from '../types/tareasTypes';
const INITIAL_STATE = {
  tareas: {},
  cargando: false,
  error: '',
  usuario_id: '',
  titulo: '',
  regresar: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TAREAS:
      return {
        ...state,
        tareas: action.payload,
        cargando: false,
        error: '',
        regresar: false,
      };
    case LOAD_TAREAS:
      return {
        ...state,
        cargando: true,
      };
    case ERROR_TAREAS:
      return {
        ...state,
        error: action.payload,
        cargando: false,
      };
    case CHANGE_USERID_TAREAS:
      return {
        ...state,
        usuario_id: action.payload,
      };
    case CHANAGE_TITULO_TAREAS:
      return {
        ...state,
        titulo: action.payload,
      };
    case SAVE_TAREAS:
      return {
        ...state,
        tareas: {},
        cargando: false,
        error: '',
        regresar: true,
        usuario_id: '',
        titulo: '',
      };
    case UPDATE_TAREA:
      return {
        ...state,
        tareas: action.payload,
      };
    case CLEAN_FORM:
      return {
        ...state,
        usuario_id: '',
        titulo: '',
      };
    default:
      return state;
  }
};
