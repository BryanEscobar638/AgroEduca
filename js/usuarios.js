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

// REGISTRAR ADMIN

const inputusuarioadmin = document.getElementById("usuario_admin");
const inputcontraseñaadmin = document.getElementById("contraseña_admin");
const btnregistraradmin = document.getElementById("registraradmin");

if(inputusuarioadmin && inputcontraseñaadmin && btnregistraradmin){
    btnregistraradmin.addEventListener("click", ()=>{
        const usuario = inputusuarioadmin.value;
        const contraseña = inputcontraseñaadmin.value;
        registro(usuario, contraseña);
    })

    function registro(usuario, contraseña){
        const nuevousuario = {
            usuario: usuario,
            contraseña: contraseña,
            tipo: "admin"
        };
        array_usuarios.push(nuevousuario);
        localStorage.setItem("array_usuarios", JSON.stringify(array_usuarios));

        const alertDIV = document.getElementById("alertDIV");
        const alert = document.createElement("div");
        alert.className = "alert alert-dark";
        alert.role = "alert"
        alert.textContent = "Se registro el nuevo admin!"
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

if (inputusuario && inputcontraseña && btniniciosesion) {
    btniniciosesion.addEventListener("click", () => {
        const usuario = inputusuario.value;
        const contraseña = inputcontraseña.value;

        const usuarioEncontrado = array_usuarios.find(
            (u) => u.usuario === usuario && u.contraseña === contraseña
        );

        if (usuarioEncontrado) {
            localStorage.setItem("usuario_activo", JSON.stringify(usuarioEncontrado));
            window.location.href = "inicio.html";
        } else {
            const alertDIV = document.getElementById("alertDIV");
            
            // Verifica si ya existe una alerta
            if (!document.querySelector(".alert-danger")) {
                const alert = document.createElement("div");
                alert.className = "alert alert-danger";
                alert.role = "alert";
                alert.textContent = "USUARIO O CONTRASEÑA INCORRECTOS";
                alertDIV.appendChild(alert);

                setTimeout(() => {
                    alert.remove();
                }, 5000);
            }
        }
    });
}

// IMPRIMIR USUARIOS REGISTRADOS

const tabla = document.getElementById("tabla");

if(tabla){

    const table = document.createElement("table");
    table.className = "table table-bordered border-success text-center"

    const thead = document.createElement("thead");
    thead.className = "table-dark table-bordered border-success";

    const tr = document.createElement("tr");

    const th1 = document.createElement("th");
    th1.textContent = "USUARIO";

    const th2 = document.createElement("th");
    th2.textContent = "ROL";

    tr.appendChild(th1);
    tr.appendChild(th2);
    thead.appendChild(tr);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    array_usuarios.forEach(usuario => {
        if(usuario.tipo == "admin"){
            const tr = document.createElement("tr");

            const td1 = document.createElement("td");
            td1.textContent = usuario.usuario;

            const td2 = document.createElement("td");
            td2.textContent = "ADMIN";

            tr.appendChild(td1);
            tr.appendChild(td2);
            tbody.appendChild(tr);
        }
    });
    array_usuarios.forEach(usuario => {
        if(usuario.tipo == "regular"){
            const tr = document.createElement("tr");

            const td1 = document.createElement("td");
            td1.textContent = usuario.usuario;

            const td2 = document.createElement("td");
            td2.textContent = "REGULAR";

            tr.appendChild(td1);
            tr.appendChild(td2);
            tbody.appendChild(tr);
        }
    });

    table.appendChild(tbody);
    tabla.appendChild(table);
}