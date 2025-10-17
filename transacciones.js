// ==================== DATOS ====================
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

// ==================== FUNCIONES DE VISUALIZACIÓN ====================
function mostrarComponente(id){
    document.getElementById(id).style.display = "block";
}
function ocultarComponente(id){
    document.getElementById(id).style.display = "none";
}
function cargar(){
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
}

// ==================== FUNCIONES PRINCIPALES ====================

// Buscar cuenta
function buscarCuenta(numeroCuenta){
    for (let cuenta of cuentas){
        if (cuenta.numeroCuenta === numeroCuenta){
            return cuenta;
        }
    }
    return null;
}

// Ejecutar búsqueda
function ejecutarBusqueda(){
    let numeroCuenta = document.getElementById("txtNumeroCuentaT").value;
    let cuenta = buscarCuenta(numeroCuenta);
    let infoDiv = document.getElementById("infoCuenta");

    if(cuenta){
        infoDiv.innerHTML = `Cuenta encontrada: ${cuenta.nombre} ${cuenta.apellido} | Saldo actual: $${cuenta.saldo.toFixed(2)}`;
    } else {
        infoDiv.innerHTML = "";
        alert("Cuenta no encontrada.");
    }
}

// Depositar dinero
function depositar(numeroCuenta, monto){
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    if(cuentaAfectada){
        cuentaAfectada.saldo += monto;
        movimientos.push({numeroCuenta: numeroCuenta, monto: monto, tipo: "C"});
        return cuentaAfectada.saldo;
    }
    return null;
}

function ejecutarDeposito(){
    let numeroCuenta = document.getElementById("txtNumeroCuentaT").value;
    let monto = parseFloat(document.getElementById("txtMonto").value);

    if(isNaN(monto) || monto <= 0){
        alert("Ingrese un monto válido.");
        return;
    }

    let nuevoSaldo = depositar(numeroCuenta, monto);
    if(nuevoSaldo != null){
        alert(`DEPÓSITO EXITOSO\nNuevo saldo: $${nuevoSaldo.toFixed(2)}`);
        document.getElementById("infoCuenta").innerHTML = `Saldo actual: $${nuevoSaldo.toFixed(2)}`;
    } else {
        alert("Cuenta no encontrada.");
    }
}

// Retirar dinero
function retirar(numeroCuenta, monto){
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    if(cuentaAfectada){
        if(cuentaAfectada.saldo >= monto){
            cuentaAfectada.saldo -= monto;
            movimientos.push({numeroCuenta: numeroCuenta, monto: monto, tipo: "D"});
            alert(`RETIRO EXITOSO\nNuevo saldo: $${cuentaAfectada.saldo.toFixed(2)}`);
            document.getElementById("infoCuenta").innerHTML = `Saldo actual: $${cuentaAfectada.saldo.toFixed(2)}`;
        } else {
            alert("SALDO INSUFICIENTE");
        }
    } else {
        alert("Cuenta no encontrada.");
    }
}

function ejecutarRetiro(){
    let numeroCuenta = document.getElementById("txtNumeroCuentaT").value;
    let monto = parseFloat(document.getElementById("txtMonto").value);

    if(isNaN(monto) || monto <= 0){
        alert("Ingrese un monto válido.");
        return;
    }

    retirar(numeroCuenta, monto);
}

// ==================== MOVIMIENTOS ====================
function mostrarMovimientos(){
    let numeroCuenta = document.getElementById("txtNumeroCuentaM").value;
    let cuenta = buscarCuenta(numeroCuenta);
    let div = document.getElementById("tablaMovimientos");

    if(!cuenta){
        div.innerHTML = "Cuenta no encontrada.";
        return;
    }

    let lista = movimientos.filter(m => m.numeroCuenta === numeroCuenta);
    if(lista.length === 0){
        div.innerHTML = "No existen movimientos para esta cuenta.";
        return;
    }

    let html = `<table border="1" cellspacing="0" cellpadding="5">
                    <tr><th>Tipo</th><th>Monto</th></tr>`;
    lista.forEach(m => {
        html += `<tr><td>${m.tipo === "C" ? "Crédito" : "Débito"}</td><td>$${m.monto.toFixed(2)}</td></tr>`;
    });
    html += "</table>";
    div.innerHTML = html;
}

// ==================== CREAR NUEVA CUENTA ====================
function guardarCuenta(){
    let num = document.getElementById("txtNumeroCuentaC").value;
    let ced = document.getElementById("txtCedula").value;
    let nom = document.getElementById("txtNombre").value;

    if(!num || !ced || !nom){
        alert("Complete todos los campos.");
        return;
    }

    if(buscarCuenta(num)){
        alert("La cuenta ya existe.");
        return;
    }

    cuentas.push({numeroCuenta: num, cedula: ced, nombre: nom, apellido: "", saldo: 0});
    alert("Cuenta creada exitosamente.");
}
