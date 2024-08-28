import { postCons } from '../../services/postCons.js';
import { getCons } from '../../services/obtenerCons.js';
import { getUsers } from '../../services/getUsers.js';
import { postHist } from '../../services/postHist.js';


let nombre = localStorage.getItem("usuario")




if (localStorage.getItem('iniciado') !== 'true') {
  window.location.href = 'login.html';
}

const consultas = [];
const btnAgregar = document.getElementById('btnAgregar')
const btnMostrar = document.getElementById('btnMostrar')


btnAgregar.addEventListener('click',function () {
  agregarConsulta()
})

btnMostrar.addEventListener('click',function () {
  mostrarConsultas() 
})






async function agregarConsulta() {

  const usuario = await getUsers()


  const nombreUsuario = usuario[0].usuario; //funciona cuando solo hay un usuario en la lista
console.log(nombreUsuario);


  /*zona de inputs*/
  const consulta = document.getElementById("consulta").value;
  const detalle = document.getElementById("consultatexto").value;
  const tipo = document.getElementById("tipo-consulta").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
/*fin de zona de inputs*/

  if (!consulta || !detalle || !tipo || !fecha || !hora) {
    alert("Por favor, complete todos los campos antes de agregar la consulta.");
    return;
  }

  postCons(usuario.usuario, consulta, detalle, tipo, fecha, hora)
  postHist(usuario.usuario, consulta, detalle, tipo, fecha, hora)
  const consulta1 = {
    nombre: usuario.usuario,
    consulta: consulta,
    detalle: detalle,
    tipo: tipo,
    fechaHora: `${fecha} ${hora}`
    
  };

  consultas.push(consulta1);

  document.getElementById("consulta").value = '';
  document.getElementById("consultatexto").value = '';
  document.getElementById("tipo-consulta").value = '';
  document.getElementById("fecha").value = '';
  document.getElementById("hora").value = '';


}



async function mostrarConsultas() {


  const consultas = await getCons();

  const contenedor = document.getElementById("consulta-contenedor");
  contenedor.innerHTML = ''; 

  if (consultas.length === 0) {
    alert("No hay consultas para mostrar.");
    return;
  }


  consultas.forEach((consulta, index) => {
    const divConsulta = document.createElement('div');
    divConsulta.className = 'consulta';

    const fechaHora = consulta.hora ? `${consulta.fecha} ${consulta.hora}` : consulta.fecha;

    divConsulta.innerHTML = `
    <div class= "btnEli"><button>Eliminar</button></div>
    <div class="consulta-nombre">Nombre: ${JSON.stringify(nombre)}</div>
      <div class="consulta-nombre">Consulta: ${consulta.consulta}</div>
      <div class="consulta-detalle">Detalles: ${consulta.detalle}</div>
      <div class="consulta-tipo">Tipo: ${consulta.tipo}</div>
      <div class="consulta-fecha">Fecha y Hora: ${fechaHora}</div>
    `;
    contenedor.appendChild(divConsulta);
  });

  contenedor.style.display = "block";
}
