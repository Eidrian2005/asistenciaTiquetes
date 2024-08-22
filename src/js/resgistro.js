import {postUsers} from '../../services/postUsers.js'  
import { getUsers } from "../../services/getUsers"

const guardar = document.getElementById('guardar')
const usuario = document.getElementById('usuario1')
const email = document.getElementById('Email1')
const contrasenia = document.getElementById('Password1')

guardar.addEventListener('click', async (event) =>{
    event.preventDefault() // <--- esto evita que la pagina se recarge por si sola xd no olvidar
    if (usuario.value != '' && email.value != '' && contrasenia != '') {

        const users = await getUsers() // la funcion debe tener el await y el async para que sea asincronica si no causa error-
        //y no me busca el usuario para realizar la validacion

            const userRegistered = users.find(user => user.email === email.value) // <---- usa un .find para buscar el users 

            if (userRegistered) {  // <-- validacion para evitar que se repitan usuarios
            console.log('Usuario ya registrado');
            }else{
            postUsers(usuario.value, email.value, contrasenia.value)
            window.location.href = 'login.html' // <-- para redirigir a la siguiente pagina
            }

    }else{
        console.log("no se pueden registrar campos vacios");
        
    }
})






