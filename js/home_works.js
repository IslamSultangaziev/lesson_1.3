//dz1
//1
const gmailInput = document.querySelector("#gmail_input");
const checkButton = document.querySelector("#gmail_button");
const result = document.querySelector("#gmail_result")

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

checkButton.addEventListener("click", () => {
    const gmail = gmailInput.value.trim();

    if (gmailRegex.test(gmail)) {
        result.style.color = 'green'
        result.textContent = 'Gmail true'
    } else {
        result.style.color = 'red'
        result.textContent = 'Gmail false'
    }
});

//2.1
document.addEventListener('DOMContentLoaded', () => {
    const parentBlock = document.querySelector('.parent_block');
    const childBlock = document.querySelector('.child_block');

    if (parentBlock && childBlock) {
        let positionX = 0;
        let positionY = 0;
        let direction = 'right';

        const speed = 2;

        const moveChild = () => {
            const maxX = parentBlock.clientWidth - childBlock.offsetWidth;
            const maxY = parentBlock.clientHeight - childBlock.offsetHeight;

            if (maxX <= 0 || maxY <= 0) return;

            if (direction === 'right') {
                positionX += speed;

                if (positionX >= maxX) {
                    positionX = maxX;
                    direction = 'down';
                }
            } else if (direction === 'down') {
                positionY += speed;

                if (positionY >= maxY) {
                    positionY = maxY;
                    direction = 'left';
                }
            } else if (direction === 'left') {
                positionX -= speed;

                if (positionX <= 0) {
                    positionX = 0;
                    direction = 'up';
                }
            } else if (direction === 'up') {
                positionY -= speed;

                if (positionY <= 0) {
                    positionY = 0;
                    direction = 'right';
                }
            }

            childBlock.style.left = `${positionX}px`;
            childBlock.style.top = `${positionY}px`;
        };

        setInterval(moveChild, 10);
    }

//dz2
//1
const secondsDisplay = document.querySelector('#seconds');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');

if (secondsDisplay && startButton && stopButton && resetButton) {
    let seconds = 0;
    let timerId = null;

    const renderSeconds = () => {
        secondsDisplay.textContent = seconds;
    };

    const startTimer = () => {
        if (timerId !== null) return;
        timerId = setInterval(() => {
            seconds += 1;
            renderSeconds();
        }, 1000);
    };

    const stopTimer = () => {
        if (timerId !== null) {
            clearInterval(timerId);
            timerId = null;
        }
    };

    const resetTimer = () => {
        stopTimer();
        seconds = 0;
        renderSeconds();
    };

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);

    renderSeconds();
}


//2

const slides = document.querySelectorAll('.slide');

if (slides.length > 1) {
    let currentSlide = 0;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    };

    showSlide(currentSlide);

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}
});

//dz3

function delay(value, ms, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`Ошибка при обработке: ${value}`));
            } else {
                resolve(value);
            }
        }, ms);
    });
}
//1 

delay(1, 500)
    .then(value => {
        console.log("Первый шаг:", value);
        return delay(value + 1, 500, true);
    })
    .then(value => {
        console.log("Второй шаг:", value);
        return delay(value + 1, 500);
    })
    .then(value => {
        console.log("Третий шаг:", value);
    })
    .catch(error => {
        console.log("Поймали ошибку:", error.message);
    })
    .finally(() => {
        console.log("Цепочка завершена");
    });
//2

async function runChain() {
    try {
        let value = await delay(1, 500);
        console.log("Первый шаг:", value);

        value = await delay(value + 1, 500, true);
        console.log("Второй шаг:", value);

        value = await delay(value + 1, 500);
        console.log("Третий шаг:", value);
    } catch (error) {
        console.log("Поймали ошибку:", error.message);
    } finally {
        console.log("Цепочка завершена");
    }
}
//3

async function processArray() {
    const values = [10, 20, 30, 40];
    const results = [];

    for (const value of values) {
        try {
            const result = await delay(
                value,
                500,
                Math.random() > 0.7
            );

            results.push({
                value: result,
                error: null
            });
        } catch (error) {
            results.push({
                value: value,
                error: error.message
            });
        }
    }

    console.log("Все результаты:", results);
}

processArray();

//4

async function runAll() {
    try {
        const results = await Promise.all([
            delay("Первый", 1000),
            delay("Второй", 500, true),
            delay("Третий", 1500),
            delay("Четвёртый", 800)
        ]);

        console.log("Все результаты:", results);
    } catch (error) {
        console.log("Promise.all — ошибка:", error.message);
    }
}

runAll();

//5

async function runAllSettled() {
    const results = await Promise.allSettled([
        delay("Первый", 1000),
        delay("Второй", 500, true),
        delay("Третий", 1500),
        delay("Четвёртый", 800)
    ]);

    const succeeded = results
        .filter(item => item.status === "fulfilled")
        .map(item => item.value);

    const failed = results
        .filter(item => item.status === "rejected")
        .map(item => item.reason.message);

    console.log("Успешные:", succeeded);
    console.log("Ошибки:", failed);
}

runAllSettled();

//6

async function runRace() {
    try {
        const result = await Promise.race([
            delay("Полезный результат", 2000),
            delay("Таймаут", 500, true)
        ]);

        console.log("Результат:", result);
    } catch (error) {
        console.log("Promise.race — ошибка:", error.message);
    }
}

runRace();
