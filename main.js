document.addEventListener("DOMContentLoaded", function() {
    console.log("Сайт завантажено та готовий до використання.");

    const phoneImage = document.getElementById('phoneImage');
    const images = {
        default: 'images/phone.png',
        expenses: 'images/phone.png',
        budget: 'images/phone_8.png',
        planning: 'images/phone_7.png',
        debts: 'images/phone_6.png',
        tasks: 'images/phone_9.png'
    };

    let currentImageIndex = 0;
    const imageKeys = Object.keys(images);
    let isManualChange = false;
    let autoChangeTimeout;

    function scheduleNextChange() {
        autoChangeTimeout = setTimeout(changeImageAutomatically, 5000); // Зміна зображення кожні 5 секунд
    }

    function changeImage(imageKey) {
        clearTimeout(autoChangeTimeout);
        phoneImage.classList.remove('show');
        setTimeout(() => {
            phoneImage.src = images[imageKey] || images.default;
            phoneImage.classList.add('show');
        }, 500); // Тривалість переходу повинна відповідати тривалості переходу CSS
        if (!isManualChange) {
            scheduleNextChange();
        }
    }

    function changeImageAutomatically() {
        currentImageIndex = (currentImageIndex + 1) % imageKeys.length;
        changeImage(imageKeys[currentImageIndex]);
    }

    // Додаємо обробники подій для елементів списку
    document.getElementById('expenses').addEventListener('click', () => {
        isManualChange = true;
        changeImage('expenses');
    });
    document.getElementById('budget').addEventListener('click', () => {
        isManualChange = true;
        changeImage('budget');
    });
    document.getElementById('planning').addEventListener('click', () => {
        isManualChange = true;
        changeImage('planning');
    });
    document.getElementById('debts').addEventListener('click', () => {
        isManualChange = true;
        changeImage('debts');
    });
    document.getElementById('tasks').addEventListener('click', () => {
        isManualChange = true;
        changeImage('tasks');
    });

    // Початковий виклик зміни зображення
    changeImage('default');
    scheduleNextChange();
});
