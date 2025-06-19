// IMPRIMIR CONTENIDO

let contenido_local = localStorage.getItem("array_contenido");
let array_contenido = contenido_local ? JSON.parse(contenido_local) : [];

const gestioncontenido = document.getElementById("gestioncontenido");

if(gestioncontenido){
    if(array_contenido.length == 0){
        const fila = document.createElement("div");
        fila.className = "row";
        const columna = document.createElement("div");
        columna.className = "col-12 mb-3"

        const card = document.createElement("div");
        card.className = "card mb-3 mx-auto border-success";
        card.style = "max-width: 540px;"

        const cardrow = document.createElement("div");
        cardrow.className = "row g-0";

        const cardcol = document.createElement("div");
        cardcol.className = "col-md-8"

        const cardbody = document.createElement("div");
        cardbody.className = "card-body";

        const h5 = document.createElement("div");
        h5.className = "card-title";
        h5.textContent = "NO HAY CONTENIDO SUBIDO";

        cardbody.appendChild(h5);
        cardcol.appendChild(cardbody);
        cardrow.appendChild(cardcol);
        card.appendChild(cardrow);
        columna.appendChild(card);
        fila.appendChild(columna);
        gestioncontenido.appendChild(fila);
    }else{
        array_contenido.reverse().forEach(contenido => {
            const fila = document.createElement("div");
            fila.className = "row";
            const columna = document.createElement("div");
            columna.className = "col-12 mb-3";

            const card = document.createElement("div");
            card.className = "card mb-3 mx-auto border-success";
            card.style = "max-width: 540px;";

            const cardrow = document.createElement("div");
            cardrow.className = "row g-0";

            const cardcol1 = document.createElement("div");
            cardcol1.className = "col-md-4";

            const img = document.createElement("img");
            img.className = "img-fluid rounded-start";
            img.src = contenido.urlimagen;

            const cardcol2 = document.createElement("div");
            cardcol2.className = "col-md-8";

            const cardbody = document.createElement("div");
            cardbody.className = "card-body";

            const h5 = document.createElement("div");
            h5.className = "card-title";
            h5.textContent = contenido.titulo;

            const p = document.createElement("p");
            p.className = "card-text";
            p.textContent = contenido.descripcion;

            const a = document.createElement("a");
            a.className = "btn btn-dark me-2"; // margen a la derecha
            a.href = "editar.html";
            a.onclick = function (e) {
              e.preventDefault();
              localStorage.setItem("info", contenido.titulo);
              window.location.href = a.href;
            };
            a.textContent = "MODIFICAR";

            const btnEliminar = document.createElement("button");
            btnEliminar.className = "btn btn-danger";
            btnEliminar.textContent = "ELIMINAR";
            btnEliminar.onclick = function () {
              const confirmar = confirm(
                "¿Estás seguro de eliminar este contenido?"
              );
              if (confirmar) {
                const tituloOriginal = contenido.titulo;
                const indice = array_contenido.findIndex(
                  (item) => item.titulo === tituloOriginal
                );
                if (indice !== -1) {
                  array_contenido.splice(indice, 1); 
                  localStorage.setItem(
                    "array_contenido",
                    JSON.stringify(array_contenido)
                  ); 
                  location.reload(); 
                }
              }
            };
            // 🔼 FIN AGREGADO

            cardbody.appendChild(h5);
            cardbody.appendChild(p);
            cardbody.appendChild(a);
            cardbody.appendChild(btnEliminar);
            cardcol2.appendChild(cardbody);
            cardcol1.appendChild(img);
            cardrow.appendChild(cardcol1);
            cardrow.appendChild(cardcol2);
            card.appendChild(cardrow);
            columna.appendChild(card);
            fila.appendChild(columna);
            gestioncontenido.appendChild(fila);
        });
    }
}

// IMPRIMIR FORMULARIO PARA MODIFICAR

const tituloSeleccionado = localStorage.getItem("info");
const contenido = array_contenido.find(item => item.titulo === tituloSeleccionado);

const inputtitulo_modi = document.getElementById("titulo_modi");
const inputurlimagen_modi = document.getElementById("urlimagen_modi");
const inputdescripcion_modi = document.getElementById("descripcion_modi");
const inputinformacion_modi = document.getElementById("informacion_modi");
const inputinputurlvideo_modi = document.getElementById("inputurlvideo_modi");
const btnmodi = document.getElementById("btnmodi");

if(inputtitulo_modi && inputurlimagen_modi && inputdescripcion_modi && inputinformacion_modi && inputinputurlvideo_modi){

    console.log(contenido);

    inputtitulo_modi.value = contenido.titulo;
    inputurlimagen_modi.value = contenido.urlimagen;
    inputdescripcion_modi.value = contenido.descripcion;
    inputinformacion_modi.value = contenido.informacion;
    inputinputurlvideo_modi.value = contenido.urlvideo;

    btnmodi.addEventListener("click", () => {
    // Buscar el índice del contenido en el array
    const index = array_contenido.findIndex(item => item.titulo === tituloSeleccionado);

    if (index !== -1) {
        array_contenido[index] = {
            titulo: inputtitulo_modi.value,
            urlimagen: inputurlimagen_modi.value,
            descripcion: inputdescripcion_modi.value,
            informacion: inputinformacion_modi.value,
            urlvideo: inputinputurlvideo_modi.value
        };

        // Guardar los cambios
        localStorage.setItem("array_contenido", JSON.stringify(array_contenido));

        const alertDIV = document.getElementById("alertDIV");
        const alert = document.createElement("div");
        alert.className = "alert alert-dark";
        alert.role = "alert"
        alert.textContent = "Se modifico el contenido!"
        alertDIV.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 3000);
        setTimeout(() => {
            window.location.href = "contenidos.html";
        }, 5000);
    } else {
        alert("Error: No se encontró el contenido a modificar ❌");
    }
});
}




