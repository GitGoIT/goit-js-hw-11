import NewsApiService from './js-components/news-service' // імпортуємо окремо винесений метод роботи з методу роботи з API

const searchForm = document.querySelector('#search-form');     // отримуємо доступ до форми
const input = document.querySelector('input[name="searchQuery"]');     // отримуємо доступ до інпуту
const articlesContainer = document.querySelector('.gallery');  // отримуємо доступ до поля карток
const loadMoreBtn = document.querySelector('.load-more');  // отримуємо доступ до пкнопки дозавантаження

const newsApiService = new NewsApiService(); // створюємо новий об'єкт для обробки методу роботи з API

searchForm.addEventListener('submit', onSearch)  // слухач для форми пошуку
loadMoreBtn.addEventListener('click', onLoadMore)  // слухач для кнопки дозавантаження

let searchQuery = ''; // оголошуємо глобальну змінну для можливості роботи з нею окремовинисеного методу fetchArticles

function onSearch(e) {  // функція першої загрузки результатів пошуку
    e.preventDefault();   // знімаємо перезавантаження сторінки при роботі з формою
    newsApiService.query = input.value; // отримуємо в обєкт дані з інпуту
    if (newsApiService.query === '') {  // виводимо повідомлення в разі сабміту пустого інпуту
        return alert('Please enter a value to search for results');
    }
    newsApiService.resetPage(); // додаємо на submit метод скдинання сторінки до 1-ї при новому пошуку (описуємо в класі NewsApiService)
    console.log(newsApiService.query);
    newsApiService.fetchArticles(searchQuery) // викликаємо єдиний спільний метод роботи з API
        .then(articles => {
            clearArticlesContainer(); // чистимо контейнер перед завантаженням даними наступного пошуку
            appendArticlesMarkup(articles); // посилаємо для мапінгу в дом значення об'єктів даних
        });
}

function onLoadMore(e) { // функція наступних догрузок результатів пошуку
    newsApiService.fetchArticles(searchQuery)  // викликаємо єдиний спільний метод роботи з API
        .then(appendArticlesMarkup); // посилаємо для мапінгу в дом значення об'єктів даних
}
    
function appendArticlesMarkup(articles) { // функція загрузки в контейнер та мапінгу в дом значення об'єктів даних
    articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles)); 
}

function clearArticlesContainer() { // функція очистки контейнеру перед мапінгом в дом значень іншого пошуку
    articlesContainer.innerHTML = '';
}