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
        showFeatureImage('expenses');
    });
    document.getElementById('budget').addEventListener('click', () => {
        isManualChange = true;
        changeImage('budget');
        showFeatureImage('budget');
    });
    document.getElementById('planning').addEventListener('click', () => {
        isManualChange = true;
        changeImage('planning');
        showFeatureImage('planning');
    });
    document.getElementById('debts').addEventListener('click', () => {
        isManualChange = true;
        changeImage('debts');
        showFeatureImage('debts');
    });
    document.getElementById('tasks').addEventListener('click', () => {
        isManualChange = true;
        changeImage('tasks');
        showFeatureImage('tasks');
    });

    // Початковий виклик зміни зображення
    changeImage('default');
    scheduleNextChange();

    // Функція для відображення зображення під кнопкою функції
    function showFeatureImage(featureId) {
        const featureList = document.getElementById('features-list');
        const imageContainer = document.getElementById('feature-image-container');
        
        // Очищуємо контейнер
        imageContainer.innerHTML = '';

        // Створюємо нове зображення
        const image = document.createElement('img');
        image.src = images[featureId];
        image.alt = 'Phone image';
        imageContainer.appendChild(image);

        // Переміщуємо контейнер зображення під відповідну кнопку
        const featureButton = document.getElementById(featureId);
        featureList.insertBefore(imageContainer, featureButton.nextSibling);

        // Переключаємо клас "show" для анімації
        imageContainer.classList.add('show');
    }

    // Функції для завантаження відповідного тексту на основі мови системи користувача
    function getLanguage() {
        return navigator.language || navigator.userLanguage;
    }

    function loadLanguageFile(language) {
        let langFile = 'locales/uk.json'; // За замовчуванням українська
        if (language.startsWith('ru')) {
            langFile = 'locales/ru.json';
        } else if (language.startsWith('en')) {
            langFile = 'locales/en.json';
        }

        fetch(langFile)
            .then(response => response.json())
            .then(data => {
                document.getElementById('title').innerText = data.title;
                document.getElementById('meta_description').setAttribute('content', data.meta_description);
                document.getElementById('header_logo_alt').setAttribute('alt', data.header_logo_alt);
                document.getElementById('header_title').innerText = data.header_title;
                document.getElementById('about_title').innerText = data.about_title;
                document.getElementById('about_description').innerText = data.about_description;
                document.getElementById('features_title').innerText = data.features_title;
                document.getElementById('expenses').innerText = data.feature_expenses;
                document.getElementById('budget').innerText = data.feature_budget;
                document.getElementById('planning').innerText = data.feature_planning;
                document.getElementById('debts').innerText = data.feature_debts;
                document.getElementById('tasks').innerText = data.feature_tasks;
                document.getElementById('details_title').innerText = data.details_title;
                document.getElementById('contact_title').innerText = data.contact_title;
                document.getElementById('contact_details').innerText = data.contact_details;
                document.getElementById('phone_image_alt').setAttribute('alt', data.phone_image_alt);
                document.getElementById('download_button_text').innerText = data.download_button_text;
                document.getElementById('footer_text').innerText = data.footer_text;
            })
            .catch(error => console.error('Помилка завантаження файлу мови:', error));
    }

    const userLanguage = getLanguage();
    loadLanguageFile(userLanguage);
});
