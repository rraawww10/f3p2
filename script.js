// Script for restaurant project

// Step 1: getMenu()
async function getMenu() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
        const menuItems = await response.json();

        const menuContainer = document.getElementById('menu');
        menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <img src="${item.imgSrc}" alt="${item.name}" />
            `;
            menuContainer.appendChild(menuItem);
        });
    } catch (error) {
        console.error('Error fetching the menu:', error);
    }
}

// Step 2: takeOrder()
function takeOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            const burgers = ['Cheeseburger', 'Veggie Burger', 'Chicken Burger', 'Bacon Burger', 'Fish Burger'];
            const selectedBurgers = [];

            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * burgers.length);
                selectedBurgers.push(burgers[randomIndex]);
            }

            resolve({ order: selectedBurgers });
        }, 2500);
    });
}

// Step 3: orderPrep()
function orderPrep() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

// Step 4: payOrder()
function payOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

// Step 5: thankyouFnc()
function thankyouFnc() {
    alert('Thank you for eating with us today!');
}


async function handleOrderProcess() {
    try {
        await getMenu();

        const order = await takeOrder();
        console.log('Order taken:', order);

        const orderStatus = await orderPrep();
        console.log('Order prepared:', orderStatus);

        const paymentStatus = await payOrder();
        console.log('Payment status:', paymentStatus);

        if (paymentStatus.paid) {
            thankyouFnc();
        }
    } catch (error) {
        console.error('Error in the order process:', error);
    }
}

// Start the process on page load
window.onload = () => {
    handleOrderProcess();
};
