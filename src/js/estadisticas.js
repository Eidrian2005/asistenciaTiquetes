import { getHist } from '../../services/getHist.js';
import { deleteHist } from '../../services/deleteHist.js';


const inputBusca = document.getElementById('buscador')
const btnPrin = document.getElementById('btnPrin')

if (localStorage.getItem('iniciado') !== 'true') { //esto valida si alguien a iniciado sesion 
     window.location.href = 'login.html'; //si no estas iniciado te redirige a la pagina login
}

btnPrin.addEventListener('click', function () { //boton de redireccion a la pagina principal
    window.location.href = 'consultas.html'
})

async function mostrarConsultas() {
    const consultas = await getHist(); 

    const tabla = document.getElementById("tabla");

    if (consultas.length === 0) {
        popver.classList.add('visible');
        return;
    }

    consultas.forEach((consulta) => {
        const tdConsulta = document.createElement('tr');
        tdConsulta.className = 'consulta';

        const fecha = consulta.hora ? `${consulta.fecha}` : consulta.fecha;
        const Hora = consulta.hora ? ` ${consulta.hora}` : consulta.hora;

        tdConsulta.innerHTML = `
            <td><button class="btnBorrar">Eliminar</button></td>
            <td>${consulta.usuario}</td>
            <td>${consulta.consulta}</td>
            <td>${consulta.detalle}</td>
            <td>${consulta.tipo}</td>
            <td>${fecha}</td>
            <td>${Hora}</td>
        `;
        tabla.appendChild(tdConsulta);

        const btnEliminar = tdConsulta.querySelector('.btnBorrar');

        btnEliminar.addEventListener('click', async function () {
            try {
                // pasa el ID de la consulta al llamar a deleteHist
                await deleteHist(consulta.id); 
                tdConsulta.remove(); // Elimina el elemento del DOM 
            } catch (error) {
                console.error('Error al eliminar la consulta:', error);
                console.log('No se pudo eliminar la consulta. Por favor, intente de nuevo.');
            }
        });
    });
}
btnClose.addEventListener('click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe
    popver.classList.remove('visible'); // Ocultar el popover
});

mostrarConsultas();

