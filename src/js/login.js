import { getUsers } from "../../services/getUsers";

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault(); //<--- esto previene de recargar la pagina (Eidrian)

    const usuario = document.getElementById("usuario1").value;
    const email = document.getElementById("Email1").value;
    const contrasenia = document.getElementById("Password1").value;

    if (!email || !contrasenia || !usuario) { // <--- esto es para validar si esta vacio (Eidrian)
        console.log("Por favor, complete todos los campos.");
        return;
    }

    try { // <--- esto es como un bloque que hace el "intento" de correr el codigo si esto falla va el catch (Eidrian)
        const users = await getUsers();
        
        const validUser = users.some( // <--- el some es como el find busca dentro de un array si hay algo parecido a lo que pide la tarea especifica (Eidrian)
            (user) => user.email === email && user.contrasenia === contrasenia && user.usuario == usuario);
            
        if (validUser) {
            console.log("Inicio de sesión exitoso.");
            localStorage.setItem('iniciado', 'true');
            window.location.href = 'consultas.html'
        } else {
            popver.classList.add('visible');// esto agrega la clase al popover para qe se muestre 
            console.log("Usuario o contraseña incorrectos.");
        }
    } catch (error) { //<--- esto pasa si el try falla al correr el codigo e imprime un codigo de especificamente error en la consola (Eidrian)
        console.error("Error en la validación:", error);
        console.log("Hubo un problema con la validación. Inténtelo de nuevo.");
    }
});

btnClose.addEventListener('click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe al cerrar el popover
    popver.classList.remove('visible'); // Ocultar el popover
});
//me da risa como los comento porque parece que fuese por chatgpt pero no, esto lo investigue y comente yo(Eidrian) el codigo es de pipe