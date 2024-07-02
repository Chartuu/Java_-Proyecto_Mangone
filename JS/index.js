const menu = [
    { codigo: 'A1', nombre: 'Pan con queso', precio: 1500, categoria: 'entrada' },
    { codigo: 'A2', nombre: 'Picada para 4 personas', precio: 5500, categoria: 'entrada' },
    { codigo: 'A3', nombre: 'Picada para 2 personas', precio: 3500, categoria: 'entrada' },
    { codigo: 'A4', nombre: 'Empanadas (6)', precio: 4000, categoria: 'entrada' },
    { codigo: 'B1', nombre: 'Pizza', precio: 7000, categoria: 'platoPrincipal' },
    { codigo: 'B2', nombre: 'Hamburguesa', precio: 5000, categoria: 'platoPrincipal' },
    { codigo: 'B3', nombre: 'Tacos', precio: 4000, categoria: 'platoPrincipal' },
    { codigo: 'B4', nombre: 'Asado', precio: 10500, categoria: 'platoPrincipal' },
    { codigo: 'C1', nombre: 'Gelatina', precio: 2000, categoria: 'postre' },
    { codigo: 'C2', nombre: 'Helado', precio: 3000, categoria: 'postre' },
    { codigo: 'C3', nombre: 'Flan', precio: 2500, categoria: 'postre' },
    { codigo: 'C4', nombre: 'Torta', precio: 3500, categoria: 'postre' },
    { codigo: 'D1', nombre: 'Agua', precio: 1000, categoria: 'bebida' },
    { codigo: 'D2', nombre: 'Jugo', precio: 1500, categoria: 'bebida' },
    { codigo: 'D3', nombre: 'Coca-Cola', precio: 2000, categoria: 'bebida' },
    { codigo: 'D4', nombre: 'Cerveza', precio: 3000, categoria: 'bebida' }
];

let pedidos = [];

// MOSTRAR EL MENU
function mostrarMenu() {
    let menuStr = '';
    menu.forEach(item => {
        menuStr += `${item.codigo} - ${item.nombre}: $${item.precio}<br>`;
    });
    document.getElementById('menu-list').innerHTML = menuStr;
}

// VERIFICAR SI EL CODIGO INGRESADO POR EL USUARIO ES VALIDO
function esCodigoValido(codigo) {
    return menu.some(item => item.codigo === codigo);
}

function calcularTotal(pedidos) {
    let total = 0;
    pedidos.forEach(pedido => {
        const item = menu.find(item => item.codigo === pedido.codigo);
        if (item) {
            total += item.precio * pedido.cantidad;
        }
    });
    return total;
}

function actualizarListaPedidos() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';

    pedidos.forEach((pedido, index) => {
        const item = menu.find(item => item.codigo === pedido.codigo);
        const totalItem = item.precio * pedido.cantidad;

        orderList.innerHTML += `
            <div class="order-item">
                <span>${item.nombre}</span>
                <span>Precio Unitario: $${item.precio}</span>
                <span>Cantidad: ${pedido.cantidad}</span>
                <span>Total: $${totalItem}</span>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </div>
        `;
    });

    const total = calcularTotal(pedidos);
    document.getElementById('resultado').innerHTML = `El total de su pedido es: $${total}`;
}

function iniciarPedido() {
    const orderForm = document.getElementById('order-form');

    let codigo = orderForm.querySelector('input[name="codigo"]').value.toUpperCase();
    if (!esCodigoValido(codigo)) {
        alert('Código no válido. Por favor, ingrese un código válido.');
        return;
    }

    let cantidad = parseInt(orderForm.querySelector('input[name="cantidad"]').value);
    if (isNaN(cantidad) || cantidad <= 0) {
        alert('Cantidad no válida. Por favor, ingrese una cantidad válida.');
        return;
    }

    const pedidoExistente = pedidos.find(pedido => pedido.codigo === codigo);
    if (pedidoExistente) {
        pedidoExistente.cantidad += cantidad;
    } else {
        pedidos.push({ codigo, cantidad });
    }

    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    actualizarListaPedidos();
}

function eliminarProducto(index) {
    pedidos.splice(index, 1);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    actualizarListaPedidos();
}

// Crear el formulario de pedido al cargar la página
function crearFormularioPedido() {
    const orderForm = document.getElementById('order-form');
    const formHtml = `
        <label for="codigo">Código del producto:</label>
        <input type="text" name="codigo" required>
        <label for="cantidad">Cantidad:</label>
        <input type="number" name="cantidad" required>
    `;
    orderForm.innerHTML = formHtml;
}

// Mostrar el menú y crear el formulario al iniciar
document.addEventListener('DOMContentLoaded', (event) => {
    mostrarMenu();
    crearFormularioPedido();
    pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    actualizarListaPedidos();
});
