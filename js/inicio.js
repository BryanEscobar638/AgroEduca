let contenido_local = localStorage.getItem("array_contenido");
let array_contenido = contenido_local ? JSON.parse(contenido_local) : [];

const ultimocontenido = document.getElementById("ultimocontenido");

if(array_contenido.length > 0){
    const ultimo = array_contenido[array_contenido.length - 1];

    const card = document.createElement("div");
    card.className = "card h-100 shadow";

    const cardbody = document.createElement("div");
    cardbody.className = "card-body";

    const h4 = document.createElement("h4");
    h4.className = "card-title fw-bold fst-italic";
    h4.textContent = "ULTIMO CONTENIDO";

    const h5 = document.createElement("h5");
    h5.className = "card-subtitle text-success";
    h5.textContent = ultimo.titulo;

    const p = document.createElement("p");
    p.className = "card-text";
    p.textContent = ultimo.descripcion;

    const a = document.createElement("a");
    a.className = "btn btn-success";
    a.href = "información.html";
    a.onclick = function(e) {
        e.preventDefault();
        localStorage.setItem("info", ultimo.titulo);
        window.location.href = a.href;
    };
    a.textContent = "Aprender";

    cardbody.appendChild(h4);
    cardbody.appendChild(h5);
    cardbody.appendChild(p);
    cardbody.appendChild(a);
    card.appendChild(cardbody);
    ultimocontenido.appendChild(card);
}else{
    const card = document.createElement("div");
    card.className = "card h-100 shadow";

    const cardbody = document.createElement("div");
    cardbody.className = "card-body";

    const h4 = document.createElement("h4");
    h4.className = "card-title fw-bold fst-italic";
    h4.textContent = "NO HAY CONTENIDO DISPONIBLE";

    cardbody.appendChild(h4);
    card.appendChild(cardbody);
    ultimocontenido.appendChild(card);
}