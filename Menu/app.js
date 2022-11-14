const sectionCenter = document.querySelector('.section-center');
const btnContainer = document.querySelector('.btn-container');


async function getAll() {
    let all_menu = new Menu();
    all_menu = await all_menu.getAllMenu();

    all_menu.forEach(menuItem => {
        sectionCenter.innerHTML += `<article class="menu-item">
                                        <img src=${menuItem.img} class="photo" alt=${menuItem.title}>
                                        <div class="item-info">
                                            <header>
                                                <h4>${menuItem.title}</h4>
                                                <h4 class="price">$${menuItem.price}</h4>
                                            </header>
                                            <p class="item-text">
                                                ${menuItem.desc}
                                            </p>
                                        </div>
                                </article>`;
    });
}
getAll();

async function displayMenuButtons() {
    let all_menu = new Menu();
    all_menu = await all_menu.getAllMenu();

    const categories = all_menu.reduce(function (values, item) {
        if (!values.includes(item.category)) {
            values.push(item.category);
        }
        return values;
    }, ['all']);
    const categoryBtns = categories.map(function (category) {
        return `<button
        class="filter-btn"
        type="button" 
         data-id=${category}
                            >
            ${category} 
            </button>`;
    }).join("");
    btnContainer.innerHTML = categoryBtns;
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            const category = e.currentTarget.dataset.id;
            const MenuCategory = all_menu.filter(function (menuItem) {
                if (menuItem.category === category) {
                    return menuItem;
                };
            });
            if (category === 'all') {
                sectionCenter.innerHTML = ''
                getAll();
            } else {
                let displayCategory = MenuCategory.map(item => {
                    return `
                    <article class="menu-item">
                    <img src=${item.img} class="photo" alt=${item.title}>
                    <div class="item-info">
                        <header>
                            <h4>${item.title}</h4>
                            <h4 class="price">$${item.price}</h4>
                        </header>
                        <p class="item-text">
                            ${item.desc}
                        </p>
                    </div>
                    </article>
                    `;
                });
                displayCategory = displayCategory.join("");
                sectionCenter.innerHTML = displayCategory;
            }
        });
    });
}
displayMenuButtons()

