import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  cambioUsuarioId,
  cambioTitulo,
  agregarTarea,
  editarTarea,
  limpiarForm,
} from '../../actions/tareasActions';
import Cargando from '../general/Spinner';
import Error from '../general/Fatal';

class Guardar extends Component {
  componentDidMount() {
    const {
      match: {
        params: { userId, tareaId },
      },
      tareas,
      cambioUsuarioId,
      cambioTitulo,
      limpiarForm,
    } = this.props;

    if (userId && tareaId) {
      const tarea = tareas[userId][tareaId];
      cambioUsuarioId(tarea.userId);
      cambioTitulo(tarea.title);
    } else {
      limpiarForm();
    }
  }

  handleCambioUsuario = (event) => {
    this.props.cambioUsuarioId(event.target.value);
  };
  handleCambioTitulo = (event) => {
    this.props.cambioTitulo(event.target.value);
  };

  guardar = () => {
    const {
      usuario_id,
      titulo,
      agregarTarea,
      match: {
        params: { userId, tareaId },
      },
      editarTarea,
      tareas,
    } = this.props;

    const nueva_tarea = {
      userId: usuario_id,
      title: titulo,
      completed: false,
    };

    if (userId && tareaId) {
      const tarea = tareas[userId][tareaId];
      const tarea_editada = {
        ...nueva_tarea,
        completed: tarea.completed,
        id: tarea.id,
      };
      editarTarea(tarea_editada);
    } else {
      agregarTarea(nueva_tarea);
    }
  };

  deshabilitar = () => {
    const { usuario_id, titulo, cargando } = this.props;
    if (cargando) {
      return true;
    }
    if (!usuario_id || !titulo) {
      return true;
    }
    return false;
  };

  mostrarAccion = () => {
    const { cargando, error } = this.props;
    if (cargando) {
      return <Cargando />;
    }
    if (error) {
      return <Error mensaje={error} />;
    }
  };

  render() {
    return (
      <div>
        {this.props.regresar ? <Redirect to='/tareas' /> : ''}
        <h1>Guardar Tarea</h1>
        Usuario id:
        <input
          type='number'
          value={this.props.usuario_id}
          onChange={this.handleCambioUsuario}
        />
        <br />
        <br />
        Titulo:
        <input
          type='text'
          value={this.props.titulo}
          onChange={this.handleCambioTitulo}
        />
        <br />
        <br />
        <button onClick={this.guardar} disabled={this.deshabilitar()}>
          Guardar
        </button>
        {this.mostrarAccion()}
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => {
  return {
    tareas: tareasReducer.tareas,
    usuario_id: tareasReducer.usuario_id,
    titulo: tareasReducer.titulo,
    cargando: tareasReducer.cargando,
    error: tareasReducer.error,
    regresar: tareasReducer.regresar,
  };
};
const mapDispatchToProps = {
  cambioUsuarioId,
  cambioTitulo,
  agregarTarea,
  editarTarea,
  limpiarForm,
};
export default connect(mapStateToProps, mapDispatchToProps)(Guardar);
