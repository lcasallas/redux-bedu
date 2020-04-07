import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listaUsuarios } from '../../actions/usuariosActions';

class Usuarios extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     usuarios: [],
  //   };
  // }

  componentDidMount() {
    this.props.listaUsuarios();
  }

  ponerFilas = () => {
    return this.props.usuarios.map((usuario, idx) => (
      <tr key={idx}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
      </tr>
    ));
  };

  render() {
    console.log(this.props);

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
          <tbody>{this.ponerFilas()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return {
    usuarios: reducers.usuariosReducer.usuarios,
  };
};

const mapDispatchToProps = {
  listaUsuarios,
};

export default connect(mapStateToProps, mapDispatchToProps)(Usuarios);
