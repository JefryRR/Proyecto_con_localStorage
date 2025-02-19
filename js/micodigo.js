const boton = document.getElementById("addEquipo");

let equipos = [];
let marcas = [];
let stock = [];

boton.addEventListener("click", () => {
    const nombrEq = document.getElementById("nombrEquipo");
    const marcaEq = document.getElementById("marcaEquipo");
    const stockEq = document.getElementById("cantidadEquipo");

    const cantn = parseInt(stockEq.value);

    if(nombrEquipo.value != "" && marcaEquipo.value != "" && cantidadEquipo.value != ""){
    let captura = -1;
   
    // el ciclo recorre todo el arreglo para poder buscar el nuevo equipo

    for (let i = 0; i < equipos.length; i++) {
        // si el equipo y la marca ya estan en los arreglos captura en que indice
        if (nombrEquipo.value == equipos[i] && marcaEquipo.value == marcas[i]) {
            captura = i;
        }
    };

    if (captura != -1) {
        stock[captura] += cantn;
        nombrEq.value = "";
        marcaEq.value = "";
        stockEq.value = "";
    } else {
        equipos.push(nombrEq.value);
        marcas.push(marcaEq.value);
        stock.push(cantn);
        nombrEq.value = "";
        marcaEq.value = "";
        stockEq.value = "";
    };
    imprimirEquipos(); }else{
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: "Debe llenar todos los campos",
          });
};
localStorage.setItem("equiposI", JSON.stringify(equipos));
localStorage.setItem("Marcas", JSON.stringify(marcas));
localStorage.setItem("Stock", JSON.stringify(stock));
});

function cargarDatosEquip(){                    // se crea para cargar los datos que viene del localStorage
    if (localStorage.getItem("equiposI") != null) {
        equipos = JSON.parse(localStorage.getItem("equiposI"));
        marcas = JSON.parse(localStorage.getItem("Marcas"));
        stock = JSON.parse(localStorage.getItem("Stock"));
        imprimirEquipos();              // se declara para que imprima los datos
        };
};

window.addEventListener('load', cargarDatosEquip);   //se declara para que se ejecute al cargar la pagina.

function imprimirEquipos() {
    const listaEquipos = document.getElementById("equipos");
    listaEquipos.innerHTML = "";

    for (let i = 0; i < equipos.length; i++) {
        const fila = document.createElement("tr");

        for (let j = 1; j <= 3; j++) {

            const datos = document.createElement("td");

            (j == 1) ? datos.textContent = equipos[i] : false;
            (j == 2) ? datos.textContent = marcas[i] : false;
            (j == 3) ? datos.textContent = stock[i] : false;
            fila.appendChild(datos);
        };
        listaEquipos.appendChild(fila);
    };
};


const botonInstructores = document.getElementById("addInstructor");

let nombresInstructores = [];
let identificacionInstructores = [];

botonInstructores.addEventListener("click", () => {

    const nombreInstructor = document.getElementById("inputNombre");
    const inputID = document.getElementById('inputIdInstructor');

    if(inputNombre.value != "" && inputID.value != ""){

    let verificar = identificacionInstructores.indexOf(inputIdInstructor.value);

    if (verificar == -1) {
        identificacionInstructores.push(inputID.value);
        nombresInstructores.push(nombreInstructor.value);
        localStorage.setItem("idInstructores", JSON.stringify(identificacionInstructores));
        localStorage.setItem("nombresInstructores", JSON.stringify(nombresInstructores));
        imprimirInstructores();
    } else {
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: "El instructor ya se encuentra registrado",
          });
    };
    inputID.value = '';
    inputNombre.value = '';
}else{
    Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Debe llenar todos los campos",
      });
};
});



function datosInstructores(){
    if (localStorage.getItem("idInstructores") != null) {
    identificacionInstructores= JSON.parse(localStorage.getItem("idInstructores"));
    nombresInstructores=JSON.parse(localStorage.getItem("nombresInstructores"));
    imprimirInstructores()};
};

window.addEventListener('load', datosInstructores);

function imprimirInstructores() {
    const listaInstructores = document.getElementById("instructores");
    listaInstructores.innerHTML = "";             // limpia la los datos anteriores y almacena los nuevos y actualizados
    for (let i = 0; i < nombresInstructores.length; i++) {
        const filains = document.createElement("tr");
        for (let j = 0; j < 2; j++) {
            const datoinst = document.createElement("td");
            (j == 0) ? datoinst.textContent = identificacionInstructores[i] : false;
            (j == 1) ? datoinst.textContent = nombresInstructores[i] : false;
            filains.appendChild(datoinst);
        };
        listaInstructores.appendChild(filains);
    };
};


let equiposPrestados = [];
let marcasPrestadas = [];
let cantidadPrestada = [];
let instructoresPrestan = [];

const botonPrestar = document.getElementById("addPrestamo");

botonPrestar.addEventListener("click", () => {

    const equipoPrestar = document.getElementById("nombrePrestamo");
    const marcaPrestar = document.getElementById("marcaPrestamo");

    if(nombrePrestamo.value != '' && marcaPrestamo.value != '') {

    let captura = -1;
    

    // el ciclo recorre todo el arreglo para poder buscar el nuevo equipo
    for (let i = 0; i < equipos.length; i++) {
        // si el equipo y la marca ya estan en los arreglos captura en que indice
        if (nombrePrestamo.value == equipos[i] && marcaPrestamo.value == marcas[i]) {
            captura = i;
        };
    };

    if (captura == -1) {
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: "El equipo no existe",
          });
        nombrePrestamo.value = "";            //se llamda de este modo cuando las constantes están fuera de alcance, por el Id.
        marcaPrestamo.value = "";
        cantidadPrestamo.value = "";
        idPrestamo.value = "";
    } else {

        const cantidadPrestar = document.getElementById("cantidadPrestamo");
        const cantPrestada = parseInt(cantidadPrestar.value);

        if(cantidadPrestamo.value != '') {

        if (cantPrestada <= stock[captura]) {
            const idPresta = document.getElementById("idPrestamo");

            if(idPrestamo.value != "") {
                // Verificar si el instructor existe validando el dato ingresado en el arreglo
                const instructorprest = identificacionInstructores.indexOf(idPresta.value);
                
                if (instructorprest === -1) {
                    Swal.fire({
                        icon: "error",
                        title: "Error...",
                        text: "El instructor no existe, debe registrarse",
                    });

                    idPresta.value = "";
                    equipoPrestar.value = "";
                    marcaPrestar.value = "";
                    cantidadPrestar.value = "";
                } else {
                    let captura2 = -1;
                    for (let i = 0; i < equiposPrestados.length; i++) {
                        if (idPrestamo.value == instructoresPrestan[i] && 
                            nombrePrestamo.value == equiposPrestados[i] && 
                            marcaPrestamo.value == marcasPrestadas[i]) {
                            captura2 = i;
                        };
                    };

                    if (captura2 == -1) {
                        instructoresPrestan.push(idPresta.value);
                        equiposPrestados.push(equipoPrestar.value);
                        marcasPrestadas.push(marcaPrestar.value);
                        cantidadPrestada.push(cantPrestada);

                        localStorage.setItem("equipPrestados", JSON.stringify(equiposPrestados));
                        localStorage.setItem("marcasPrestad", JSON.stringify(marcasPrestadas));
                        localStorage.setItem("cantPrestada", JSON.stringify(cantidadPrestada));
                        localStorage.setItem("instructsPrestan", JSON.stringify(instructoresPrestan));

                        idPresta.value = "";
                        equipoPrestar.value = "";
                        marcaPrestar.value = "";
                        cantidadPrestar.value = "";

                    } else {
                        cantidadPrestada[captura2] += cantPrestada;
                        localStorage.setItem("cantPrestada", JSON.stringify(cantidadPrestada));
                        idPresta.value = "";
                        equipoPrestar.value = "";
                        marcaPrestar.value = "";
                        cantidadPrestar.value = "";
                    };
                    stock[captura] -= cantPrestada;
                    localStorage.setItem("Stock", JSON.stringify(stock));
                };
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error...",
                    text: "Debe llenar todos los campos",
                });
            };
        } else {
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "No hay cantidad disponible",
            });
            nombrePrestamo.value = "";            //se llamda de este modo cuando las constantes están fuera de alcance, por el Id.
            marcaPrestamo.value = "";
            cantidadPrestamo.value = "";
            idPrestamo.value = "";
        };
        imprimirPrestamos();
    }else{
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: "Debe llenar todos los campos",
          });
    };
    };
    imprimirEquipos();
}else{
    Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Debe llenar todos los campos",
      });
};
});

function datosPrestamo (){
    if(localStorage.getItem("equipPrestados") != null){
    equiposPrestados=JSON.parse(localStorage.getItem("equipPrestados"));
    marcasPrestadas=JSON.parse(localStorage.getItem("marcasPrestad"));
    cantidadPrestada=JSON.parse(localStorage.getItem("cantPrestada"));
    instructoresPrestan=JSON.parse(localStorage.getItem("instructsPrestan"));
    imprimirPrestamos();                  //se declara para que imprima los datos de los prestamos.
};
};

window.addEventListener('load', datosPrestamo);    

function imprimirPrestamos() {
    const listaPrestamos = document.getElementById("prestamos");
    listaPrestamos.innerHTML = "";          //se utiliza para limpiar la información anterior y colocar la nueva
    for (let i = 0; i < equiposPrestados.length; i++) {
        const filaPrestamo = document.createElement("tr");
        for (let j = 0; j < 4; j++) {
            const celdaPrestamo = document.createElement("td");
            (j == 0) ? celdaPrestamo.textContent = instructoresPrestan[i] : false;
            (j == 1) ? celdaPrestamo.textContent = equiposPrestados[i] : false;
            (j == 2) ? celdaPrestamo.textContent = marcasPrestadas[i] : false;
            (j == 3) ? celdaPrestamo.textContent = cantidadPrestada[i] : false;
            filaPrestamo.appendChild(celdaPrestamo);
        };
        listaPrestamos.appendChild(filaPrestamo);
    };
};



let nombresEquiposDev = [];
let marcasDev = [];
let cantidadDev = [];
let instructoresDev = []; //se crea un array para almacenar los datos de los equipos devueltos y comparar los con los prestados

const botonDevolucion = document.getElementById("devolverPrestamo");

botonDevolucion.addEventListener("click", () => {

    const idInstructord = document.getElementById("idDevolucion");
    const nombreEquipod = document.getElementById("nombreDevolucion");
    const marcaEquipod = document.getElementById("marcaDevolucion");


    if(idDevolucion.value != "" && nombreDevolucion.value != "" && marcaDevolucion.value != ""){

    let captura = -1;

    for (let i = 0; i < equiposPrestados.length; i++) {
        if (idInstructord.value == instructoresPrestan[i] && nombreEquipod.value == equiposPrestados[i] && marcaEquipod.value == marcasPrestadas[i]) {
            captura = i;
        };
    };

    if (captura == -1) {
        idDevolucion.value = "";
        nombreDevolucion.value = "";
        marcaDevolucion.value = "";
        cantidadDevolucion.value = "";
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: "No hay prestamos registrados con esta información",
          });
    } else {
        const cantidadDevolver = document.getElementById("cantidadDevolucion");
        const cantDevuelta = parseInt(cantidadDevolver.value);

        if (cantDevuelta <= cantidadPrestada[captura]) {
            cantidadPrestada[captura] -= cantDevuelta;
            localStorage.setItem("cantPrestada", JSON.stringify(cantidadPrestada));

            nombresEquiposDev.push(nombreEquipod.value);
            marcasDev.push(marcaEquipod.value);
            cantidadDev.push(cantDevuelta);
            instructoresDev.push(idInstructord.value);

            localStorage.setItem("nombrEquipdev", JSON.stringify(nombresEquiposDev));
            localStorage.setItem("marcaEqdev", JSON.stringify(marcasDev));
            localStorage.setItem("cantidEqdev", JSON.stringify(cantidadDev));
            localStorage.setItem("instructsdev", JSON.stringify(instructoresDev));

            idDevolucion.value = "";
            nombreDevolucion.value = "";
            marcaDevolucion.value = "";
            cantidadDevolucion.value = "";
            if (cantidadPrestada[captura] == 0) {
                // eliminar datos de los arreglos de prestamos.
                instructoresPrestan.splice(captura, 1);
                equiposPrestados.splice(captura, 1);
                marcasPrestadas.splice(captura, 1);
                cantidadPrestada.splice(captura, 1);

                idDevolucion.value = "";
                nombreDevolucion.value = "";
                marcaDevolucion.value = "";
                cantidadDevolucion.value = "";

                localStorage.setItem("instructsPrestan", JSON.stringify(instructoresPrestan));
                localStorage.setItem("equipPrestados", JSON.stringify(equiposPrestados));
                localStorage.setItem("marcasPrestad", JSON.stringify(marcasPrestadas));
                localStorage.setItem("cantPrestada", JSON.stringify(cantidadPrestada));
                
            }
            // Buscar el índice correcto en el array de stock
            let stockIndex = -1;
            for (let i = 0; i < equipos.length; i++) {
                if (nombresEquiposDev[captura] == equipos[i] && marcasDev[captura] == marcas[i]) {
                    stockIndex = i;
                }
            }
            
            if (stockIndex !== -1) {
                stock[stockIndex] += cantDevuelta;
                localStorage.setItem("Stock", JSON.stringify(stock)); // Guardar el stock actualizado
            }

        } else {
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "La cantidad supera a la prestada",
              });
        }
    }
    imprimirPrestamos();
    imprimirEquipos();
}else{
    Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Debe llenar todos los campos",
      });
};
});

function datosDevolucion(){
    if(localStorage.getItem("nombrEquipdev") != null){
    nombresEquiposDev=JSON.parse(localStorage.getItem("nombrEquipdev"));
    marcasDev=JSON.parse(localStorage.getItem("marcaEqdev"));
    cantidadDev=JSON.parse(localStorage.getItem("cantidEqdev"));
    instructoresDev=JSON.parse(localStorage.getItem("instructsdev"));
};};

window.addEventListener('load', datosDevolucion);
