import React from 'react';
import { connect } from 'react-redux';

const Tabla = (props) => {
	const ponerFilas = (usuarios) => {
		return usuarios.map((usuario, idx) => (
			<tr key={idx}>
				<td>{usuario.name}</td>
				<td>{usuario.email}</td>
				<td>{usuario.website}</td>
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
