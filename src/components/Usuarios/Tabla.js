import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Tabla = (props) => {
  const ponerFilas = (usuarios) => {
    return usuarios.map((usuario, idx) => (
      <tr key={usuario.id}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
        <td>
          <Link to={`/publicaciones/${idx}`}>
            <div className='eye-solid icon'></div>
          </Link>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <table className='tabla'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>{ponerFilas(props.usuarios)}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (reducers) => {
  return {
    usuarios: reducers.usuariosReducer.usuarios,
  };
};
export default connect(mapStateToProps, null)(Tabla);
