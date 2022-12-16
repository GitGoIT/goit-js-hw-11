export default class LoadMoreBtn {
    constructor({ selector, hidden = false }) {
        this.refs = this.getRefs(selector); // задаємо в this.refs посилання на змінні в кнопці

        hidden && this.hide(); // виконуємо якщо на кнопці встановлено початкове правило hidden=true тоді ховаємо її методом hide(нижче)
    }


getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector); // посилання на кнопку
    refs.label = refs.button.querySelector('.label'); // посилання на label
    refs.spinner = refs.button.querySelector('.spinner'); // посилання на spin

    return refs;
    }
 

enable() { // стан кнопки на очікування кліку для завандаження даних (задаємо в парі з методами show/hide)
    this.refs.button.disabled = false; // робимо кнопку активною
    this.refs.label.textContent = 'Load more'; // підставляємо на кнопку слово Load more
    this.refs.spinner.classList.add('is-hidden'); // деактивуємо спінер на кнопці
    this.refs.button.classList.remove('is-hidden'); // прибираэмо hidden, робимо кнопку видимою
}

disable() { // стан кнопки на імітацію завантаження даних (задаємо в парі з методами show/hide)
    this.refs.button.disabled = true; // робимо кнопку неактивною
    this.refs.label.textContent = 'Loading...'; // підставляємо на кнопку слово Loading...
    this.refs.spinner.classList.remove('is-hidden'); // активуємо спінер на кнопці
    this.refs.button.classList.add('is-hidden'); // ставимо hidden, робимо кнопку невидимою
}

show() {  // метод показування кнопки Load more 
    this.refs.button.classList.remove('is-hidden'); // знімаємо hidden, робимо кнопку видимою
}

hide() { // метод приховування кнопки Load more 
    this.refs.button.classList.add('is-hidden'); // ставимо hidden, робимо кнопку невидимою
    }
}