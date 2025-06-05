const usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo"));

if (usuarioActivo && usuarioActivo.tipo === "admin") {
    document.querySelectorAll(".admin-only").forEach((el) => {
        el.style.display = "block";
    });
} else {
    document.querySelectorAll(".admin-only").forEach((el) => {
        el.style.display = "none";
    });
}

// EVITAR QUE SIN SESIÓN SE VEA EL CONTENIDO
if (!usuarioActivo || usuarioActivo === "") {
    window.location.href = "login.html";
}

// CIERRE DE SESION
const btncerrarsesion = document.getElementById("cerrar_sesion")

if(btncerrarsesion){
    btncerrarsesion.addEventListener("click", ()=>{
        usuarioEncontrado = "";
        localStorage.setItem("usuario_activo", JSON.stringify(usuarioEncontrado));
        window.location.href = "login.html";
    })
}