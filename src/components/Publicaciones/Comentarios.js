import React from 'react';

const Comentarios = (props) => {
  const ponerComentarios = () => {
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
export default Comentarios;
