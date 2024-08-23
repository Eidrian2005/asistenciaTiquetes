import { postCons } from '../../services/postCons.js';

const consultas = [];

function agregarConsulta() {
  const nombreEstudiante = document.getElementById("nombrestudiante").value;
  const consultaTexto = document.getElementById("consultatexto").value;
  const tipoConsulta = document.getElementById("tipo-consulta").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;


  if (!nombreEstudiante || !consultaTexto || !tipoConsulta || !fecha || !hora) {
    alert("Por favor, complete todos los campos antes de agregar la consulta.");
    return;
  }


  const consulta = {
    nombre: nombreEstudiante,
    detalle: consultaTexto,
    tipo: tipoConsulta,
    fechaHora: `${fecha} ${hora}`
  };

  consultas.push(consulta);

  document.getElementById("nombrestudiante").value = '';
  document.getElementById("consultatexto").value = '';
  document.getElementById("tipo-consulta").value = '';
  document.getElementById("fecha").value = '';
  document.getElementById("hora").value = '';
}

function mostrarConsultas() {
  const contenedor = document.getElementById("consulta-contenedor");
  contenedor.innerHTML = ''; 

  if (consultas.length === 0) {
    alert("No hay consultas para mostrar.");
    return;
  }


  consultas.forEach((consulta, index) => {
    const divConsulta = document.createElement('div');
    divConsulta.className = 'consulta';
    divConsulta.innerHTML = `
      <div class="consulta-nombre">Nombre: ${consulta.nombre}</div>
      <div class="consulta-detalle">Consulta: ${consulta.detalle}</div>
      <div class="consulta-tipo">Tipo: ${consulta.tipo}</div>
      <div class="consulta-fecha">Fecha y Hora: ${consulta.fechaHora}</div>
    `;
    contenedor.appendChild(divConsulta);
  });

  contenedor.style.display = "block";
}
