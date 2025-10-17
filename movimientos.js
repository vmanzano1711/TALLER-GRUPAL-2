let movimientos = [
    {numeroCuenta:"02234567", monto:10.24, tipo:"D"},
    {numeroCuenta:"02345211", monto:45.90, tipo:"D"},
    {numeroCuenta:"02234567", monto:65.23, tipo:"C"},
    {numeroCuenta:"02345211", monto:65.23, tipo:"C"},
    {numeroCuenta:"02345211", monto:12.0, tipo:"D"},
];

cargar = function(){
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
}

/*
    Filtra los movimientos según el número de cuenta ingresado
*/
filtrarMovimientos = function(numeroCuenta){
    let movimientosCuenta = [];
    // Se recorre el arreglo completo
    for(let i = 0; i < movimientos.length; i++){
        if(movimientos[i].numeroCuenta === numeroCuenta){
            movimientosCuenta.push(movimientos[i]);
        }
    }
    mostrarMovimientos(movimientosCuenta);
}

/*
    Muestra en pantalla una tabla con los movimientos recibidos
*/
mostrarMovimientos = function(misMovimientos){
    let tabla = "<table border='1' class='tabla-movimientos'>";
    tabla += "<tr><th>NUMERO CUENTA</th><th>MONTO</th><th>TIPO</th></tr>";

    for(let i = 0; i < misMovimientos.length; i++){
        let mov = misMovimientos[i];
        let montoMostrar = mov.tipo === "D" ? mov.monto * -1 : mov.monto;
        tabla += `<tr>
                    <td>${mov.numeroCuenta}</td>
                    <td>${montoMostrar.toFixed(2)}</td>
                    <td>${mov.tipo}</td>
                  </tr>`;
    }
    tabla += "</table>";

    document.getElementById("tablaMovimientos").innerHTML = tabla;
}

/*
    Evento del botón BUSCAR
    (para hacerlo funcional desde el HTML)
*/
function buscarMovimientos(){
    let numeroCuenta = document.querySelector("#divMovimientos input[type='text']").value;
    filtrarMovimientos(numeroCuenta);
}





