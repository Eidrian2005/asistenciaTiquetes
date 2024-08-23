import {postUsers} from '../../services/postUsers.js';
import { getCons } from "../../services/obtenerCons.js"
import { getUsers } from "../../services/getUsers";



async function obtenerConsulta() {
    const usuario = await getCons()

    usuario.forEach(usuario => {
        console.log(usuario.usuario);
    });
}

obtenerConsulta()




/*addEventListener('click', function () {
    
})*/





