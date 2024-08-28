import {postUsers} from '../../services/postUsers.js';
import { getUsers } from "../../services/getUsers";
import { postHist } from '../../services/postHist.js';
import { getHist } from '../../services/getHist.js';
import { deleteHist } from '../../services/deleteHist.js';

async function mostrarConsultas() {
    const consultas = await getHist(); // Obtener datos del historial

    const tabla = document.getElementById("tabla");
    

    if (consultas.length === 0) {
        alert("No hay consultas para mostrar.");
        return;
    }

    consultas.forEach((consulta, index) => {
        const tdConsulta = document.createElement('tr');
        const btnEliminar = document.createElement('button')
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
        tabla.appendChild(tdConsulta)


        btnEliminar.addEventListener('click', async function () {
            
            const eliminar = await deleteHist()
            
        })
    });

}

mostrarConsultas()







