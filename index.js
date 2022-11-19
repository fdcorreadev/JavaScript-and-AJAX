const pResult = document.querySelector('#result')



function esPalindromo(){
    const texto = document.getElementById('text-palindromo').value;
    const result = texto.split('').reverse().join('') == texto;
    if (result === true){
        pResult.innerText = "La palabra ingresada: SI un Palíndromo";
    }else{
        pResult.innerText = "La palabra ingresada: NO es Palíndromo";
    }
    
}

function mayoromenor(){
    const num1 = document.getElementById('numero1').value;
    const num2 = document.getElementById('numero2').value;
    if(num1 > num2){
        pResult.innerText = "El numero mayor es: " + num1;
    }else if(num1 < num2){
        pResult.innerText = "El numero mayor es: " + num2;
    }else{
        pResult.innerText = "Son Iguales: " + num1 + " = " + num2;
    } 
}

function countVocal() {
    const text = document.getElementById('text-counVocales').value;
    const nText = text.length;
    let i;
    let indices = []
    for (i = 0; i < nText; i++) {
        if (text.substr(i, 1) === "a" || text.substr(i, 1) === "e" || text.substr(i, 1) === "i" || text.substr(i, 1) === "o" || text.substr(i, 1) === "u") {
            indices.push(text.substr(i, 1));
        }
    }
    pResult.innerText = "Vocales: " + indices ;
}

function contarVocales() {
    const text = document.getElementById('text-counVocales').value;
    const nText = text.length;
    let i;
    let indices = []
    for (i = 0; i < nText; i++) {
        if (text.substr(i, 1) === "a" || text.substr(i, 1) === "e" || text.substr(i, 1) === "i" || text.substr(i, 1) === "o" || text.substr(i, 1) === "u") {
            indices.push(text.substr(i, 1));
        }
    }
    let repetidos ={}
    indices.forEach(function(numero){
        repetidos[numero] = (repetidos[numero] || 0) + 1;
    });

    for( let letra in repetidos ) {
        const text = `${ letra } = ${ repetidos[ letra ] }, `;
        pResult.innerHTML += text;
    }
}

// AJAX
String.prototype.transformaCaracteresEspeciales = function () {
    return unescape(escape(this).
        replace(/%0A/g, '<br/>').
        replace(/%3C/g, '&lt;').
        replace(/%3E/g, '&gt;'));
}

var estadosPosibles = ['No inicializado', 'Cargando', 'Cargado', 'Interactivo', 'Completado'];
var tiempoInicial = 0;

window.onload = function () {
    // Cargar en el input text la URL de la página
    var recurso = document.getElementById('recurso');
    recurso.value = location.href;

    // Cargar el recurso solicitado cuando se pulse el botón MOSTRAR CONTENIDOS
    document.getElementById('enviar').onclick = cargaContenido;
}

function cargaContenido() {
    // Borrar datos anteriores
    document.getElementById('contenidos').innerHTML = "";
    document.getElementById('estados').innerHTML = "";

    // Instanciar objeto XMLHttpRequest
    if (window.XMLHttpRequest) {
        peticion = new XMLHttpRequest();
    }
    else {
        peticion = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Preparar función de respuesta
    peticion.onreadystatechange = muestraContenido;

    // Realizar petición
    tiempoInicial = new Date();
    var recurso = document.getElementById('recurso').value;
    peticion.open('GET', recurso + '?nocache=' + Math.random(), true);
    peticion.send(null);
}

// Función de respuesta
function muestraContenido() {
    var tiempoFinal = new Date();
    var milisegundos = tiempoFinal - tiempoInicial;

    var estados = document.getElementById('estados');
    estados.innerHTML += "[" + milisegundos + " mseg.] " + estadosPosibles[peticion.readyState] + "<br/>";

    if (peticion.readyState == 4) {
        if (peticion.status == 200) {
            var contenidos = document.getElementById('contenidos');
            contenidos.innerHTML = peticion.responseText.transformaCaracteresEspeciales();
        }
        muestraCabeceras();
        muestraCodigoEstado();
    }
}

function muestraCabeceras() {
    var cabeceras = document.getElementById('cabeceras');
    cabeceras.innerHTML = peticion.getAllResponseHeaders().transformaCaracteresEspeciales();
}

function muestraCodigoEstado() {
    var codigo = document.getElementById('codigo');
    codigo.innerHTML = peticion.status + "<br/>" + peticion.statusText;
}