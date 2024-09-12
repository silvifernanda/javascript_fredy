function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'block' : 'none';
}

function toggleBeverages(beveragesId) {
    const beverages = document.getElementById(beveragesId);
    beverages.style.display = beverages.style.display === 'none' || beverages.style.display === '' ? 'block' : 'none';
}

let orders = {
    mesa1: { total: 0, count: 0 },
    mesa2: { total: 0, count: 0 },
    mesa3: { total: 0, count: 0 }
};

function addOrder(mesaId) {
    const comidaInputs = document.querySelectorAll(`#${mesaId} .comidas input`);
    const bebidaInputs = document.querySelectorAll(`#${mesaId} .beverages input`);

    let total = 0;
    let count = 0;

    comidaInputs.forEach(input => {
        const quantity = parseInt(input.value);
        const price = parseInt(input.dataset.price);
        if (quantity > 0) {
            total += quantity * price;
            count += quantity;
        }
    });

    bebidaInputs.forEach(input => {
        const quantity = parseInt(input.value);
        const price = parseInt(input.dataset.price);
        if (quantity > 0) {
            total += quantity * price;
            count += quantity;
        }
    });

    const mesa = orders[mesaId];
    mesa.total += total;
    mesa.count += count;

    const totalElement = document.getElementById(`total${mesaId.replace('mesa', '')}`);
    const ordersCountElement = document.getElementById(`orders${mesaId.replace('mesa', '')}`);
    
    totalElement.innerText = `$${mesa.total.toLocaleString()}`;
    ordersCountElement.innerText = mesa.count;

    // Reset quantities
    comidaInputs.forEach(input => input.value = 0);
    bebidaInputs.forEach(input => input.value = 0);
}
