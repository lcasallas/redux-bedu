import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  listaTareas,
  cambioCheck,
  eliminarTarea,
} from '../../actions/tareasActions';
import Cargando from '../general/Spinner';
import Error from '../general/Fatal';

class Tareas extends Component {
  componentDidMount() {
    if (!Object.keys(this.props.tareas).length) {
      this.props.listaTareas();
    }
  }
  componentDidUpdate() {
    const { tareas, cargando, listaTareas } = this.props;
    if (!Object.keys(tareas).length && !cargando) {
      listaTareas();
    }
  }

  mostrarContenido = () => {
    const { tareas, cargando, error } = this.props;
    if (error) {
      return <Error mensaje={error} />;
    }
    if (cargando) {
      return <Cargando />;
    }
    return Object.keys(tareas).map((userId) => {
      return (
        <div key={userId}>
          <h2>Usuario {userId}</h2>
          <div className='contenedor_tareas'>{this.ponerTareas(userId)}</div>
        </div>
      );
    });
  };
  ponerTareas = (userId) => {
    const { tareas, cambioCheck, eliminarTarea } = this.props;
    const porUsuario = { ...tareas[userId] };

    return Object.keys(porUsuario).map((tareaId) => {
      return (
        <div key={tareaId} className='tarea-item'>
          <input
            type='checkbox'
            defaultChecked={porUsuario[tareaId].completed}
            onChange={() => cambioCheck(userId, tareaId)}
          />
          {porUsuario[tareaId].title}
          <Link to={`/tareas/guardar/${userId}/${tareaId}`}>
            <button className='m-left'>Editar</button>
          </Link>
          <button className='m-left' onClick={() => eliminarTarea(tareaId)}>
            Eliminar
          </button>
        </div>
      );
    });
  };
  render() {
    return (
      <div>
        <Link to='/tareas/guardar'>
          <button>Agregar</button>
        </Link>
        {this.mostrarContenido()}
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => {
  return {
    tareas: tareasReducer.tareas,
    cargando: tareasReducer.cargando,
    error: tareasReducer.error,
  };
};
const mapDispatchToProps = {
  listaTareas,
  cambioCheck,
  eliminarTarea,
};
export default connect(mapStateToProps, mapDispatchToProps)(Tareas);
