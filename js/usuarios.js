// REGISTRARSE

const inputusuarioreg = document.getElementById("usuario_reg");
const inputcontraseñareg = document.getElementById("contraseña_reg");
const btnregistrarse = document.getElementById("registrarse");

let usuarios_local = localStorage.getItem("array_usuarios");
let array_usuarios = usuarios_local
    ? JSON.parse(usuarios_local) : [
        {
            usuario: "admin",
            contraseña: "admin",
            tipo: "admin"
        }
    ];
if (!usuarios_local) {
    localStorage.setItem("array_usuarios", JSON.stringify(array_usuarios));
}

if(inputusuarioreg && inputcontraseñareg && btnregistrarse){
    btnregistrarse.addEventListener("click", ()=>{
        const usuario = inputusuarioreg.value;
        const contraseña = inputcontraseñareg.value;
        registro(usuario, contraseña);
    })

    function registro(usuario, contraseña){
        const nuevousuario = {
            usuario: usuario,
            contraseña: contraseña,
            tipo: "regular"
        };
        array_usuarios.push(nuevousuario);
        localStorage.setItem("array_usuarios", JSON.stringify(array_usuarios));

        const alertDIV = document.getElementById("alertDIV");
        const alert = document.createElement("div");
        alert.className = "alert alert-dark";
        alert.role = "alert"
        alert.textContent = "Se registro el nuevo usuario!"
        alertDIV.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

// LOGIN
const inputusuario = document.getElementById("usuario");
const inputcontraseña = document.getElementById("contraseña");
const btniniciosesion = document.getElementById("inicio_sesion");

if(inputusuario && inputcontraseña && btniniciosesion){
    btniniciosesion.addEventListener("click", ()=>{
        const usuario = inputusuario.value;
        const contraseña = inputcontraseña.value;
        array_usuarios.forEach(user => {
            if(usuario == user.usuario && contraseña == user.contraseña){
            window.location.href = "inicio.html";
        }
        });
        const usuarioEncontrado = array_usuarios.find(
            (u) => u.usuario === usuario && u.contraseña === contraseña
        );
        localStorage.setItem("usuario_activo", JSON.stringify(usuarioEncontrado));
    })
}

