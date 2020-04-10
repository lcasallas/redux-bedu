import React from 'react';
import Cargando from '../general/Spinner';
import Error from '../general/Fatal';
import { connect } from 'react-redux';

const Comentarios = (props) => {
  const ponerComentarios = () => {
    if (props.error) {
      return <Error mensaje={props.error} />;
    }
    if (props.cargando && !props.comentarios.length) {
      return <Cargando />;
    }
    return props.comentarios.map((comentario) => {
      return (
        <li>
          <b>
            <u>{comentario.email}</u>
          </b>
          <br />
          <p>{comentario.body}</p>
        </li>
      );
    });
  };
  return <ul>{ponerComentarios()}</ul>;
};

const mapStateToProps = (reducers) => {
  return {
    cargando: reducers.publicacionesReducer.com_cargando,
    error: reducers.publicacionesReducer.com_error,
  };
};
export default connect(mapStateToProps, null)(Comentarios);
