import { postCons } from '../../services/postCons.js';
import { getCons } from '../../services/obtenerCons.js';
import { getUsers } from '../../services/getUsers.js';
import { postHist } from '../../services/postHist.js';
import { deleteCons } from '../../services/deleteConst.js';




if (localStorage.getItem('iniciado') !== 'true') { //esto valida si alguien a iniciado sesion 
    window.location.href = 'login.html'; //si no estas iniciado te redirige a la pagina login
}

const consultas = []; //contenedeor array de consultas
//botones
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

  const usuario2 = await getUsers()


  /*zona de inputs*/
  const usuario = document.getElementById('nombrestudiante').value;
  const consulta = document.getElementById("consulta").value;
  const detalle = document.getElementById("consultatexto").value;
  const tipo = document.getElementById("tipo-consulta").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
/*fin de zona de inputs*/

  if (!consulta || !detalle || !tipo || !fecha || !hora) {
    console.log("Por favor, complete todos los campos antes de agregar la consulta.");
    return;
  }


      // se engargan de postear el contenido de los inputs a el "servidor"
      postCons(usuario, consulta, detalle, tipo, fecha, hora)
      postHist(usuario, consulta, detalle, tipo, fecha, hora)
  
  
  const consulta1 = {
    nombre: usuario,
    consulta: consulta,
    detalle: detalle,
    tipo: tipo,
    fechaHora: `${fecha} ${hora}`
  };

  consultas.push(consulta1); 
  document.getElementById('nombrestudiante').value = '';
  document.getElementById("consulta").value = '';
  document.getElementById("consultatexto").value = '';
  document.getElementById("tipo-consulta").value = '';
  document.getElementById("fecha").value = '';
  document.getElementById("hora").value = '';
//esto vacia los inputs al enviar consultas xd
}



async function mostrarConsultas() {


  const consultas = await getCons();

  const contenedor = document.getElementById("consulta-contenedor");
  contenedor.innerHTML = ''; 

  if (consultas.length === 0) {
    popver.classList.add('visible');
  }


  consultas.forEach((consulta) => { //recore las consultas que es donde los obtiene del db.json y las escribe en el dom
    const divConsulta = document.createElement('div');
    divConsulta.className = 'consulta';

    const fechaHora = consulta.hora ? `${consulta.fecha} ${consulta.hora}` : consulta.fecha; //verificacion de la fecha y hora

    divConsulta.innerHTML = `
    <div><button class = "btnEli">Eliminar</button></div>
    <div class="consulta-nombre">Nombre: ${consulta.usuario}</div>
      <div class="consulta-nombre">Consulta: ${consulta.consulta}</div>
      <div class="consulta-detalle">Detalles: ${consulta.detalle}</div>
      <div class="consulta-tipo">Tipo: ${consulta.tipo}</div>
      <div class="consulta-fecha">Fecha y Hora: ${fechaHora}</div>
    `;
    contenedor.appendChild(divConsulta); //esto hace aparecer el texto

    const btnEli = divConsulta.querySelector('.btnEli');

    btnEli.addEventListener('click', async function () {
      try {
          // esto pasa el Id para la hora de eliminar con el Delete
          await deleteCons(consulta.id); 
          divConsulta.remove(); // Elimina el elemento del Dom si la eliminación es exitosa
      } catch (error) {
          console.error('Error al eliminar la consulta:', error);
          console.log('No se pudo eliminar la consulta. Por favor, intente de nuevo.');
      }
  })

    
  });

  contenedor.style.display = "block";
  
  btnOcultar.addEventListener('click', function () { //esto solo es para ocultar la ventanilla de consultas
    btnMostrar.style.display = 'block';
      btnOcultar.style.display = 'none'
      contenedor.style.display = "none";
  })

  btnClose.addEventListener('click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe al cerrar el popover
    popver.classList.remove('visible'); // Ocultar el popover
});
  
}
