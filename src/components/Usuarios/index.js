import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listaUsuarios } from '../../actions/usuariosActions';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import Tabla from './Tabla';

class Usuarios extends Component {
  componentDidMount() {
    if (!this.props.usuarios.length) {
      this.props.listaUsuarios();
    }
  }

  ponerContenido = () => {
    if (this.props.cargando) {
      return <Spinner />;
    }
    if (this.props.error) {
      return <Fatal mensaje={this.props.error} />;
    }
    return <Tabla />;
  };

  render() {
    console.log(this.props);

    return (
      <div>
        <h1>Usuarios</h1>
        {this.ponerContenido()}
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return {
    usuarios: reducers.usuariosReducer.usuarios,
    cargando: reducers.usuariosReducer.cargando,
    error: reducers.usuariosReducer.error,
  };
};

const mapDispatchToProps = {
  listaUsuarios,
};

export default connect(mapStateToProps, mapDispatchToProps)(Usuarios);
