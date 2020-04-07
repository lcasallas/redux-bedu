import axios from 'axios';
import { LISTAR_USUARIOS, CARGANDO, ERROR } from '../types/usuariosTypes';
export const listaUsuarios = () => async (dispatch) => {
	dispatch({
		type: CARGANDO,
	});
	try {
		const respuesta = await axios.get(
			'https://jsonplaceholder.typicode.com/users'
		);
		dispatch({
			type: LISTAR_USUARIOS,
			payload: respuesta.data,
		});
	} catch (error) {
		console.error('[error]', error.message);
		dispatch({
			type: ERROR,
			payload: '[Error] Algo salio mal intente mas tarde!',
		});
	}
};
