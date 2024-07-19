let menu = [];
let pedidos = [];

// Cargar el menú desde un archivo JSON usando fetch
async function cargarMenu() {
    try {
        const response = await fetch('./data/menu.json');
        const data = await response.json();
        console.log('Menu cargado:', data); // Agrega este log
        menu = data;
        mostrarMenu();
    } catch (error) {
        console.error('Error al cargar el menú:', error);
    }
}

// Mostrar el menú en el DOM
function mostrarMenu() {
    let menuStr = '';
    menu.forEach(item => {
        menuStr += `<div>${item.codigo} - ${item.nombre}: $${item.precio}</div>`;
    });
    console.log('Menú HTML:', menuStr); // Agrega este log
    document.getElementById('menu-list').innerHTML = menuStr;
}

// Verificar si el código ingresado por el usuario es válido
function esCodigoValido(codigo) {
    return menu.some(item => item.codigo === codigo);
}

// Calcular el total del pedido
function calcularTotal(pedidos) {
    return pedidos.reduce((total, pedido) => {
        const item = menu.find(item => item.codigo === pedido.codigo);
        return total + (item ? item.precio * pedido.cantidad : 0);
    }, 0);
}

// Actualizar la lista de pedidos en el DOM
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

// Iniciar el proceso de agregar un pedido
function iniciarPedido() {
    const orderForm = document.getElementById('order-form');

    let codigo = orderForm.querySelector('input[name="codigo"]').value.toUpperCase();
    console.log('Código ingresado:', codigo); // Agrega este log
    if (!esCodigoValido(codigo)) {
        alert('Código no válido. Por favor, ingrese un código válido.');
        return;
    }

    let cantidad = parseInt(orderForm.querySelector('input[name="cantidad"]').value);
    console.log('Cantidad ingresada:', cantidad); // Agrega este log
    if (isNaN(cantidad) || cantidad <= 0) {
        alert('Cantidad no válida. Por favor ingrese una cantidad válida.');
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
// Eliminar un producto del pedido
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
    console.log('Formulario de pedido creado'); // Agrega este log
    orderForm.innerHTML = formHtml;
}


// Mostrar el menú y crear el formulario al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarMenu();
    crearFormularioPedido();
    pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    actualizarListaPedidos();
});
