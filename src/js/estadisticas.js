import {postUsers} from '../../services/postUsers.js';
import { getUsers } from "../../services/getUsers";
import { postHist } from '../../services/postHist.js';
import { getHist } from '../../services/getHist.js';
import { deleteHist } from '../../services/deleteHist.js';
 


const btnPrin = document.getElementById('btnPrin')

btnPrin.addEventListener('click', function () {
    window.location.href = 'consultas.html'
})

async function mostrarConsultas() {
    const consultas = await getHist(); 

    const tabla = document.getElementById("tabla");
    

    if (consultas.length === 0) {
        alert("No hay consultas para mostrar.");
        return;
    }

    consultas.forEach((consulta) => {
        const tdConsulta = document.createElement('tr');
        tdConsulta.className = 'consulta';

        // Verificación de la hora antes de construir la cadena fechaHora
        const fecha = consulta.hora ? `${consulta.fecha}` : consulta.fecha;
        const Hora = consulta.hora ? ` ${consulta.hora}` : consulta.hora;

        tdConsulta.innerHTML = `
            <td><button class="btnBorrar">Eliminar</button></td>
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
                // Asegúrate de pasar el ID de la consulta al llamar a deleteHist
                await deleteHist(consulta.id); 
                tdConsulta.remove(); // Elimina el elemento del DOM si la eliminación es exitosa
            } catch (error) {
                console.error('Error al eliminar la consulta:', error);
                alert('No se pudo eliminar la consulta. Por favor, intente de nuevo.');
            }
        });
    });
}


mostrarConsultas();

