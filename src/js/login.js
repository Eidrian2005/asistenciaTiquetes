import { getUsers } from "../../services/getUsers";

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  await getUsers()
    .then((users) => {
      const validUser = users.some(
        (user) => user.username === username && user.password === password
      );

      if (validUser) {
        alert("Inicio de sesión exitoso.");
        window.location.href = "/dashboard";
      } else {
        alert("Usuario o contraseña incorrectos.");
      }
    })
    .catch((error) => {
      console.error("Error en la validación:", error);
      alert("Hubo un problema con la validación. Inténtelo de nuevo.");
    });
});
