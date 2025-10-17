let cuentas = [
    { numeroCuenta: "02234567", cedula: "1714616123", nombre: "Juan", apellido: "Perez", saldo: 0.0 },
    { numeroCuenta: "02345211", cedula: "1281238233", nombre: "Felipe", apellido: "Caicedo", saldo: 0.0 }
]

cargar = function () {
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    // Asocia el botón con la función agregar
    document.getElementById("btnGuardarCuenta").addEventListener("click", agregar);
    mostrarCuentas();


}

mostrarCuentas = function () {
    /*
        Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
        Columnas: NUMERO CUENTA, NOMBRE, SALDO
        En la columna NOMBRE concatenar el nombre y el apellido
    */
    let contenido = `
           <table>
            <thead>
                <tr>
                    <th>Numero de cuenta</th>
                    <th>Numero de cedula</th>
                    <th>Nombre </th>
                    <th>Saldo </th>
                </tr>
            </thead>
            <tbody>
   `;
    //Recorre el arrelgo global 'cuentas' para construir cada fila de la tabla
    for (let i = 0; i < cuentas.length; i++) {
        let cuenta = cuentas[i]; //Obtiene la cuenta acutual
        let nombreCompleto = cuenta.nombre + " " + cuenta.apellido; //Concatena nombre y apellido

        // Agrega una fila HMTL con los datos de la cuenta
        // El saldo se muestra con dos decimales usando toFixed(2)
        contenido += `
        <tr>
            <td>${cuenta.numeroCuenta}</td>
            <td>${cuenta.cedula}</td>
            <td>${nombreCompleto}</td>
            <td>${cuenta.saldo.toFixed(2)}</td>
        </tr>    
    `;
    }
    // Cierra la estructura de la tabla
    contenido += `</tbody></table>`;
    // Usa el utilitarop 'mostrarTexto' para insertar la tabla en el componente con id 'tablaCuentas'
    mostrarTexto("tablaCuentas", contenido);
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta = function (numeroCuenta) {
    //Recorrer el arreglo global 'cuentas' para buscar una coincidencia
    // Se compara el numero de cuenta ingresado con cada elemento del arreglo

    for (let i = 0; i < cuentas.length; i++) {
        //Verificar si el numero de cuenta actual coincide con el buscado
        if (cuentas[i].numeroCuenta == numeroCuenta) {
            // si hay coincidencia, retorna el objeto encontrado
            return cuentas[i];
        }
    }
    // si no se encuentra ninguna coincidencia, retorna null
    // Esto permite manejar el caso de cuenta inexistente en otras funciones
    return null;
};

/*
    Agrega una cuenta al arreglo, solamente si no existe otra cuenta con el mismo numero.
    No retorna nada
*/
//agregarCuenta=function(cuenta){
//Si ya existe mostrar un alert CUENTA EXISTENTE
//Si se agrega, mostrar un alert CUENTA AGREGADA
//}

//agregar=function(){
//Toma los valores de las cajas de texto, sin validaciones
//Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
//Invoca a agregarCuenta
//Invoca a mostrarCuentas
//}
agregarCuenta = function (cuenta) {
    //Buscar si ya existe una cuenta con el mismo numero
    let existe = buscarCuenta(cuenta.numeroCuenta);
    // si la cuenta ya existe, mostrar alerta y detener el proceso
    if (existe !== null) {
        alert("Cuenta existente");
        return;
    }
    // si no exite, agregar la nueva cuenta al arreglo 'cuentas'
    cuentas.push(cuenta);
    // confirmar al usuario que la cuenta fue agregada exitosamente
    alert("CUENTA AGREGADA");
};
agregar = function () {
    //Recuperar el valor ingresado en el campo cedula
    let cedula = recuperarTexto("txtCedula");
    //Recuperar e valor ingresado en el campo de nombre
    let nombre = recuperarTexto("txtNombre");
    // Recuperar el valor ingresado en el campo de apellido
    let apellido = recuperarTexto("txtApellido");
    //Recuperar el valor ingresado en el campo de numero de cuenta
    let numeroCuenta = recuperarTexto("txtNumeroCuenta");
    //Construir el objeto 'cuenta' con los datos ingresados

      // Validación: verificar que ningún campo esté vacío
    if (cedula === "" || nombre === "" || apellido === "" || numeroCuenta === "") {
        alert("Todos los campos son obligatorios");
        return;
    }


    let cuenta = {
        numeroCuenta: numeroCuenta, //identificador unico de la cuenta
        cedula: cedula, // cedula del titular
        nombre: nombre,
        apellido: apellido,
        saldo: 0.0
    };
    //Intentar agregar la cuenta al sistema (verifica duplicados internamente)
    agregarCuenta(cuenta);
    // Actualziar la visualización de todas las cuentas registradas
    mostrarCuentas();
};
