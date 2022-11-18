const sectionCenter = document.querySelector('.section-center');
const btnContainer = document.querySelector('.btn-container');
const searchBar = document.querySelector('#search-item');


async function getAll() {
    let all_menu = new Menu();
    all_menu = await all_menu.getAllMenu();

    all_menu.forEach(menuItem => {
        sectionCenter.innerHTML += `<article class="menu-item">
                                        <img src=${menuItem.img} class="photo" alt=${menuItem.title}>
                                        <div class="item-info">
                                            <header>
                                                <h4 class="a-name">${menuItem.title}</h4>
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
                sectionCenter.innerHTML = '';
                getAll();
            } else {
                let displayCategory = MenuCategory.map(item => {
                    return `
                    <article class="menu-item">
                    <img src=${item.img} class="photo" alt=${item.title}>
                    <div class="item-info">
                        <header>
                            <h4 class="a-name">${item.title}</h4>
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
displayMenuButtons();


searchBar.addEventListener('keyup', search)

function search () {
    const searchBox = document.getElementById('search-item').value.toUpperCase();
    //const menuItems = document.getElementById('section-center');
    const product = document.querySelectorAll('.menu-item');
    const pname = document.getElementsByClassName('a-name');

    for (let i = 0; i < pname.length; i++) {
        let match = product[i].getElementsByClassName('a-name')[0];

        if (match) {
            let textValue = match.textContent || match.innerHTML

            if(textValue.toUpperCase().indexOf(searchBox) > -1) {
                product[i].style.display = ''
            } else {
                product[i].style.display = 'none'
            }
        }
    }
}


