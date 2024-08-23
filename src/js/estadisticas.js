import {postUsers} from '../../services/postUsers.js'  
import { getCons } from "../../services/getUsers"
import { getUsers } from "../../services/getUsers";


async function obtenerUsuario() {
    const usuario = await getCons()

    usuario.forEach(usuario => {
        console.log(usuario.usuario);
    });
}

obtenerUsuario()




/*addEventListener('click', function () {
    
})*/





