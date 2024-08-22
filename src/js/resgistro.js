import {postUsers} from '../../services/postUsers.js'  
import { getUsers } from "../../services/getUsers"

const guardar = document.getElementById('guardar')
const usuario = document.getElementById('usuario1')
const email = document.getElementById('Email1')
const contrasenia = document.getElementById('Password1')
const popver = document.getElementById('popover')
const botonClose = document.getElementById('btnClose')

guardar.addEventListener('click', async (event) =>{
    event.preventDefault() // <--- esto evita que la pagina se recarge por si sola xd no olvidar (Eidrian)
    if (usuario.value != '' && email.value != '' && contrasenia != '') {

        const users = await getUsers() // la funcion debe tener el await y el async para que sea asincronica si no causa error- (Eidrian)
        //y no me busca el usuario para realizar la validacion (Eidrian)

            const userRegistered = users.find(user => user.email === email.value) // <---- usa un .find para buscar el users (Eidrian)

            if (userRegistered) {  // <-- validacion para evitar que se repitan usuarios
                console.log('Usuario ya registrado')
                
                if(popver.style.display === 'none' || popver.style.display === '') {
                    
                    popver.style.display = 'block';
                }else{
                    botonClose.addEventListener('click', function () {
                        if (popver.style.display === 'block') {
                            popver.style.display = 'none'
                        }
                    })
                }

            }else{
                postUsers(usuario.value, email.value, contrasenia.value)
                window.location.href; // <-- para redirigir a la siguiente pagina (Eidrian)
            }

    }else{
        console.log("no se pueden registrar campos vacios");
        
    }
})