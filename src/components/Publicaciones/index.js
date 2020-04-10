import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listaUsuarios } from '../../actions/usuariosActions';
import {
  listaPublicacionesPorUsuario,
  abrirCerrar,
  traerComentarios,
} from '../../actions/publicacionesActions';
import Cargando from '../general/Spinner';
import Error from '../general/Fatal';
import Comentarios from './Comentarios';

class Publicaciones extends Component {
  async componentDidMount() {
    const {
      listaUsuarios,
      listaPublicacionesPorUsuario,
      match: {
        params: { key },
      },
    } = this.props;

    if (!this.props.usuarios.length) {
      await listaUsuarios();
    }
    if (this.props.error) {
      return;
    }
    if (!('publicaciones_key' in this.props.usuarios[key])) {
      listaPublicacionesPorUsuario(key);
    }
  }

  ponerUsuario = () => {
    const {
      usuarios,
      cargando,
      error,
      match: {
        params: { key },
      },
    } = this.props;

    if (error) {
      return <Error mensaje={error} />;
    }
    if (!usuarios.length || cargando) {
      return <Cargando />;
    }
    const nombre = usuarios[key].name;
    return <h1>Publicaciones de {nombre}</h1>;
  };

  ponerPublicaciones = () => {
    const {
      usuarios,
      error,
      match: {
        params: { key },
      },
      publicaciones,
      cargandoPublicaciones,
      errorPublicaciones,
    } = this.props;

    if (!usuarios.length) {
      return;
    }
    if (error) {
      return;
    }
    if (cargandoPublicaciones) {
      return <Cargando />;
    }
    if (errorPublicaciones) {
      return <Error mensaje={errorPublicaciones} />;
    }
    if (!publicaciones.length) {
      return <Cargando />;
    }
    if (!('publicaciones_key' in usuarios[key])) {
      return;
    }
    const { publicaciones_key } = usuarios[key];
    return this.mostrarInfo(
      publicaciones[publicaciones_key],
      publicaciones_key
    );
  };

  mostrarInfo = (publicaciones, publicacion_key) => {
    return publicaciones.map((publicacion, comment_key) => {
      return (
        <div
          key={publicacion.id}
          className='pub_titulo'
          onClick={() =>
            this.mostrarComentarios(
              publicacion_key,
              comment_key,
              publicacion.comentarios
            )
          }
        >
          <h2>{publicacion.title}</h2>
          <p>{publicacion.body}</p>
          {publicacion.abierto ? (
            <Comentarios comentarios={publicacion.comentarios} />
          ) : (
            ''
          )}
        </div>
      );
    });
  };

  mostrarComentarios = (publicacion_key, comment_key, comentarios) => {
    this.props.abrirCerrar(publicacion_key, comment_key);
    if (!comentarios.length) {
      this.props.traerComentarios(publicacion_key, comment_key);
    }
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {this.ponerUsuario()}
        {this.ponerPublicaciones()}
      </div>
    );
  }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
  return {
    usuarios: usuariosReducer.usuarios,
    cargando: usuariosReducer.cargando,
    error: usuariosReducer.error,
    publicaciones: publicacionesReducer.publicaciones,
    cargandoPublicaciones: publicacionesReducer.cargando,
    errorPublicaciones: publicacionesReducer.error,
  };
};
const mapDispatchToProps = {
  listaUsuarios,
  listaPublicacionesPorUsuario,
  abrirCerrar,
  traerComentarios,
};
export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
