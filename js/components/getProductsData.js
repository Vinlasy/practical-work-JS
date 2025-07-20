// Получить товары с сервера(файла)
export default async function getProductsData() {
    const response = await fetch('./data/data.json', {
        headers: {
            email: 'test00@test.ru'
        }
    });
    const data = await response.json();

    return data;
}