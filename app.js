document.addEventListener('DOMContentLoaded', function () {
    const lista = document.querySelector('.lista');
    const nombreProducto = document.querySelector('#nombreProducto');
    const cantidadProducto = document.querySelector('#cantidadProducto');
    const catProducto = document.querySelector('#catProducto');
    const btnAñadir = document.querySelector('#btnAñadir');
    const btnLimpiar = document.querySelector('#btnLimpiar');
    const ul = document.querySelector('#listaProductos');

    // Usando localStorage
    let listaCompras = JSON.parse(localStorage.getItem('listaCompras')) || [];

    function guardarLista() {
        localStorage.setItem('listaCompras', JSON.stringify(listaCompras));
    }

    function mostrarLista() {
        ul.innerHTML = '';

        listaCompras.forEach((item, index) => {
            const li = document.createElement('li');
            const p = document.createElement('p');
            p.textContent = `${item.cantidad} - ${item.producto} | ${item.categoria}`;
            if (item.comprado) p.classList.add('btnComprado');
            li.appendChild(p);

            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar Item';
            btnEliminar.classList.add('btnsProducto');
            btnEliminar.addEventListener('click', () => {
                listaCompras.splice(index, 1);
                guardarLista();
                mostrarLista();
            });

            const btnComprado = document.createElement('button');
            btnComprado.textContent = 'Producto Comprado';
            btnComprado.classList.add('btnsProducto');
            if (item.comprado) btnComprado.classList.add('btnComprado');
            btnComprado.addEventListener('click', () => {
                listaCompras[index].comprado = !listaCompras[index].comprado;
                guardarLista();
                mostrarLista();
            });

            li.appendChild(btnEliminar);
            li.appendChild(btnComprado);
            ul.appendChild(li);
        });
    }

    // Añadiendo la función
    btnAñadir.addEventListener('click', (e) => {
        const producto = nombreProducto.value.trim();
        const cantidad = parseInt(cantidadProducto.value);
        const categoria = catProducto.value.trim();

        if (producto !== '' && cantidad > 0) {
            listaCompras.push({
                producto: producto,
                cantidad: cantidad,
                categoria: categoria,
                comprado: false
            });

            guardarLista();
            mostrarLista();

            // Limpiamos los inputs
            nombreProducto.value = '';
            cantidadProducto.value = '';
            catProducto.value = '';
        }
    });

    btnLimpiar.addEventListener('click', (e) => {
        nombreProducto.value = '';
        cantidadProducto.value = '';
        catProducto.value = '';
    });

    // Mostrar al cargar
    mostrarLista();
});
