import { postCons } from '../../services/postCons.js';
import { getCons } from '../../services/obtenerCons.js';
import { getUsers } from '../../services/getUsers.js';
import { postHist } from '../../services/postHist.js';
import { deleteCons } from '../../services/deleteConst.js';




// if (localStorage.getItem('iniciado') !== 'true') {
//   window.location.href = 'login.html';
// }

const consultas = [];
const btnAgregar = document.getElementById('btnAgregar')
const btnMostrar = document.getElementById('btnMostrar')
const btnLog = document.getElementById('btnLog')
const btnHist = document.getElementById('btnHist')
const btnOcultar = document.getElementById('btnOcultar')



btnHist.addEventListener('click', function () {
  window.location.href = 'estadisticas.html'

})

btnLog.addEventListener('click', function () {
  window.location.href = 'login.html'
})

btnAgregar.addEventListener('click',function () {
  agregarConsulta()
})

btnMostrar.addEventListener('click',function () {
  mostrarConsultas()
  btnMostrar.style.display = 'none';
    btnOcultar.style.display = 'block'
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

  usuario.forEach(element => {
    
    let nombres = JSON.parse(localStorage.getItem("usuario")) || []
    console.log(nombres);

    let usuarioLog = usuario.find(i => i.usuario === element.usuario)

    if (usuarioLog) {
      
      postCons(element.usuario, consulta, detalle, tipo, fecha, hora)
      postHist(element.usuario, consulta, detalle, tipo, fecha, hora)
    }
  });
  
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


  consultas.forEach((consulta) => {
    const divConsulta = document.createElement('div');
    divConsulta.className = 'consulta';

    const fechaHora = consulta.hora ? `${consulta.fecha} ${consulta.hora}` : consulta.fecha;

    divConsulta.innerHTML = `
    <div><button class = "btnEli">Eliminar</button></div>
    <div class="consulta-nombre">Nombre: ${consulta.usuario}</div>
      <div class="consulta-nombre">Consulta: ${consulta.consulta}</div>
      <div class="consulta-detalle">Detalles: ${consulta.detalle}</div>
      <div class="consulta-tipo">Tipo: ${consulta.tipo}</div>
      <div class="consulta-fecha">Fecha y Hora: ${fechaHora}</div>
    `;
    contenedor.appendChild(divConsulta);

    const btnEli = divConsulta.querySelector('.btnEli');

    btnEli.addEventListener('click', async function () {
      try {
          // Asegúrate de pasar el ID de la consulta al llamar a deleteHist
          await deleteCons(consulta.id); 
          divConsulta.remove(); // Elimina el elemento del DOM si la eliminación es exitosa
      } catch (error) {
          console.error('Error al eliminar la consulta:', error);
          alert('No se pudo eliminar la consulta. Por favor, intente de nuevo.');
      }
  })

    
  });

  contenedor.style.display = "block";

   const btnEli = divConsulta.querySelector('.btnEli');

    btnEli.addEventListener('click', async function () {
      try {
          // Asegúrate de pasar el ID de la consulta al llamar a deleteHist
          await deleteCons(consulta.id); 
          divConsulta.remove(); // Elimina el elemento del DOM si la eliminación es exitosa
      } catch (error) {
          console.error('Error al eliminar la consulta:', error);
          alert('No se pudo eliminar la consulta. Por favor, intente de nuevo.');
      }
  })

  
  btnOcultar.addEventListener('click', function () {
    btnMostrar.style.display = 'block';
      btnOcultar.style.display = 'none'
      contenedor.style.display = "none";
  })

  
}
