import axios from 'axios';
import {
  GET_POSTS_USER,
  LOAD_POSTS,
  ERROR_POSTS,
} from '../types/publicacionesTypes';
import { GET_USERS } from '../types/usuariosTypes';

export const listaPublicacionesPorUsuario = (key) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: LOAD_POSTS,
  });

  const { usuarios } = getState().usuariosReducer;
  const { publicaciones } = getState().publicacionesReducer;
  const usuario_id = usuarios[key].id;

  try {
    const respuesta = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`
    );

    const nuevas = respuesta.data.map((publicacion) => {
      return {
        ...publicacion,
        comentarios: [],
        abierto: false,
      };
    });

    const publicacionesActualizadas = [...publicaciones, nuevas];

    dispatch({
      type: GET_POSTS_USER,
      payload: publicacionesActualizadas,
    });

    const publicaciones_key = publicacionesActualizadas.length - 1;

    const usuariosActualizados = [...usuarios];
    usuariosActualizados[key] = {
      ...usuarios[key],
      publicaciones_key,
    };

    dispatch({
      type: GET_USERS,
      payload: usuariosActualizados,
    });
  } catch (error) {
    console.error('[error]', error.message);
    dispatch({
      type: ERROR_POSTS,
      payload: '[Error] Publicaciones no disponible!',
    });
  }
};

export const abrirCerrar = (publicacion_key, comment_key) => (
  dispatch,
  getState
) => {
  const { publicaciones } = getState().publicacionesReducer;
  const seleccionada = publicaciones[publicacion_key][comment_key];
  const actualizada = {
    ...seleccionada,
    abierto: !seleccionada.abierto,
  };

  const publicacionesActualizadas = [...publicaciones];
  publicacionesActualizadas[publicacion_key] = [
    ...publicaciones[publicacion_key],
  ];
  publicacionesActualizadas[publicacion_key][comment_key] = actualizada;

  dispatch({
    type: GET_POSTS_USER,
    payload: publicacionesActualizadas,
  });
};

export const traerComentarios = (publicacion_key, comment_key) => async (
  dispatch,
  getState
) => {
  const { publicaciones } = getState().publicacionesReducer;
  const seleccionada = publicaciones[publicacion_key][comment_key];

  const respuesta = await axios.get(
    `https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`
  );

  const actualizada = {
    ...seleccionada,
    comentarios: respuesta.data,
  };

  const publicacionesActualizadas = [...publicaciones];
  publicacionesActualizadas[publicacion_key] = [
    ...publicaciones[publicacion_key],
  ];
  publicacionesActualizadas[publicacion_key][comment_key] = actualizada;

  dispatch({
    type: GET_POSTS_USER,
    payload: publicacionesActualizadas,
  });
};
