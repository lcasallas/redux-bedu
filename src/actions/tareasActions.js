import axios from 'axios';
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
import { GET_USERS } from '../types/usuariosTypes';

export const listaTareas = () => async (dispatch) => {
  dispatch({
    type: LOAD_TAREAS,
  });
  try {
    const respuesta = await axios.get(
      'https://jsonplaceholder.typicode.com/todos'
    );
    const tareas = {};
    respuesta.data.map((item) => {
      tareas[item.userId] = {
        ...tareas[item.userId],
        [item.id]: {
          ...item,
        },
      };
    });
    dispatch({
      type: GET_TAREAS,
      payload: tareas,
    });
  } catch (error) {
    console.error('[error]', error.message);
    dispatch({
      type: ERROR_TAREAS,
      payload: '[Error] Informacion de Tareas no disponible!',
    });
  }
};

export const cambioUsuarioId = (usuarioId) => (dispatch) => {
  dispatch({
    type: CHANGE_USERID_TAREAS,
    payload: usuarioId,
  });
};

export const cambioTitulo = (titulo) => (dispatch) => {
  dispatch({
    type: CHANAGE_TITULO_TAREAS,
    payload: titulo,
  });
};

export const agregarTarea = (nueva_tarea) => async (dispatch) => {
  dispatch({
    type: LOAD_TAREAS,
  });
  try {
    const respuesta = await axios.post(
      'https://jsonplaceholder.typicode.com/todos',
      nueva_tarea
    );
    dispatch({
      type: SAVE_TAREAS,
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: ERROR_TAREAS,
      payload: '[Error] intente mas tarde',
    });
  }
};

export const editarTarea = (tarea_editada) => async (dispatch) => {
  dispatch({
    type: LOAD_TAREAS,
  });
  try {
    const respuesta = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`,
      tarea_editada
    );
    dispatch({
      type: SAVE_TAREAS,
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: ERROR_TAREAS,
      payload: '[Error] intente mas tarde',
    });
  }
};

export const cambioCheck = (userId, tareaId) => (dispatch, getState) => {
  const { tareas } = getState().tareasReducer;
  const seleccionada = tareas[(userId, tareaId)];
  const actualizadas = {
    ...tareas,
  };
  actualizadas[userId] = {
    ...tareas[userId],
  };
  actualizadas[userId][tareaId] = {
    ...tareas[userId][tareaId],
    completed: !seleccionada.completed,
  };

  dispatch({
    type: UPDATE_TAREA,
    payload: actualizadas,
  });
};

export const eliminarTarea = (tareaId) => async (dispatch) => {
  dispatch({
    type: LOAD_TAREAS,
  });

  try {
    const respuesta = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${tareaId}`
    );
    dispatch({
      type: GET_TAREAS,
      payload: {},
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: ERROR_TAREAS,
      payload: '[Error] intente mas tarde',
    });
  }
};

export const limpiarForm = () => (dispatch) => {
  dispatch({
    type: CLEAN_FORM,
  });
};
