const tabContents = document.querySelectorAll('.tab_content_block');
const tabButtons = document.querySelectorAll('.tab_content_item');

if (tabContents.length > 0 && tabButtons.length > 0) {
    let currentIndex = 0;

    const showTab = (index) => {
        tabContents.forEach((content, i) => {
            content.style.display = i === index ? 'block' : 'none';
        });

        tabButtons.forEach((button, i) => {
            button.classList.toggle(
                'tab_content_item_active',
                i === index
            );
        });

        currentIndex = index;
    };

    // Показываем первую вкладку
    showTab(0);

    // Переключение по нажатию
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            showTab(index);
        });
    });

    // Автоматическое переключение каждые 5 секунд
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % tabContents.length;
        showTab(nextIndex);
    }, 5000);
}

//dz4
//3


const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const inputs = [somInput, usdInput, eurInput];

async function converter(element) {
    try {
        const response = await fetch('../data/converter.json');

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const { usd, eur } = await response.json();

        const somPerUsd = usd;
        const somPerEur = eur;

        if (element.value === '') {
            inputs.forEach(input => {
                if (input !== element) {
                    input.value = '';
                }
            });
            return;
        }

        const value = Number(element.value);
        let som;

        if (element.id === 'som') {
            som = value;
        } else if (element.id === 'usd') {
            som = value * somPerUsd;
        } else if (element.id === 'eur') {
            som = value * somPerEur;
        }

        somInput.value =
            element.id === 'som' ? value : som.toFixed(2);

        usdInput.value =
            element.id === 'usd' ? value : (som / somPerUsd).toFixed(2);

        eurInput.value =
            element.id === 'eur' ? value : (som / somPerEur).toFixed(2);

    } catch (error) {
        console.error('Ошибка конвертации:', error);
    }
}

inputs.forEach(input => {
    input.addEventListener('input', () => converter(input));
});

//4
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');
const card = document.querySelector('.card');

let counter = 1;
const MAX_TODOS = 200;

const TODO_API = (id) =>
    `https://jsonplaceholder.typicode.com/todos/${id}`;

const fetchTodo = async (id) => {
    try {
        const response = await fetch(TODO_API(id));

        if (!response.ok) {
            throw new Error('Не удалось загрузить задачу');
        }

        const { id: todoId, title, completed } = await response.json();

        const color = completed ? 'green' : 'red';

        card.style.border = `2px solid ${color}`;

        card.innerHTML = `
            <p>ID - ${todoId}</p>
            <p>${title}</p>
            <p style="color: ${color}">
                ${completed ? 'Completed' : 'Must to do!'}
            </p>
        `;
    } catch (error) {
        console.error('Ошибка:', error);
    }
};

btnNext.onclick = () => {
    counter = counter >= MAX_TODOS ? 1 : counter + 1;
    fetchTodo(counter);
};
btnPrev.onclick = () => {
    counter = counter <= 1 ? MAX_TODOS : counter - 1;
    fetchTodo(counter);
};
fetchTodo(counter);