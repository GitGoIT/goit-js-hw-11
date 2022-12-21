import axios from 'axios';

const API_KEY = '32070440-da23fcdb10bb13069c595106c' // виносимо ключ в змінну

export default class NewsApiService { // створюємо окремий класс для роботи з АРІ

    constructor() {
        this.searchQuery = ''; // оголошуємо глобальну змінну в конструкторі для подальшого перезапису через метод get та set
        this.page = 1; // вводимо параметер номера сторінки для можливості догрузки    
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////
    //                   ОТРИМАННЯ ДАНИХ ПО API МЕТОДОМ FETCH ЧЕРЕЗ THEN
    //
    // fetchHits(searchQuery) {  // формуємо єдиний метод який буде відповідати за HTTP запити
    //     console.log(this);
    //     const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&lang=en&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    //
    //     return fetch(url)  //забираємо проміс даних по лінку API
    //         .then(response => response.json()) //парсимо дані в текстовий формат json
    //         .then(({ hits }) => {
    //             this.incrementPage(); // догружаємо сторінки з даними при кожному кліку на load more(метод описаний нижче)
    //             return hits; // повертаємо у зовнішній код проміс значення об'єкту даних
    //         })
    //     }
    //////////////////////////////////////////////////////////////////////////////////////// 
 
async fetchHits(searchQuery) {
    console.log(this);
    try {
        const response = await axios.get(  // фетчимо через бібліотеку axios
        `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&lang=en&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);
        const data  =  response.data; // вводимо змінну отриманого об'єкта даних
        console.log(data);
    if (response.status !== 200) {
        throw new Error(response.status);
       }
        this.incrementPage(); // догружаємо сторінки з даними при кожному кліку на load more(метод описаний нижче)
        return data;  // повертаємо у зовнішній код проміс значення об'єкту даних 
    } catch (error) { // ловимо помилку 
        return error;
        }
  }
     

        incrementPage() { // прописуємо метод збільшення номеру сторінки до наступної при кліку на load more
            this.page += 1;
        }

        resetPage() { // прописуємо метод скидання номеру сторінки до 1-ї при новому пошуку
            this.page = 1;
        }

        get query() { //  прописуємо в конструктор медот для отримання змінної 
            return this.searchQuery;
        }
        set query(newQuery) { //  прописуємо в конструктор медот для перезапису змінної 
            this.searchQuery = newQuery;
        }
    }


