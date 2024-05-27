// Definicion de las variables 
/*
const menu = {
    entrada: {
        A1: { nombre: 'Pan con queso', precio: 1500 },
        A2: { nombre: 'Picada para 4 personas', precio: 5500 },
        A3: { nombre: 'Picada para 2 personas', precio: 3500 },
        A4: { nombre: 'Empanadas (6)', precio: 4000 }
    },
    platoPrincipal: {
        B1: { nombre: 'Pizza', precio: 7000 },
        B2: { nombre: 'Hamburguesa', precio: 5000 },
        B3: { nombre: 'Tacos', precio: 4000 },
        B4: { nombre: 'Asado', precio: 10500 }
    },
    postre: {
        C1: { nombre: 'Gelatina', precio: 2000 },
        C2: { nombre: 'Helado', precio: 3000 },
        C3: { nombre: 'Flan', precio: 2500 },
        C4: { nombre: 'Torta', precio: 3500 }
    },
    bebidas: {
        D1: { nombre: 'Agua', precio: 1000 },
        D2: { nombre: 'Jugo', precio: 1500 },
        D3: { nombre: 'Coca-Cola', precio: 2000 },
        D4: { nombre: 'Cerveza', precio: 3000 }
    }
};*/


const menu = {
    A1: { nombre: 'Pan con queso', precio: 1500 },
    A2: { nombre: 'Picada para 4 personas', precio: 5500 },
    A3: { nombre: 'Picada para 2 personas', precio: 3500 },
    A4: { nombre: 'Empanadas (6)', precio: 4000 },
    B1: { nombre: 'Pizza', precio: 7000 },
    B2: { nombre: 'Hamburguesa', precio: 5000 },
    B3: { nombre: 'Tacos', precio: 4000 },
    B4: { nombre: 'Asado', precio: 10500 },
    C1: { nombre: 'Gelatina', precio: 2000 },
    C2: { nombre: 'Helado', precio: 3000 },
    C3: { nombre: 'Flan', precio: 2500 },
    C4: { nombre: 'Torta', precio: 3500 },
    D1: { nombre: 'Agua', precio: 1000 },
    D2: { nombre: 'Jugo', precio: 1500 },
    D3: { nombre: 'Coca-Cola', precio: 2000 },
    D4: { nombre: 'Cerveza', precio: 3000 }
};


// MOSTRAR EL MENU

function mostrarMenu() {
    let menuStr = 'Menú del Restaurante\n\n';
    for (let codigo in menu) {
        const item = menu[codigo];
        menuStr += `${codigo} - ${item.nombre}: $${item.precio}\n`;
    }
    console.log(menuStr);
}


// VERIFICAR SI EL CODIGO INGRESADO POR EL USUARIO ES VALIDO

function esCodigoValido(codigo) {
    return menu.hasOwnProperty(codigo);
}

function calcularTotal(pedidos) {
    let total = 0;
    for (let codigo in pedidos) {
        const cantidad = pedidos[codigo];
        total += menu[codigo].precio * cantidad;
    }
    return total;
}

function iniciarPedido() {
    const pedidos = {};
    let continuar = true;

    while (continuar) {
        let codigo;
        do {
            codigo = prompt('Ingrese el código del producto que desea:').toUpperCase();
            if (!esCodigoValido(codigo)) {
                alert('Código no válido. Por favor, ingrese un código válido.');
            }
        } while (!esCodigoValido(codigo));

        let cantidad;
        do {
            cantidad = parseInt(prompt('Ingrese la cantidad deseada:'));
            if (isNaN(cantidad) || cantidad <= 0) {
                alert('Cantidad no válida. Por favor, ingrese una cantidad válida.');
            }
        } while (isNaN(cantidad) || cantidad <= 0);

        if (pedidos[codigo]) {
            pedidos[codigo] += cantidad;
        } else {
            pedidos[codigo] = cantidad;
        }

        let respuesta;
        do {
            respuesta = prompt('¿Desea agregar otro producto? (s/n)').toLowerCase();
            if (respuesta !== 's' && respuesta !== 'n') {
                alert('Respuesta no válida. Por favor, ingrese "s" para sí o "n" para no.');
            }
        } while (respuesta !== 's' && respuesta !== 'n');

        continuar = (respuesta === 's');
    }

    const total = calcularTotal(pedidos);
    console.log(`El total de su pedido es: $${total}`);
}

// Mostrar el menú al iniciar
mostrarMenu();
iniciarPedido();