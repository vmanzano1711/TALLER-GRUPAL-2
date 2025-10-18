//  DATOS INICIALES 
let cuentas = [
    {numeroCuenta:"02234567", cedula:"1714616123", nombre:"Juan", apellido:"Perez", saldo:100.0},
    {numeroCuenta:"02345211", cedula:"1281238233", nombre:"Felipe", apellido:"Caicedo", saldo:50.0}
];

let movimientos = [
    {numeroCuenta:"02234567", monto:10.24, tipo:"D"},
    {numeroCuenta:"02345211", monto:45.90, tipo:"D"},
    {numeroCuenta:"02234567", monto:65.23, tipo:"C"},
    {numeroCuenta:"02345211", monto:65.23, tipo:"C"},
    {numeroCuenta:"02345211", monto:12.0, tipo:"D"},
];

//  INICIO
function cargar(){
    mostrarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    ocultarComponente("divMovimientos");
    mostrarCuentas();
}

// CUENTAS 
function buscarCuenta(numeroCuenta){
    return cuentas.find(c => c.numeroCuenta === numeroCuenta) || null;
}

function agregarCuenta(cuenta){
    if(buscarCuenta(cuenta.numeroCuenta)){
        alert("Cuenta existente");
        return;
    }
    cuentas.push(cuenta);
    alert("Cuenta agregada exitosamente");
}

function agregar(){
    let cedula = recuperarTexto("txtCedula");
    let nombre = recuperarTexto("txtNombre");
    let apellido = recuperarTexto("txtApellido");
    let numeroCuenta = recuperarTexto("txtNumeroCuenta");

    if(!cedula || !nombre || !apellido || !numeroCuenta){
        alert("Todos los campos son obligatorios");
        return;
    }

    let cuenta = {numeroCuenta, cedula, nombre, apellido, saldo:0.0};
    agregarCuenta(cuenta);
    mostrarCuentas();
}

function mostrarCuentas(){
    let html = `<table border="1">
        <tr><th>N° CUENTA</th><th>CÉDULA</th><th>NOMBRE</th><th>SALDO</th></tr>`;
    
    for(let c of cuentas){
        html += `<tr>
                    <td>${c.numeroCuenta}</td>
                    <td>${c.cedula}</td>
                    <td>${c.nombre} ${c.apellido}</td>
                    <td>$${c.saldo.toFixed(2)}</td>
                 </tr>`;
    }
    html += "</table>";
    mostrarTexto("tablaCuentas", html);
}

//  TRANSACCIONES 
function ejecutarBusqueda(){
    let num = recuperarTexto("txtCuentaTransaccion");
    let cuenta = buscarCuenta(num);

    if(cuenta){
        mostrarTexto("infoCuenta", `Cuenta: ${cuenta.nombre} ${cuenta.apellido} — Saldo actual: $${cuenta.saldo.toFixed(2)}`);
    } else {
        mostrarTexto("infoCuenta", "");
        alert("Cuenta no encontrada");
    }
}

function ejecutarDeposito(){
    let num = recuperarTexto("txtCuentaTransaccion");
    let monto = parseFloat(recuperarTexto("txtMonto"));
    let cuenta = buscarCuenta(num);

    if(!cuenta){ alert("Cuenta no encontrada"); return; }
    if(isNaN(monto) || monto <= 0){ alert("Monto inválido"); return; }

    cuenta.saldo += monto;
    movimientos.push({numeroCuenta:num, monto:monto, tipo:"C"});
    alert(`Depósito exitoso. Nuevo saldo: $${cuenta.saldo.toFixed(2)}`);
    mostrarTexto("infoCuenta", `Saldo actual: $${cuenta.saldo.toFixed(2)}`);
}

function ejecutarRetiro(){
    let num = recuperarTexto("txtCuentaTransaccion");
    let monto = parseFloat(recuperarTexto("txtMonto"));
    let cuenta = buscarCuenta(num);

    if(!cuenta){ alert("Cuenta no encontrada"); return; }
    if(isNaN(monto) || monto <= 0){ alert("Monto inválido"); return; }
    if(cuenta.saldo < monto){ alert("Saldo insuficiente"); return; }

    cuenta.saldo -= monto;
    movimientos.push({numeroCuenta:num, monto:monto, tipo:"D"});
    alert(`Retiro exitoso. Nuevo saldo: $${cuenta.saldo.toFixed(2)}`);
    mostrarTexto("infoCuenta", `Saldo actual: $${cuenta.saldo.toFixed(2)}`);
}

//  MOVIMIENTOS
function buscarMovimientos(){
    let num = recuperarTexto("txtCuentaMov");
    let cuenta = buscarCuenta(num);

    if(!cuenta){
        mostrarTexto("tablaMovimientos", "Cuenta no encontrada");
        return;
    }

    let misMovs = movimientos.filter(m => m.numeroCuenta === num);
    if(misMovs.length === 0){
        mostrarTexto("tablaMovimientos", "No existen movimientos para esta cuenta");
        return;
    }

    let html = `<table border="1"><tr><th>TIPO</th><th>MONTO</th></tr>`;
    for(let m of misMovs){
        let tipo = m.tipo === "C" ? "Crédito" : "Débito";
        let signo = m.tipo === "D" ? "-" : "+";
        html += `<tr><td>${tipo}</td><td>${signo}$${m.monto.toFixed(2)}</td></tr>`;
    }
    html += "</table>";

    mostrarTexto("tablaMovimientos", html);
}

