class Menu {
    title = '';
    category = '';
    price = '';
    img = '';
    desc = '';
    api_url = 'https://63725c63025414c6370db7be.mockapi.io';


    async getAllMenu() {
        let api_url = 'https://63725c63025414c6370db7be.mockapi.io' + '/Menu';

        let response = await fetch(api_url);
        let data = await response.json();

        return data;
    }
}

