import NewsApiService from './js-components/news-service' // імпортуємо окремо винесений метод роботи з методу роботи з API

const searchForm = document.querySelector('#search-form');     // отримуємо доступ до форми
const input = document.querySelector('input[name="searchQuery"]');     // отримуємо доступ до інпуту
const hitsContainer = document.querySelector('.gallery');  // отримуємо доступ до поля карток
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
    newsApiService.fetchHits(searchQuery) // викликаємо єдиний спільний метод роботи з API
        .then(hits => {
            clearHitsContainer(); // чистимо контейнер перед завантаженням даними наступного пошуку
            appendHitsMarkup(hits); // посилаємо для мапінгу в дом значення об'єктів даних
        });
}

function onLoadMore(e) { // функція наступних догрузок результатів пошуку
    newsApiService.fetchHits(searchQuery)  // викликаємо єдиний спільний метод роботи з API
        .then(appendHitsMarkup); // посилаємо для мапінгу в дом значення об'єктів даних
}
    
function appendHitsMarkup(hits) { // функція загрузки в контейнер та мапінгу в дом значення об'єктів даних
    hitsContainer.insertAdjacentHTML('beforeend', hitsTpl(hits)); 
}

function clearHitsContainer() { // функція очистки контейнеру перед мапінгом в дом значень іншого пошуку
    hitsContainer.innerHTML = '';
}

function hitsTpl(hits) { // функцію шаблону мапінгу результатів фетчу в дом
    const markup = hits.map(hit => { // мапимо дані з API в заготовку html для картки
        return `<div class="photo-card">
                <img class="img-card" src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy"/>
                <div class="info">
                  <p class="info-item">
                  <b>Likes</b> ${hit.likes}
                  </p>
                  <p class="info-item">
                  <b>Views</b> ${hit.views}
                  </p>
                  <p class="info-item">
                  <b>Comments</b> ${hit.comments}
                  </p>
                  <p class="info-item">
                  <b>Downloads</b> ${hit.downloads}
                  </p>
              </div>
            </div>`;
    })
    .join(''); // об'єднуємо всі елементи масиву в строку та розділяємо 'пробілом' (прибираємо коми за замовчуванням)
    hitsContainer.innerHTML = markup; // прописуємо новий html картки в домі
}