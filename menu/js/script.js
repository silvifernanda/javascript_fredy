document.addEventListener('DOMContentLoaded', () => {
    const tables = document.querySelectorAll('.table');
    const finalTotalElement = document.getElementById('final-total');

    const updateTotal = (table) => {
        const foodMenu = table.querySelector('.food-menu');
        const drinkMenu = table.querySelector('.drink-menu');
        const foodQuantityElement = table.querySelector('.quantity[data-type="food"]');
        const drinkQuantityElement = table.querySelector('.quantity[data-type="drink"]');
        const totalElement = table.querySelector('.total');

        const foodPrice = parseFloat(foodMenu.value) || 0;
        const drinkPrice = parseFloat(drinkMenu.value) || 0;
        const foodQuantity = parseInt(foodQuantityElement.textContent) || 0;
        const drinkQuantity = parseInt(drinkQuantityElement.textContent) || 0;

        const total = (foodPrice * foodQuantity) + (drinkPrice * drinkQuantity);
        totalElement.textContent = total.toFixed(2);
    };

    const updateFinalTotal = () => {
        let grandTotal = 0;
        tables.forEach(table => {
            const totalElement = table.querySelector('.total');
            grandTotal += parseFloat(totalElement.textContent) || 0;
        });
        finalTotalElement.textContent = grandTotal.toFixed(2);
    };

    tables.forEach(table => {
        const foodMenu = table.querySelector('.food-menu');
        const drinkMenu = table.querySelector('.drink-menu');
        const foodQuantityElement = table.querySelector('.quantity[data-type="food"]');
        const drinkQuantityElement = table.querySelector('.quantity[data-type="drink"]');

        table.querySelectorAll('.increment').forEach(button => {
            button.addEventListener('click', () => {
                const quantityElement = button.previousElementSibling;
                quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
                updateTotal(table);
                updateFinalTotal();
            });
        });

        table.querySelectorAll('.decrement').forEach(button => {
            button.addEventListener('click', () => {
                const quantityElement = button.nextElementSibling;
                let quantity = parseInt(quantityElement.textContent);
                if (quantity > 0) {
                    quantityElement.textContent = quantity - 1;
                    updateTotal(table);
                    updateFinalTotal();
                }
            });
        });

        foodMenu.addEventListener('change', () => {
            updateTotal(table);
            updateFinalTotal();
        });

        drinkMenu.addEventListener('change', () => {
            updateTotal(table);
            updateFinalTotal();
        });

        table.querySelector('.order-button').addEventListener('click', () => {
            alert(Pedido realizado para la Mesa ${table.id.replace('table', '')}. Total: $${table.querySelector('.total').textContent});
        });
    });

    // Initial update of the final total
    updateFinalTotal();
});
