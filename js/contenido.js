// AGREGAR CONTENIDO

const inputtitulo = document.getElementById("titulo");
const inputurlimagen = document.getElementById("urlimagen");
const inputdescripcion = document.getElementById("descripcion");
const inputinformacion = document.getElementById("informacion");
const inputinputurlvideo = document.getElementById("inputurlvideo");
const btnagregar = document.getElementById("btnagregar");

let contenido_local = localStorage.getItem("array_contenido");
let array_contenido = contenido_local ? JSON.parse(contenido_local) : [];

if(inputtitulo && inputurlimagen && inputdescripcion && inputinformacion && inputinputurlvideo && btnagregar){

    btnagregar.addEventListener("click", ()=>{

        const titulo = inputtitulo.value;
        const urlimagen = inputurlimagen.value;
        const descripcion = inputdescripcion.value;
        const informacion = inputinformacion.value;
        const urlvideo = inputinputurlvideo.value;

        agregarcontenido(titulo, urlimagen, descripcion, informacion, urlvideo);

        console.log(array_contenido);

    });

    function agregarcontenido(titulo, urlimagen, descripcion, informacion, urlvideo){
        const nuevocontenido = {
            titulo: titulo,
            urlimagen: urlimagen,
            descripcion: descripcion,
            informacion: informacion,
            urlvideo: urlvideo
        }

        array_contenido.push(nuevocontenido);
        localStorage.setItem("array_contenido", JSON.stringify(array_contenido));

        const alertDIV = document.getElementById("alertDIV");
        const alert = document.createElement("div");
        alert.className = "alert alert-dark";
        alert.role = "alert"
        alert.textContent = "Se registro el nuevo contenido!"
        alertDIV.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

// QUEMAR INFO

const btnquemar = document.getElementById("btnquemar");
const btnborrar = document.getElementById("btnborrar");

if(btnquemar){
    btnquemar.addEventListener("click", ()=>{
        fetch('json/info.json')
        .then(response => response.json())
        .then(data => {
            array_contenido = array_contenido.concat(data);
            localStorage.setItem("array_contenido", JSON.stringify(array_contenido));
        })
        .catch(error => console.error("Error cargando JSON externo:", error));
    })
}

if(btnborrar){
    btnborrar.addEventListener("click", ()=>{
        localStorage.removeItem("array_contenido");
        console.log("borrado.")
    })
}

// IMPRIMIR CONTENIDO

const containercontenido = document.getElementById("containercontenido");

if(containercontenido){
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
        containercontenido.appendChild(fila);
    }else{
        array_contenido.reverse().forEach(contenido => {
            const fila = document.createElement("div");
            fila.className = "row";
            const columna = document.createElement("div");
            columna.className = "col-12 mb-3"

            const card = document.createElement("div");
            card.className = "card mb-3 mx-auto border-success";
            card.style = "max-width: 540px;"

            const cardrow = document.createElement("div");
            cardrow.className = "row g-0";

            const cardcol1 = document.createElement("div");
            cardcol1.className = "col-md-4"

            const img = document.createElement("img")
            img.className = "img-fluid rounded-start"
            img.src = contenido.urlimagen

            const cardcol2 = document.createElement("div");
            cardcol2.className = "col-md-8"

            const cardbody = document.createElement("div");
            cardbody.className = "card-body";

            const h5 = document.createElement("div");
            h5.className = "card-title";
            h5.textContent = contenido.titulo

            const p = document.createElement("p");
            p.className = "card-text"
            p.textContent = contenido.descripcion

            const a = document.createElement("a");
            a.className = "btn btn-success";
            a.href = "información.html";
            // a.onclick = `info(${contenido.titulo})`
            a.onclick = function(e) {
                e.preventDefault();
                localStorage.setItem("info", contenido.titulo);
                window.location.href = a.href;
            };
            a.textContent = "MÁS INFORMACIÓN";

            cardbody.appendChild(h5);
            cardbody.appendChild(p);
            cardbody.appendChild(a);
            cardcol2.appendChild(cardbody);
            cardcol1.appendChild(img)
            cardrow.appendChild(cardcol1);
            cardrow.appendChild(cardcol2);
            card.appendChild(cardrow);
            columna.appendChild(card);
            fila.appendChild(columna);
            containercontenido.appendChild(fila);
        });
    }
}

// VER CONTENIDO COMPLETO

const tituloSeleccionado = localStorage.getItem("info");
const contenido = array_contenido.find(item => item.titulo === tituloSeleccionado);

const containerinfo = document.getElementById("containerinfo");

if (containerinfo){
    if(contenido){
        containerinfo.innerHTML = "";

        const fila = document.createElement("div");
        fila.className = "row";

        const col1 = document.createElement("div");
        col1.className = "col-12 text-center mb-4";

        const h1 = document.createElement("h1");
        h1.className = "display-4 fw-bold text-uppercase";
        h1.textContent = contenido.titulo

        const botonPDF = document.createElement("button");
        botonPDF.className = "btn btn-danger mb-3";
        botonPDF.textContent = "Descargar PDF";
        botonPDF.addEventListener("click", () => {
            generarPDF(contenido);
        }); 

        const col2 = document.createElement("div")
        col2.className = "col-12";

        const card = document.createElement("div");
        card.className = "card shadow mx-auto mb-4 border-success";
        card.style = "max-width: 800px;"

        const cardrow = document.createElement("div");
        cardrow.className = "row g-0";

        const cardcol = document.createElement("div");
        cardcol.className = "col-md-12";

        const cardbody = document.createElement("div");
        cardbody.className = "card-body";

        const h3 = document.createElement("h3");
        h3.className = "card-title fw-bold text-center mb-3";
        h3.textContent = "INFORMACIÓN";

        const p = document.createElement("p");
        p.className = "card-text fs-4";
        p.style = "white-space: pre-line;"
        p.textContent = contenido.informacion;

        const col3 = document.createElement("div");
        col3.className = "col-12 text-center mb-4"

        const divvideo = document.createElement("div");
        divvideo.className = "ratio ratio-16x9 mx-auto";
        divvideo.style = "max-width: 800px;"

        const video = document.createElement("iframe");
        video.src = contenido.urlvideo;
        video.allowFullscreen = true;

        divvideo.appendChild(video);
        col3.appendChild(divvideo);
        cardbody.appendChild(h3);
        cardbody.appendChild(p);
        cardcol.appendChild(cardbody);
        cardrow.appendChild(cardcol);
        card.appendChild(cardrow);
        col2.appendChild(card);
        col1.appendChild(h1);
        col1.appendChild(botonPDF);
        fila.appendChild(col1);
        fila.appendChild(col2);
        fila.appendChild(col3);
        containerinfo.appendChild(fila);

    }else{
        containerinfo.innerText = "Contenido no encontrado."
    }
}

async function generarPDF(contenido) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // TÍTULO: Mayúscula, grande, negrilla y centrado
    const titulo = contenido.titulo.toUpperCase();
    doc.setFont("helvetica", "bold"); // Fuente en negrita
    doc.setFontSize(22); // Tamaño grande

    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(titulo);
    const x = (pageWidth - textWidth) / 2;

    doc.text(titulo, x, 20); // Título centrado

    // Subtítulo
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal"); // Volver a fuente normal
    doc.text("Información:", 10, 30);

    // Información
    doc.setFontSize(14);
    const texto = doc.splitTextToSize(contenido.informacion, 180);
    doc.text(texto, 10, 40);

    doc.save(`${contenido.titulo}.pdf`);
}




